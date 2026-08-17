import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
    Animated,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function Sendnow({ navigation }) {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [deliveryToggle, setDeliveryToggle] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const verticalTrackHeight = 60;

  const animatedValue = new Animated.Value(0);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < 5; i++) {
      const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3 + 0.14 * i, 0.7 - 0.14 * i],
      });
      dots.push(
        <Animated.View
          key={i}
          style={[styles.dot, { opacity }]}
        />
      );
    }
    return dots;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send now</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.inputsWrapper}>
        <View style={[styles.verticalTrack, { height: verticalTrackHeight }]}>
          <FontAwesome5 name="bullseye" size={23} color="#813EFF" />
          <View style={styles.trackLine}>{renderDots()}</View>
          <Ionicons name="location-sharp" size={27} color="#813EFF" />
        </View>

        <View style={styles.inputsColumn}>
          <View style={[styles.inputSection, styles.pickupInputStyle]}>
            <Text style={styles.inputLabel}>Where to pick up?</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.textInput}
                placeholder="Your location"
                placeholderTextColor="#888"
                value={pickupLocation}
                onChangeText={setPickupLocation}
                selectionColor="#813EFF"
              />
              <TouchableOpacity>
                <Ionicons name="locate-outline" size={24} color="#813EFF" style={styles.inputIconRight} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.inputSection, styles.dropoffInputStyle]}>
            <Text style={styles.inputLabel}>Where to drop off?</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.textInput}
                placeholder="Destination address"
                placeholderTextColor="#888"
                value={dropoffLocation}
                onChangeText={setDropoffLocation}
                selectionColor="#813EFF"
              />
              <TouchableOpacity>
                <Ionicons name="locate-outline" size={24} color="#813EFF" style={styles.inputIconRight} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.calendarSection}>
        <Text style={styles.calendarLabel}>When is delivery needed?</Text>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => setShowCalendar(true)}
        >
          <Text style={[styles.calendarButtonText, selectedDate && { color: '#813EFF' }]}>
            {selectedDate ? selectedDate : 'Select a date'}
          </Text>
          <Ionicons name="calendar-outline" size={24} color="#813EFF" />
        </TouchableOpacity>

        <Modal visible={showCalendar} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Calendar
                onDayPress={onDayPress}
                markedDates={
                  selectedDate
                    ? {
                        [selectedDate]: {
                          selected: true,
                          marked: true,
                          selectedColor: '#813EFF',
                        },
                      }
                    : {}
                }
                theme={{
                  todayTextColor: '#813EFF',
                  arrowColor: '#813EFF',
                  selectedDayBackgroundColor: '#813EFF',
                }}
              />
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setShowCalendar(false)}
              >
                <Text style={styles.doneButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.toggleBox}>
        <Text style={styles.toggleLabelBox}>Date is flexible</Text>
        <TouchableOpacity
          style={[
            styles.toggleSwitch,
            deliveryToggle && styles.toggleSwitchActive,
          ]}
          onPress={() => setDeliveryToggle(!deliveryToggle)}
        >
          <View
            style={[
              styles.toggleCircle,
              deliveryToggle && styles.toggleCircleActive,
            ]}
          />
        </TouchableOpacity>
      </View>

      {/* 🔹 BOTÃO MODIFICADO AQUI */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => navigation.navigate('SearchResults')}
      >
        <Text style={styles.submitButtonText}>Find a transporter</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, justifyContent: 'space-between', marginTop: 20 },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#000' },

  inputsWrapper: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 25 },
  verticalTrack: { width: 30, alignItems: 'center', marginRight: 12, marginTop: 50 },
  trackLine: { flexDirection: 'column', alignItems: 'center', marginTop: 11, marginBottom: 11 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#813EFF', marginVertical: 6 },
  inputsColumn: { flex: 1 },

  inputSection: { marginBottom: 20 },
  pickupInputStyle: { marginBottom: 30 },
  dropoffInputStyle: { marginTop: 10 },

  inputLabel: { fontSize: 16, fontWeight: '600', color: '#000', marginBottom: 8, marginTop: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#813EFF', borderRadius: 10, height: 50, paddingHorizontal: 10 },
  textInput: { flex: 1, fontSize: 16, color: '#813EFF' },
  inputIconRight: { marginLeft: 8 },

  calendarSection: { marginBottom: 25 },
  calendarLabel: { fontSize: 16, fontWeight: '600', color: '#000', marginBottom: 8 },
  calendarButton: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#813EFF', borderRadius: 10, paddingHorizontal: 12, height: 50, justifyContent: 'space-between' },
  calendarButtonText: { fontSize: 16, color: '#000' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 10, padding: 15, width: '90%' },
  doneButton: { backgroundColor: '#813EFF', borderRadius: 8, paddingVertical: 10, marginTop: 10, alignItems: 'center' },
  doneButtonText: { color: '#fff', fontWeight: '600' },

  toggleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#813EFF',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginBottom: 25,
  },
  toggleLabelBox: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  toggleSwitch: {
    width: 50,
    height: 28,
    borderRadius: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    padding: 3,
  },
  toggleSwitchActive: {
    backgroundColor: '#813EFF',
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  toggleCircleActive: {
    alignSelf: 'flex-end',
  },

  submitButton: { 
    backgroundColor: '#813EFF',
    borderRadius: 10, 
    paddingVertical: 15, 
    alignItems: 'center', 
    marginTop: 170, 
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
