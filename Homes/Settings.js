import { Ionicons } from '@expo/vector-icons';
import {
  useFocusEffect,
  useNavigation
} from '@react-navigation/native';
import { useLanguage } from "../i18n/context/LanguageContext";

import { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

//  i18n
import i18n from '../i18n';

export default function Settings() {
  const navigation = useNavigation();
  const { locale } = useLanguage();

  const [isTransporterMode, setIsTransporterMode] = useState(false);
  const [isNotificationsOn, setIsNotificationsOn] = useState(true);

  //  força re-render quando idioma muda
  const [, forceUpdate] = useState(0);

  useFocusEffect(
    useCallback(() => {
      forceUpdate(n => n + 1);
    }, [locale])
  );

  const handleTransporterMode = (value) => {
    setIsTransporterMode(value);
    if (value) {
      navigation.navigate('LoadingScreen', { targetScreen: 'IndexTras' });
    } else {
      navigation.navigate('LoadingScreen', { targetScreen: 'IndexSend' });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    >

      {/*  TÍTULO */}
      <Text style={styles.headerTitle}>
        {i18n.t('settings.title')}
      </Text>

      {/*  TRANSPORTER MODE */}
      <View style={styles.transporterModeContainer}>
        <Text style={styles.transporterModeText}>
          {i18n.t('settings.transporterMode')}
        </Text>
        <Switch
          value={isTransporterMode}
          onValueChange={handleTransporterMode}
          trackColor={{ false: '#ccc', true: '#E5D4FF' }}
          thumbColor={isTransporterMode ? '#813EFF' : '#999'}
        />
      </View>

      {/*  ACCOUNT */}
      <Text style={styles.sectionTitleAccount}>
        {i18n.t('settings.account')}
      </Text>

      {/* CURRENCY */}
      <Pressable
        style={({ pressed }) => [
          styles.optionButton,
          pressed && styles.optionButtonPressed,
        ]}
        onPress={() => navigation.navigate('Currency')}
      >
        <View style={styles.optionLeft}>
          <Ionicons name="cash-outline" size={20} color="#813EFF" />
          <Text style={styles.optionText}>
            {i18n.t('settings.currency')}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#813EFF" />
      </Pressable>

      {/* SECURITY */}
      <Pressable
        style={({ pressed }) => [
          styles.optionButton,
          pressed && styles.optionButtonPressed,
        ]}
        onPress={() => navigation.navigate('Security')}
      >
        <View style={styles.optionLeft}>
          <Ionicons name="lock-closed-outline" size={20} color="#813EFF" />
          <Text style={styles.optionText}>
            {i18n.t('settings.security')}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#813EFF" />
      </Pressable>

      {/* LANGUAGE */}
      <Pressable
        style={({ pressed }) => [
          styles.optionButton,
          pressed && styles.optionButtonPressed,
        ]}
        onPress={() => navigation.navigate('Language')}
      >
        <View style={styles.optionLeft}>
          <Ionicons name="language-outline" size={20} color="#813EFF" />
          <Text style={styles.optionText}>
            {i18n.t('settings.language')}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#813EFF" />
      </Pressable>

      {/* NOTIFICATIONS */}
      <View style={styles.notificationsContainer}>
        <Text style={styles.notificationsText}>
          {i18n.t('settings.notifications')}
        </Text>
        <Switch
          value={isNotificationsOn}
          onValueChange={setIsNotificationsOn}
          trackColor={{ false: '#ccc', true: '#E5D4FF' }}
          thumbColor={isNotificationsOn ? '#813EFF' : '#999'}
        />
      </View>

      {/*  HELP */}
      <Text style={styles.sectionTitleHelp}>
        {i18n.t('settings.helpSection')}
      </Text>

      {/* HELP CENTER */}
      <Pressable
        style={({ pressed }) => [
          styles.optionButton,
          pressed && styles.optionButtonPressed,
        ]}
        onPress={() => navigation.navigate('Help')}
      >
        <View style={styles.optionLeft}>
          <Ionicons name="information-circle-outline" size={20} color="#813EFF" />
          <Text style={styles.optionText}>
            {i18n.t('settings.help')}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#813EFF" />
      </Pressable>

      {/* FAQ */}
      <Pressable
        style={({ pressed }) => [
          styles.optionButton,
          pressed && styles.optionButtonPressed,
        ]}
        onPress={() => navigation.navigate('FAQ')}
      >
        <View style={styles.optionLeft}>
          <Ionicons name="help-circle-outline" size={20} color="#813EFF" />
          <Text style={styles.optionText}>
            {i18n.t('settings.faq')}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#813EFF" />
      </Pressable>

      {/* PRIVACY */}
      <Pressable
        style={({ pressed }) => [
          styles.optionButton,
          pressed && styles.optionButtonPressed,
        ]}
        onPress={() => navigation.navigate('Privacy')}
      >
        <View style={styles.optionLeft}>
          <Ionicons name="document-text-outline" size={20} color="#813EFF" />
          <Text style={styles.optionText}>
            {i18n.t('settings.privacy')}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#813EFF" />
      </Pressable>

      {/* LOGOUT */}
      <Pressable
        style={({ pressed }) => [
          styles.logoutButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => alert('Logging out...')}
      >
        <View style={styles.buttonContent}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>
            {i18n.t('settings.logout')}
          </Text>
        </View>
      </Pressable>

    </ScrollView>
  );
}

/* ===========================
   ESTILOS 
=========================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 30,
    textAlign: 'center',
  },
  transporterModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    marginLeft: -10,
  },
  transporterModeText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  notificationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#813EFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  notificationsText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  sectionTitleAccount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginTop: 10,
    marginBottom: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#813EFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  optionButtonPressed: {
    backgroundColor: '#E5D4FF',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  sectionTitleHelp: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginTop: 13,
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 60,
    backgroundColor: '#813EFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 110,
  },
  buttonPressed: {
    backgroundColor: '#5f2ecf',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
