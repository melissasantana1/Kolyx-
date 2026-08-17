
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import CountryFlag from "react-native-country-flag";
import { enableScreens } from 'react-native-screens';
enableScreens(false);

export default function EditProfile({ navigation, route }) {
  const { currentData } = route.params || {};

  const [name, setName] = useState(currentData?.name || '');
  const [email, setEmail] = useState(currentData?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(currentData?.phone || '');
  const [about, setAbout] = useState(currentData?.about || '');
  const [imageUri, setImageUri] = useState(currentData?.imageUri || null);

  const [countryCode, setCountryCode] = useState(currentData?.countryCode || 'BR');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const [phoneCountry, setPhoneCountry] = useState({
    cca2: currentData?.phoneCountry || 'BR',
    callingCode: currentData?.phoneCallingCode ? [currentData.phoneCallingCode] : ['55'],
  });
  const [phonePickerVisible, setPhonePickerVisible] = useState(false);

  const [selectedLanguages, setSelectedLanguages] = useState(currentData?.languages || []);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const phoneInputRef = useRef(null);

  const countries = [
    { code: "BR", name: "Brazil", callingCode: "55" },
    { code: "US", name: "United States", callingCode: "1" },
    { code: "PT", name: "Portugal", callingCode: "351" },
    { code: "ES", name: "Spain", callingCode: "34" },
    { code: "FR", name: "France", callingCode: "33" },
    { code: "DE", name: "Germany", callingCode: "49" },
    { code: "IT", name: "Italy", callingCode: "39" },
    { code: "CH", name: "Switzerland", callingCode: "41" },
    { code: "GB", name: "United Kingdom", callingCode: "44" },
    { code: "IE", name: "Ireland", callingCode: "353" },
    { code: "BE", name: "Belgium", callingCode: "32" },
    { code: "NL", name: "Netherlands", callingCode: "31" },
    { code: "DK", name: "Denmark", callingCode: "45" },
    { code: "NO", name: "Norway", callingCode: "47" },
    { code: "SE", name: "Sweden", callingCode: "46" },
    { code: "AT", name: "Austria", callingCode: "43" },
    { code: "HR", name: "Croatia", callingCode: "385" },
    { code: "PL", name: "Poland", callingCode: "48" },
  ];

  const handleSelectCountry = (item) => {
    setCountryCode(item.code);
    setCountryPickerVisible(false);
  };

  const handleSelectPhoneCountry = (item) => {
    setPhoneCountry({ cca2: item.code, callingCode: [item.callingCode] });
    setPhonePickerVisible(false);
  };

  const handleSave = () => {
    console.log("Dados salvos:", {
      name,
      email,
      countryCode,
      phoneCountry: phoneCountry.cca2,
      phoneCallingCode: phoneCountry.callingCode[0],
      phoneNumber,
      about,
      languages: selectedLanguages,
    });

    navigation.goBack();
  };

  const languages = [
    { label: 'Dansk (DK)', code: 'DK' },
    { label: 'Deutsch (AT)', code: 'AT' },
    { label: 'Deutsch (DE)', code: 'DE' },
    { label: 'English (EN)', code: 'EN' },
    { label: 'Español (ES)', code: 'ES' },
    { label: 'Français (FR)', code: 'FR' },
    { label: 'Hrvatski (HR)', code: 'HR' },
    { label: 'Italiano (IT)', code: 'IT' },
    { label: 'Nederlands (BE)', code: 'BE' },
    { label: 'Nederlands (NL)', code: 'NL' },
    { label: 'Polski (PL)', code: 'PL' },
    { label: 'Português (BR)', code: 'BR' },
    { label: 'Português (PT)', code: 'PT' },
    { label: 'Svenska (SE)', code: 'SE' }
  ];

  const handleSelectLanguage = (langCode) => {
    if (selectedLanguages.includes(langCode)) {
      setSelectedLanguages(selectedLanguages.filter((c) => c !== langCode));
    } else if (selectedLanguages.length < 3) {
      setSelectedLanguages([...selectedLanguages, langCode]);
    } else {
      alert('Maximum 3 languages.');
    }
  };

  const handleRemoveLanguage = (langCode) => {
    setSelectedLanguages(selectedLanguages.filter((c) => c !== langCode));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
          <View style={{ width: 26 }} />
        </View>

        {/* AVATAR */}
        <View style={styles.profileImageContainer}>
          <View style={styles.avatarPlaceholder}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.profileImage} />
            ) : (
              <Ionicons name="person" size={60} color="#fff" />
            )}
          </View>
          <TouchableOpacity style={styles.editPhotoBtn}>
            <Ionicons name="camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor="#BDBDBD"
            value={name}
            onChangeText={setName}
          />

          <Text style={[styles.label, { marginTop: 14 }]}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Your email"
            placeholderTextColor="#BDBDBD"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {/* LANGUAGES */}
          <Text style={[styles.label, { marginTop: 14 }]}>Language</Text>
          <TouchableOpacity
            style={styles.languageBox}
            onPress={() => setLanguageModalVisible(true)}
            activeOpacity={0.8}
          >
            {selectedLanguages.length === 0 ? (
              <Text style={{ color: "#BDBDBD" }}>Select up to 3 languages</Text>
            ) : (
              <View style={styles.languageTagsContainer}>
                {selectedLanguages.map((lang) => (
                  <View key={lang} style={styles.languageTag}>
                    <Text style={styles.languageTagText}>{lang}</Text>
                    <TouchableOpacity onPress={() => handleRemoveLanguage(lang)}>
                      <Ionicons name="close" size={14} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
            <Ionicons name="chevron-down" size={16} color="#813EFF" />
          </TouchableOpacity>

          {/* LANGUAGES MODAL */}
          <Modal visible={languageModalVisible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Select Languages</Text>

                <FlatList
                  data={languages}
                  keyExtractor={(item) => item.code}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.languageOption,
                        selectedLanguages.includes(item.code) && styles.languageOptionSelected,
                      ]}
                      onPress={() => handleSelectLanguage(item.code)}
                    >
                      <Text
                        style={[
                          styles.languageOptionText,
                          selectedLanguages.includes(item.code) && { color: "#fff" },
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                />

                <TouchableOpacity
                  style={styles.closeModalBtn}
                  onPress={() => setLanguageModalVisible(false)}
                >
                  <Text style={styles.closeModalText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* COUNTRY */}
          <Text style={[styles.label, { marginTop: 14 }]}>Country</Text>

          <View style={styles.countryContainer}>
            <View style={styles.flagCircle}>
              <CountryFlag isoCode={countryCode} size={22} />
            </View>

            <TouchableOpacity
              onPress={() => setCountryPickerVisible(true)}
              style={styles.arrowArea}
            >
              <Ionicons name="chevron-down" size={16} color="#813EFF" />
            </TouchableOpacity>

            <View style={styles.countrySeparator} />

            <Text style={styles.countryCodeText}>{countryCode}</Text>
          </View>

          {/* === COUNTRY PICKER → AGORA ROLÁVEL === */}
          <Modal visible={countryPickerVisible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>

                <Text style={styles.modalTitle}>Select Country</Text>

                <ScrollView style={{ maxHeight: 350 }}>
                  {countries.map((item) => (
                    <TouchableOpacity
                      key={item.code}
                      onPress={() => handleSelectCountry(item)}
                      style={styles.countryOption}
                    >
                      <View style={styles.flagCircle}>
                        <CountryFlag isoCode={item.code} size={22} />
                      </View>
                      <Text style={styles.countryOptionText}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <TouchableOpacity
                  style={styles.closeModalBtn}
                  onPress={() => setCountryPickerVisible(false)}
                >
                  <Text style={styles.closeModalText}>Close</Text>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>

          {/* PHONE */}
          <Text style={[styles.label, { marginTop: 14 }]}>Phone Number</Text>

          <View style={styles.countryContainer}>
            <View style={styles.flagCircle}>
              <CountryFlag isoCode={phoneCountry.cca2} size={22} />
            </View>

            <TouchableOpacity
              onPress={() => setPhonePickerVisible(true)}
              style={styles.arrowArea}
            >
              <Ionicons name="chevron-down" size={16} color="#813EFF" />
            </TouchableOpacity>

            <View style={styles.countrySeparator} />

            <Text style={styles.countryCodeText}>
              +{phoneCountry.callingCode[0]}
            </Text>
          </View>

          {/* === PHONE PICKER → AGORA ROLÁVEL === */}
          <Modal visible={phonePickerVisible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>

                <Text style={styles.modalTitle}>Select Country Code</Text>

                <ScrollView style={{ maxHeight: 350 }}>
                  {countries.map((item) => (
                    <TouchableOpacity
                      key={item.code}
                      onPress={() => handleSelectPhoneCountry(item)}
                      style={styles.countryOption}
                    >
                      <View style={styles.flagCircle}>
                        <CountryFlag isoCode={item.code} size={22} />
                      </View>
                      <Text style={styles.countryOptionText}>
                        {item.name} (+{item.callingCode})
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <TouchableOpacity
                  style={styles.closeModalBtn}
                  onPress={() => setPhonePickerVisible(false)}
                >
                  <Text style={styles.closeModalText}>Close</Text>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>

          {/* ABOUT */}
          <Text style={[styles.label, { marginTop: 14 }]}>About</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            placeholder="Write something about yourself"
            placeholderTextColor="#BDBDBD"
            value={about}
            onChangeText={(text) => text.length <= 170 && setAbout(text)}
            multiline
            maxLength={170}
          />
          <Text style={styles.charCount}>{about.length}/170</Text>
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.saveBtnContainer}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },

  header: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: { padding: 5 },
  title: { fontSize: 20, fontWeight: "700", color: "#000" },

  profileImageContainer: { alignItems: "center", marginTop: 25 },
  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: "#813EFF",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: { width: 110, height: 110, borderRadius: 60 },
  editPhotoBtn: {
    position: "absolute",
    bottom: 0,
    right: 120,
    backgroundColor: "#813EFF",
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  form: { marginTop: 30 },
  label: { color: "#000", fontWeight: "600", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#813EFF",
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 50,
    fontSize: 16,
    color: "#000",
  },

  charCount: {
    textAlign: "left",
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },

  flagCircle: {
    width: 20,
    height: 20,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.9,
    borderColor: '#686363ff',
  },

  countryContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#813EFF",
    borderRadius: 10,
    height: 55,
    paddingHorizontal: 14,
  },

  arrowArea: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  countrySeparator: {
    width: 1,
    height: 40,
    backgroundColor: "#D7C2FF",
    marginHorizontal: 10,
  },

  countryCodeText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    maxHeight: "85%",
  },

  modalTitle: { fontSize: 18, fontWeight: "700", textAlign: "center" },

  countryOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  countryOptionText: {
    fontSize: 16,
    marginLeft: 14,
    color: "#000",
  },

  closeModalBtn: {
    backgroundColor: "#813EFF",
    borderRadius: 8,
    marginTop: 15,
    paddingVertical: 10,
    alignItems: "center",
  },
  closeModalText: { color: "#fff", fontWeight: "700", textAlign: "center" },

  languageBox: {
    borderWidth: 1,
    borderColor: "#813EFF",
    borderRadius: 10,
    padding: 12,
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  languageTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  languageTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#813EFF",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 6,
    marginBottom: 4,
  },
  languageTagText: { color: "#fff", fontWeight: "600", marginRight: 4 },

  languageOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#eee",
  },
  languageOptionSelected: {
    backgroundColor: "#813EFF",
    borderColor: "#813EFF",
  },
  languageOptionText: { fontSize: 16, color: "#000" },

  saveBtnContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 40,
  },

  saveBtn: {
    backgroundColor: "#813EFF",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },

  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
