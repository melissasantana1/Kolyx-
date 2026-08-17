import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function HomeT() {
  const [progressStep, setProgressStep] = useState(1);
  const steps = ['Pedido Recebido', 'Saiu para Entrega', 'Em Trânsito', 'Entregue'];

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 🔹 HEADER */}
      <View style={styles.header}>
        <Image
          source={require('./img/logo3.png')}
          style={styles.profileImage}
          resizeMode="contain"
        />

        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={28} color="#321393" />
        </TouchableOpacity>

        {/* 🔹 Botão SEND NOW */}
        <TouchableOpacity
          style={styles.headerLabel}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Sendnow')}
        >
          <Ionicons
            name="scan-outline"
            size={20}
            color="#fff"
            style={{ marginRight: 0 }}
          />
          <Text style={styles.headerLabelText}>Scan QR code</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 Conteúdo Scroll */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >

        {/* 🔹 AVAILABILITY MODE */}
        <Text style={styles.titleAvailability}>Availability Mode</Text>

        <View style={styles.availabilityBox}>
          <TouchableOpacity
            style={styles.availabilitySettingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={22} color="#813EFF" />
          </TouchableOpacity>

          <View style={styles.availabilityInner}>
            <View style={styles.modeTag}>
              <Text style={styles.modeTagText}>Flexible</Text>
            </View>

            <Text style={styles.availabilityDescription}>
              Available for immediate trips
            </Text>
          </View>
        </View>

        {/* 🔹 SESSÃO 1 - Current Deliveries */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.titleCurrentDeliveries}>Current Deliveries</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.boxCurrentDeliveries}>
            <Text style={styles.deliveryInfo}>London → Italy</Text>

            <View style={styles.timeline}>
              {steps.map((_, index) => (
                <React.Fragment key={index}>
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: index <= progressStep ? '#813EFF' : '#ccc' },
                    ]}
                  />
                  {index < steps.length - 1 && (
                    <View
                      style={[
                        styles.line,
                        { backgroundColor: index < progressStep ? '#813EFF' : '#ccc' },
                      ]}
                    />
                  )}
                </React.Fragment>
              ))}
            </View>

            <View style={styles.deliveryDates}>
              <Text style={styles.dateText}>Depart: 04 Nov, 08:00</Text>
              <Text style={styles.dateText}>ETA: 07 Nov, 22:00</Text>
            </View>
          </View>
        </View>

        {/* 🔹 SESSÃO 2 - Pending Requests */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.titlePendingRequests}>Pending Requests</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.boxPendingRequests}>
            <Text style={styles.placeholderText}>No pending requests</Text>
          </View>
        </View>

        {/* 🔹 SESSÃO 3 - Recent Deliveries */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.titleRecentDeliveries}>Recent Deliveries</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.boxRecentDeliveries}>
            <Text style={styles.placeholderText}>No recent deliveries</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  header: {
    backgroundColor: '#813EFF',
    width: 375,
    height: 160,
    borderRadius: 20,
    alignSelf: 'center',
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 10,
  },

  profileImage: {
    marginTop: -50,
    top: 0,
    left: 15,
    width: 120,
    height: 70,
  },

  notificationIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    marginTop: 24
  },

  headerLabel: {
    position: 'absolute',
    bottom: -30,
    left: 65,
    backgroundColor: '#321393',
    width: 246,
    height: 62,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },

  headerLabelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  // 🔹 Availability Mode
  titleAvailability: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginTop: 25,
    marginBottom: 8,
    marginLeft: 5,
  },

  availabilityBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: -10,
    position: 'relative',
  },

  availabilitySettingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  availabilityInner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  modeTag: {
    backgroundColor: '#813EFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 15,
    marginBottom: 10,
  },

  modeTagText: {
    color: '#fff',
    fontWeight: '600',
  },

  availabilityDescription: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
    marginBottom: 10,
  },

  section: {
    marginTop: 40,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  // =================== TITULOS SEPARADOS ===================
  titleCurrentDeliveries: {
    fontSize: 18,
    fontWeight: '700',
    color: '#121212',
    marginTop: 6,
    marginBottom: 10,
  },
  titlePendingRequests: {
    fontSize: 18,
    fontWeight: '700',
    color: '#121212',
    marginTop: -10,
    marginBottom: 10,
  },
  titleRecentDeliveries: {
    fontSize: 18,
    fontWeight: '700',
    color: '#121212',
    marginTop: -10,
    marginBottom: 15, // maior margem para scroll completo
  },

  seeAll: {
    fontSize: 14,
    color: '#813EFF',
    fontWeight: '600',
    marginRight: 10
  },

  // =================== BOXES SEPARADAS ===================
  boxCurrentDeliveries: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  boxPendingRequests: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  boxRecentDeliveries: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 40, // maior para scroll completo
  },

  deliveryInfo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },

  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  line: {
    flex: 1,
    height: 2,
  },

  deliveryDates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  dateText: {
    fontSize: 13,
    color: '#555',
  },

  placeholderText: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    paddingVertical: 10,
  },
});
