import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';

export default function SettingsT() {
  const navigation = useNavigation();

  const [isTransporterMode, setIsTransporterMode] = useState(true);
  const [isNotificationsOn, setIsNotificationsOn] = useState(true);
  const [isFlexibleMode, setIsFlexibleMode] = useState(false);

  const handleTransporterMode = (value) => {
    setIsTransporterMode(value);

    if (value === true) {
      navigation.navigate("LoadingScreen", {
        targetScreen: "IndexTras"
      });
    } else {
      navigation.navigate("LoadingScreen", {
        targetScreen: "IndexSend"
      });
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Logging out...');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>

        <Text style={styles.headerTitle}>Settings</Text>

        {/* Moover Mode */}
        <View style={styles.transporterContainer}>
          <Text style={styles.transporterText}>Moover Mode</Text>
          <Switch
            value={isTransporterMode}
            onValueChange={handleTransporterMode}
            trackColor={{ false: '#ccc', true: '#E5D4FF' }}
            thumbColor={isTransporterMode ? '#813EFF' : '#999'}
          />
        </View>

        {/* ---------- MY KOLYX ---------- */}
        <Text style={styles.titleMyKolyx}>My Kolyx</Text>

        {[
          { icon: 'cash-outline', text: 'Earnings', route: 'Earnings' },
          { icon: 'navigate-outline', text: 'Scheduled Trips', route: 'Scheduled' },
        ].map((item, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [styles.optionButton, pressed && styles.optionButtonPressed]}
            onPress={() => {
              if (item.route) {
                navigation.navigate(item.route);
              }
            }}
          >
            <View style={styles.optionLeft}>
              <Ionicons name={item.icon} size={20} color="#813EFF" style={styles.leftIcon} />
              <Text style={styles.optionText}>{item.text}</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#813EFF" style={styles.arrowIcon} />
          </Pressable>
        ))}

        {/* Flexible Mode */}
        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>Flexible Mode</Text>
          <Switch
            value={isFlexibleMode}
            onValueChange={setIsFlexibleMode}
            trackColor={{ false: '#ccc', true: '#E5D4FF' }}
            thumbColor={isFlexibleMode ? '#813EFF' : '#999'}
          />
        </View>

        {/* ---------- ACCOUNT SETTINGS ---------- */}
        <Text style={styles.titleAccountSettings}>Account Settings</Text>

        {[
          { icon: 'cash-outline', text: 'Currency', route: 'CurrencyT' },
          { icon: 'lock-closed-outline', text: 'Password & Security', route: 'Password' },
        ].map((item, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [styles.optionButton, pressed && styles.optionButtonPressed]}
            onPress={() => {
              if (item.route) {
                navigation.navigate(item.route);
              }
            }}
          >
            <View style={styles.optionLeft}>
              <Ionicons name={item.icon} size={20} color="#813EFF" style={styles.leftIcon} />
              <Text style={styles.optionText}>{item.text}</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#813EFF" style={styles.arrowIcon} />
          </Pressable>
        ))}

        <Pressable
          style={({ pressed }) => [
            styles.optionButton,
            pressed && styles.optionButtonPressed,
          ]}
          onPress={() => navigation.navigate('LanguageT')}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="language-outline" size={20} color="#813EFF" />
            <Text style={styles.optionText}>Language</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#813EFF" />
        </Pressable>

        <View style={[styles.toggleRow, { marginTop: 0 }]}>
          <Text style={styles.toggleText}>Notifications</Text>
          <Switch
            value={isNotificationsOn}
            onValueChange={setIsNotificationsOn}
            trackColor={{ false: '#ccc', true: '#E5D4FF' }}
            thumbColor={isNotificationsOn ? '#813EFF' : '#999'}
          />
        </View>

        {/* ---------- HELP & SECURITY ---------- */}
        <Text style={styles.titleHelpSecurity}>Help & Security</Text>

        {[
          { icon: 'information-circle-outline', text: 'Help Center', route: 'HelpT' },
          { icon: 'help-circle-outline', text: 'FAQ', route: 'FAQT'},
          { icon: 'document-text-outline', text: 'Privacy Policy', route: 'Policy' },
        ].map((item, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [styles.optionButton, pressed && styles.optionButtonPressed]}
            onPress={() => navigation.navigate(item.route)}
          >
            <View style={styles.optionLeft}>
              <Ionicons name={item.icon} size={20} color="#813EFF" style={styles.leftIcon} />
              <Text style={styles.optionText}>{item.text}</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#813EFF" style={styles.arrowIcon} />
          </Pressable>
        ))}

        {/* Logout */}
        <Pressable
          style={({ pressed }) => [styles.fullButton, pressed && styles.fullButtonPressed]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
          <Text style={styles.fullButtonText}>Log Out</Text>
        </Pressable>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 70,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
  },
  titleMyKolyx: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
  titleAccountSettings: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
  titleHelpSecurity: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
  arrowIcon: {
    marginLeft: 10,
    marginRight: 4,
    alignSelf: 'center',
  },
  leftIcon: {
    marginRight: 10,
  },
  transporterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  transporterText: { fontSize: 16, fontWeight: '600' },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#813EFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  toggleText: {
    fontSize: 16,
    fontWeight: '600',
  },

  optionButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#813EFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionButtonPressed: { backgroundColor: '#E5D4FF' },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: { fontSize: 16, fontWeight: '600' },
  fullButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#813EFF',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 40,
  },
  fullButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});