import { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  Pressable,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InboxChat() {
  const navigation = useNavigation();
  const route = useRoute();

  const { user } = route.params;

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "other",
      type: "text",
      text: `Hello! I'm ${user.name}.`,
    },
    {
      id: "2",
      sender: "me",
      type: "text",
      text: "Hi! Nice to meet you.",
    },
    {
      id: "3",
      sender: "other",
      type: "text",
      text: "How are you today?",
    },
  ]);

  const [attachmentModalVisible, setAttachmentModalVisible] =
    useState(false);

  const [offerModalVisible, setOfferModalVisible] = useState(false);

  const [price, setPrice] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [transportModalVisible, setTransportModalVisible] =
    useState(false);

  const [transportMode, setTransportMode] = useState("");

  const [optionsModalVisible, setOptionsModalVisible] =
    useState(false);

  const [blocked, setBlocked] = useState(false);

  function sendMessage() {
    if (message.trim() === "") return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "me",
        type: "text",
        text: message.trim(),
      },
    ]);

    setMessage("");
  }

  async function openGallery() {
    Keyboard.dismiss();

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Please allow access to your photos to send images."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "me",
          type: "image",
          image: imageUri,
        },
      ]);

      setAttachmentModalVisible(false);
    }
  }

  function openOfferModal() {
    Keyboard.dismiss();

    setAttachmentModalVisible(false);
    setPrice("");
    setTransportMode("");
    setSelectedDate(new Date());
    setCurrentMonth(new Date());
    setOfferModalVisible(true);
  }

  function formatDate(date) {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatPrice(value) {
    if (!value) return "$0.00";

    const numericValue = parseFloat(
      value.replace(/[^0-9.]/g, "")
    );

    if (isNaN(numericValue)) return "$0.00";

    return `$${numericValue.toFixed(2)}`;
  }

  function sendOffer() {
    Keyboard.dismiss();

    if (!price.trim()) {
      Alert.alert("Missing price", "Please enter a price.");
      return;
    }

    if (!transportMode) {
      Alert.alert(
        "Missing transport",
        "Please select a transport mode."
      );
      return;
    }

    const newOffer = {
      id: Date.now().toString(),
      sender: "me",
      type: "offer",
      price: formatPrice(price),
      deliveryDate: formatDate(selectedDate),
      transport: transportMode,
      withdrawn: false,
    };

    setMessages((prev) => [...prev, newOffer]);

    setOfferModalVisible(false);
    setPrice("");
    setTransportMode("");
  }

  function withdrawOffer(id) {
    setMessages((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              withdrawn: true,
            }
          : item
      )
    );
  }

  function previousMonth() {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    );
  }

  function nextMonth() {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  }

  function getCalendarDays() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }

  function selectDate(date) {
    if (!date) return;

    Keyboard.dismiss();
    setSelectedDate(date);
  }

  function renderTransportIcon(mode) {
    if (mode === "Motorcycle") return "bicycle";
    if (mode === "Car") return "car";
    if (mode === "Bicycle") return "bicycle";
    if (mode === "Airplane") return "airplane";

    return "navigate";
  }

  function openTransportModal() {
    Keyboard.dismiss();

    setOfferModalVisible(false);

    setTimeout(() => {
      setTransportModalVisible(true);
    }, 150);
  }

  function selectTransport(mode) {
    Keyboard.dismiss();

    setTransportMode(mode);
    setTransportModalVisible(false);

    setTimeout(() => {
      setOfferModalVisible(true);
    }, 150);
  }

  function blockUser() {
    setOptionsModalVisible(false);
    setBlocked(true);

    Alert.alert(
      "User blocked",
      `${user.name} has been blocked.`
    );
  }

  function deleteConversation() {
    setOptionsModalVisible(false);

    Alert.alert(
      "Delete conversation",
      "Are you sure you want to delete this conversation?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setMessages([]);
          },
        },
      ]
    );
  }

  function renderMessage({ item }) {
    const isMe = item.sender === "me";

    if (item.type === "image") {
      return (
        <View
          style={[
            styles.messageContainer,
            isMe
              ? styles.myMessageContainer
              : styles.otherMessageContainer,
          ]}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.sentImage}
          />
        </View>
      );
    }

    if (item.type === "offer") {
      return (
        <View
          style={[
            styles.messageContainer,
            isMe
              ? styles.myMessageContainer
              : styles.otherMessageContainer,
          ]}
        >
          <View
            style={[
              styles.offerCard,
              item.withdrawn && styles.withdrawnOffer,
            ]}
          >
            <Text style={styles.offerTitle}>
              Delivery Offer
            </Text>

            {item.withdrawn ? (
              <Text style={styles.withdrawnText}>
                This offer has been withdrawn.
              </Text>
            ) : (
              <>
                <Text style={styles.offerPrice}>
                  {item.price}
                </Text>

                <View style={styles.offerDivider} />

                <View style={styles.offerInfo}>
                  <View style={styles.offerInfoItem}>
                    <Text style={styles.offerLabel}>
                      Delivery date
                    </Text>

                    <Text style={styles.offerValue}>
                      {item.deliveryDate}
                    </Text>
                  </View>

                  <View style={styles.offerInfoItem}>
                    <Text style={styles.offerLabel}>
                      Transport
                    </Text>

                    <View style={styles.transportValue}>
                      <Ionicons
                        name={renderTransportIcon(
                          item.transport
                        )}
                        size={17}
                        color="#813EFF"
                      />

                      <Text style={styles.offerValue}>
                        {item.transport}
                      </Text>
                    </View>
                  </View>
                </View>

                {isMe && (
                  <TouchableOpacity
                    style={styles.withdrawButton}
                    onPress={() =>
                      withdrawOffer(item.id)
                    }
                  >
                    <Text style={styles.withdrawText}>
                      Withdraw
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageContainer,
          isMe
            ? styles.myMessageContainer
            : styles.otherMessageContainer,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isMe ? styles.myBubble : styles.otherBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isMe ? styles.myText : styles.otherText,
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios" ? "padding" : "height"
        }
        keyboardVerticalOffset={15}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color="#666666"
            />
          </TouchableOpacity>

          <View style={styles.userArea}>
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.userName}>
                {user.name}
              </Text>

              {blocked && (
                <Text style={styles.blockedText}>
                  Blocked
                </Text>
              )}
            </View>
          </View>

          <View style={styles.rightIcons}>
            <TouchableOpacity>
              <Ionicons
                name="search"
                size={23}
                color="#666666"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() =>
                setOptionsModalVisible(true)
              }
            >
              <Ionicons
                name="ellipsis-vertical"
                size={21}
                color="#666666"
              />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={{
            padding: 15,
          }}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputArea}>
          <TouchableOpacity
            onPress={() =>
              setAttachmentModalVisible(true)
            }
          >
            <Ionicons
              name="attach"
              size={24}
              color="#813EFF"
            />
          </TouchableOpacity>

          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage}
          >
            <Ionicons
              name="send"
              size={21}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal
        visible={optionsModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() =>
          setOptionsModalVisible(false)
        }
      >
        <Pressable
          style={styles.optionsOverlay}
          onPress={() =>
            setOptionsModalVisible(false)
          }
        >
          <Pressable
            style={styles.optionsMenu}
            onPress={(event) =>
              event.stopPropagation()
            }
          >
            <TouchableOpacity
              style={styles.menuOption}
              onPress={blockUser}
            >
              <Ionicons
                name="ban-outline"
                size={22}
                color="#555"
              />

              <Text style={styles.menuOptionText}>
                Block user
              </Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuOption}
              onPress={deleteConversation}
            >
              <Ionicons
                name="trash-outline"
                size={22}
                color="#E53935"
              />

              <Text
                style={[
                  styles.menuOptionText,
                  styles.deleteText,
                ]}
              >
                Delete conversation
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={attachmentModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() =>
          setAttachmentModalVisible(false)
        }
      >
        <Pressable
          style={styles.attachmentOverlay}
          onPress={() =>
            setAttachmentModalVisible(false)
          }
        >
          <Pressable
            style={styles.attachmentModal}
            onPress={(event) =>
              event.stopPropagation()
            }
          >
            <View style={styles.attachmentHeader}>
              <Text style={styles.attachmentTitle}>
                Add to message
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setAttachmentModalVisible(false)
                }
              >
                <Ionicons
                  name="close"
                  size={24}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.attachmentOptions}>
              <TouchableOpacity
                style={styles.attachmentOption}
                onPress={openGallery}
              >
                <View style={styles.attachmentIcon}>
                  <Ionicons
                    name="images-outline"
                    size={26}
                    color="#813EFF"
                  />
                </View>

                <Text style={styles.attachmentOptionText}>
                  Photo
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.attachmentOption}
                onPress={openOfferModal}
              >
                <View style={styles.attachmentIcon}>
                  <Ionicons
                    name="pricetag-outline"
                    size={26}
                    color="#813EFF"
                  />
                </View>

                <Text style={styles.attachmentOptionText}>
                  Offer
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={offerModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          Keyboard.dismiss();
          setOfferModalVisible(false);
        }}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={
            Platform.OS === "ios" ? "padding" : undefined
          }
        >
          <View style={styles.offerModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Create an Offer
              </Text>

              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  setOfferModalVisible(false);
                }}
              >
                <Ionicons
                  name="close"
                  size={25}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.fieldTitle}>
              Price
            </Text>

            <View style={styles.priceInputContainer}>
              <Text style={styles.currency}>
                $
              </Text>

              <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder="0.00"
                placeholderTextColor="#999"
                keyboardType="decimal-pad"
                returnKeyType="done"
                onSubmitEditing={() =>
                  Keyboard.dismiss()
                }
                style={styles.priceInput}
              />
            </View>

            <Text style={styles.fieldTitle}>
              Delivery date
            </Text>

            <View style={styles.calendarContainer}>
              <View style={styles.calendarHeader}>
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                    previousMonth();
                  }}
                >
                  <Ionicons
                    name="chevron-back"
                    size={21}
                    color="#222"
                  />
                </TouchableOpacity>

                <Text style={styles.monthTitle}>
                  {currentMonth.toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                    nextMonth();
                  }}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={21}
                    color="#222"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.weekDays}>
                {[
                  "S",
                  "M",
                  "T",
                  "W",
                  "T",
                  "F",
                  "S",
                ].map((day, index) => (
                  <Text
                    key={index}
                    style={styles.weekDay}
                  >
                    {day}
                  </Text>
                ))}
              </View>

              <View style={styles.calendarGrid}>
                {getCalendarDays().map(
                  (date, index) => {
                    const isSelected =
                      date &&
                      date.toDateString() ===
                        selectedDate.toDateString();

                    return (
                      <TouchableOpacity
                        key={index}
                        disabled={!date}
                        onPress={() =>
                          selectDate(date)
                        }
                        style={[
                          styles.calendarDay,
                          isSelected &&
                            styles.selectedDay,
                        ]}
                      >
                        {date && (
                          <Text
                            style={[
                              styles.calendarDayText,
                              isSelected &&
                                styles.selectedDayText,
                            ]}
                          >
                            {date.getDate()}
                          </Text>
                        )}
                      </TouchableOpacity>
                    );
                  }
                )}
              </View>
            </View>

            <View
              style={styles.selectedDateContainer}
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#813EFF"
              />

              <Text style={styles.selectedDateText}>
                {formatDate(selectedDate)}
              </Text>
            </View>

            <Text style={styles.fieldTitle}>
              Transport mode
            </Text>

            <TouchableOpacity
              style={styles.transportSelector}
              onPress={openTransportModal}
            >
              <View style={styles.transportLeft}>
                {transportMode ? (
                  <Ionicons
                    name={renderTransportIcon(
                      transportMode
                    )}
                    size={20}
                    color="#813EFF"
                  />
                ) : (
                  <Ionicons
                    name="navigate-outline"
                    size={20}
                    color="#777"
                  />
                )}

                <Text
                  style={[
                    styles.transportPlaceholder,
                    transportMode &&
                      styles.transportSelectedText,
                  ]}
                >
                  {transportMode ||
                    "Select transport mode"}
                </Text>
              </View>

              <Ionicons
                name="chevron-down"
                size={20}
                color="#666"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sendOfferButton}
              onPress={sendOffer}
            >
              <Text style={styles.sendOfferText}>
                Send an Offer
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={transportModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() =>
          setTransportModalVisible(false)
        }
      >
        <Pressable
          style={styles.transportOverlay}
          onPress={() => {
            setTransportModalVisible(false);

            setTimeout(() => {
              setOfferModalVisible(true);
            }, 150);
          }}
        >
          <Pressable
            style={styles.transportMenu}
            onPress={(event) =>
              event.stopPropagation()
            }
          >
            <Text style={styles.transportMenuTitle}>
              Transport mode
            </Text>

            {[
              {
                name: "Motorcycle",
                icon: "bicycle",
              },
              {
                name: "Car",
                icon: "car",
              },
              {
                name: "Bicycle",
                icon: "bicycle",
              },
              {
                name: "Airplane",
                icon: "airplane",
              },
            ].map((item) => (
              <TouchableOpacity
                key={item.name}
                style={styles.transportOption}
                onPress={() =>
                  selectTransport(item.name)
                }
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color="#813EFF"
                />

                <Text
                  style={styles.transportOptionText}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  userArea: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  userName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#000",
    marginLeft: 10,
  },

  blockedText: {
    fontSize: 11,
    color: "#E53935",
    fontWeight: "600",
    marginLeft: 10,
    marginTop: 2,
  },

  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  messageContainer: {
    marginBottom: 10,
  },

  myMessageContainer: {
    alignItems: "flex-end",
  },

  otherMessageContainer: {
    alignItems: "flex-start",
  },

  messageBubble: {
    maxWidth: "75%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },

  myBubble: {
    backgroundColor: "#813EFF",
  },

  otherBubble: {
    backgroundColor: "#F3F3F3",
  },

  messageText: {
    fontSize: 15,
  },

  myText: {
    color: "#fff",
  },

  otherText: {
    color: "#000",
  },

  sentImage: {
    width: 220,
    height: 220,
    borderRadius: 15,
  },

  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 0,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  input: {
    flex: 1,
    height: 45,
    backgroundColor: "#F5F5F5",
    borderRadius: 23,
    paddingHorizontal: 15,
    marginLeft: 10,
  },

  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#813EFF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  offerCard: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },

  withdrawnOffer: {
    opacity: 0.65,
  },

  offerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000",
    marginBottom: 12,
  },

  offerPrice: {
    fontSize: 25,
    fontWeight: "800",
    color: "#813EFF",
  },

  offerDivider: {
    height: 1,
    backgroundColor: "#e8e8e8",
    marginVertical: 14,
  },

  offerInfo: {
    gap: 12,
  },

  offerInfoItem: {
    gap: 3,
  },

  offerLabel: {
    fontSize: 12,
    color: "#888",
  },

  offerValue: {
    fontSize: 14,
    color: "#222",
    fontWeight: "600",
  },

  transportValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  withdrawButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: "center",
  },

  withdrawText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },

  withdrawnText: {
    color: "#888",
    fontSize: 14,
  },

  optionsOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 75,
    paddingRight: 15,
  },

  optionsMenu: {
    width: 230,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },

  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    paddingVertical: 15,
    gap: 12,
  },

  menuOptionText: {
    fontSize: 15,
    color: "#222",
    fontWeight: "600",
  },

  deleteText: {
    color: "#E53935",
  },

  menuDivider: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 15,
  },

  attachmentOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  attachmentModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },

  attachmentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  attachmentTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
  },

  attachmentOptions: {
    flexDirection: "row",
    gap: 30,
  },

  attachmentOption: {
    alignItems: "center",
    width: 75,
  },

  attachmentIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#F3EEFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  attachmentOptionText: {
    fontSize: 13,
    color: "#222",
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  offerModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    maxHeight: "92%",
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000",
  },

  fieldTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
    marginTop: 5,
  },

  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  currency: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginRight: 6,
  },

  priceInput: {
    flex: 1,
    fontSize: 17,
    color: "#000",
  },

  calendarContainer: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 15,
    padding: 12,
  },

  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  monthTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },

  weekDays: {
    flexDirection: "row",
    marginBottom: 5,
  },

  weekDay: {
    width: "14.285%",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: "#888",
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  calendarDay: {
    width: "14.285%",
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  calendarDayText: {
    fontSize: 14,
    color: "#222",
  },

  selectedDay: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#813EFF",
    alignSelf: "center",
  },

  selectedDayText: {
    color: "#fff",
    fontWeight: "700",
  },

  selectedDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 8,
    gap: 8,
  },

  selectedDateText: {
    fontSize: 14,
    color: "#444",
    fontWeight: "600",
  },

  transportSelector: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  transportLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  transportPlaceholder: {
    color: "#777",
    fontSize: 14,
  },

  transportSelectedText: {
    color: "#222",
    fontWeight: "600",
  },

  sendOfferButton: {
    height: 50,
    borderRadius: 13,
    backgroundColor: "#813EFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  sendOfferText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },

  transportOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  transportMenu: {
    width: "82%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
  },

  transportMenuTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
    marginBottom: 10,
  },

  transportOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  transportOptionText: {
    fontSize: 15,
    color: "#222",
    fontWeight: "600",
  },
});