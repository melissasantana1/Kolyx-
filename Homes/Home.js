import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Home() {
  const [progressStep, setProgressStep] = useState(1);
  const steps = [
    'Order Requested',
    'Picked Up',
    'On the Way',
    'Delivered',
  ];

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./img/logo3.png')}
          style={styles.profileImage}
          resizeMode="contain"
        />

        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons
            name="notifications-outline"
            size={28}
            color="#321393"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerLabel}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Sendnow')}
        >
          <Text style={styles.headerLabelText}>→ Send now</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View style={styles.searchContainer}>
          <View style={styles.searchInner}>
            <Ionicons
              name="search"
              size={20}
              color="#813EFF"
              style={styles.searchIcon}
            />

            <TextInput
              style={styles.searchInput}
              placeholder="Track your deliveries"
              placeholderTextColor="#C9A8FF"
            />
          </View>
        </View>

        {/* CURRENT DELIVERIES */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.currentDeliveriesTitle}>
              Current Deliveries
            </Text>

            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.currentDeliveriesBox}>
            <View style={styles.deliveryTopRow}>
              <Text style={styles.deliveryRoute}>
                London <Text style={styles.routeArrow}>→</Text> Italy
              </Text>

              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>On the Way</Text>
              </View>
            </View>

            <View style={styles.timeline}>
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <View style={styles.timelineItem}>
                    <View
                      style={[
                        styles.dot,
                        index <= progressStep
                          ? styles.activeDot
                          : styles.inactiveDot,
                      ]}
                    />

                    <Text
                      style={[
                        styles.timelineText,
                        index <= progressStep
                          ? styles.activeTimelineText
                          : styles.inactiveTimelineText,
                      ]}
                    >
                      {step}
                    </Text>
                  </View>

                  {index < steps.length - 1 && (
                    <View
                      style={[
                        styles.line,
                        index < progressStep
                          ? styles.activeLine
                          : styles.inactiveLine,
                      ]}
                    />
                  )}
                </React.Fragment>
              ))}
            </View>

            <View style={styles.deliveryDates}>
              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>Requested</Text>
                <Text style={styles.dateText}>21 Oct</Text>
                <Text style={styles.locationText}>
                  London, UK
                </Text>
              </View>

              <View style={styles.dateColumnRight}>
                <Text style={styles.dateLabel}>
                  Estimated Delivery
                </Text>
                <Text style={styles.dateText}>28 Oct</Text>
                <Text style={styles.locationText}>
                  Rome, Italy
                </Text>
              </View>
            </View>

            <View style={styles.deliveryBottom}>
              <View style={styles.personContainer}>
                <Image
                  source={{
                    uri: 'https://i.pravatar.cc/100?img=47',
                  }}
                  style={styles.personImage}
                />

                <View>
                  <Text style={styles.referenceLabel}>
                    Reference
                  </Text>

                  <Text style={styles.personName}>
                    Jade Anderson
                  </Text>
                </View>
              </View>

              <View style={styles.transportBox}>
                <Ionicons
                  name="car-outline"
                  size={21}
                  color="#813EFF"
                />

                <View>
                  <Text style={styles.transportLabel}>
                    Transport
                  </Text>

                  <Text style={styles.transportText}>
                    Car
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* PENDING REQUESTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.pendingRequestsTitle}>
              Pending Requests
            </Text>

            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* REQUEST 1 */}
          <View style={styles.requestCard}>
            <View style={styles.requestTopRow}>
              <Text style={styles.requestRoute}>
                London <Text style={styles.routeArrow}>→</Text> Vienna
              </Text>

              <View style={styles.pendingBadge}>
                <Text style={styles.pendingBadgeText}>
                  Pending
                </Text>
              </View>
            </View>

            <View style={styles.requestInfoRow}>
              <View>
                <Text style={styles.requestLabel}>
                  Requested date
                </Text>

                <Text style={styles.requestDate}>
                  23 Oct
                </Text>
              </View>

              <View style={styles.requestPerson}>
                <Image
                  source={{
                    uri: 'https://i.pravatar.cc/100?img=12',
                  }}
                  style={styles.requestPersonImage}
                />

                <View>
                  <Text style={styles.referenceLabel}>
                    Delivery by
                  </Text>

                  <Text style={styles.requestPersonName}>
                    Oliver Bennett
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* REQUEST 2 */}
          <View style={styles.requestCard}>
            <View style={styles.requestTopRow}>
              <Text style={styles.requestRoute}>
                London <Text style={styles.routeArrow}>→</Text> Portugal
              </Text>

              <View style={styles.pendingBadge}>
                <Text style={styles.pendingBadgeText}>
                  Pending
                </Text>
              </View>
            </View>

            <View style={styles.requestInfoRow}>
              <View>
                <Text style={styles.requestLabel}>
                  Requested date
                </Text>

                <Text style={styles.requestDate}>
                  23 Oct
                </Text>
              </View>

              <View style={styles.requestPerson}>
                <Image
                  source={{
                    uri: 'https://i.pravatar.cc/100?img=32',
                  }}
                  style={styles.requestPersonImage}
                />

                <View>
                  <Text style={styles.referenceLabel}>
                    Delivery by
                  </Text>

                  <Text style={styles.requestPersonName}>
                    Daniela Carter
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* RECENT DELIVERIES */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.recentDeliveriesTitle}>
              Recent Deliveries
            </Text>

            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* RECENT DELIVERY 1 */}
          <View style={styles.recentCard}>
            <View style={styles.recentTopRow}>
              <Text style={styles.recentRoute}>
                London <Text style={styles.routeArrow}>→</Text> Paris
              </Text>

              <View style={styles.completedBadge}>
                <Ionicons
                  name="checkmark-circle"
                  size={14}
                  color="#2E9D5B"
                />

                <Text style={styles.completedBadgeText}>
                  Completed
                </Text>
              </View>
            </View>

            <View style={styles.recentDetails}>
              <View>
                <Text style={styles.requestLabel}>
                  Delivery date
                </Text>

                <Text style={styles.requestDate}>
                  18 Oct
                </Text>

                <Text style={styles.finishedText}>
                  Finished 20 Oct
                </Text>
              </View>

              <View style={styles.requestPerson}>
                <Image
                  source={{
                    uri: 'https://i.pravatar.cc/100?img=5',
                  }}
                  style={styles.requestPersonImage}
                />

                <View>
                  <Text style={styles.referenceLabel}>
                    Delivered by
                  </Text>

                  <Text style={styles.requestPersonName}>
                    Sophie Miller
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* RECENT DELIVERY 2 */}
          <View style={styles.recentCard}>
            <View style={styles.recentTopRow}>
              <Text style={styles.recentRoute}>
                Rome <Text style={styles.routeArrow}>→</Text> Madrid
              </Text>

              <View style={styles.completedBadge}>
                <Ionicons
                  name="checkmark-circle"
                  size={14}
                  color="#2E9D5B"
                />

                <Text style={styles.completedBadgeText}>
                  Completed
                </Text>
              </View>
            </View>

            <View style={styles.recentDetails}>
              <View>
                <Text style={styles.requestLabel}>
                  Delivery date
                </Text>

                <Text style={styles.requestDate}>
                  14 Oct
                </Text>

                <Text style={styles.finishedText}>
                  Finished 16 Oct
                </Text>
              </View>

              <View style={styles.requestPerson}>
                <Image
                  source={{
                    uri: 'https://i.pravatar.cc/100?img=44',
                  }}
                  style={styles.requestPersonImage}
                />

                <View>
                  <Text style={styles.referenceLabel}>
                    Delivered by
                  </Text>

                  <Text style={styles.requestPersonName}>
                    Laura Wilson
                  </Text>
                </View>
              </View>
            </View>
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
  },

  headerLabel: {
    position: 'absolute',
    bottom: -30,
    left: 65,
    backgroundColor: '#321393',
    width: 246,
    height: 62,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerLabelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  searchContainer: {
    marginTop: 20,
    marginBottom: -10,
  },

  searchInner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#813EFF',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    height: 48,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#321393',
  },

  section: {
    marginTop: 50,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  seeAll: {
    fontSize: 14,
    color: '#813EFF',
    fontWeight: '600',
    marginRight: 10,
  },

  currentDeliveriesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#121212',
  },

  currentDeliveriesBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 15,
    backgroundColor: '#fff',
  },

  deliveryTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  deliveryRoute: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111',
  },

  routeArrow: {
    color: '#813EFF',
    fontWeight: '900',
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#813EFF',
    marginRight: 6,
  },

  statusText: {
    fontSize: 12,
    color: '#813EFF',
    fontWeight: '700',
  },

  timeline: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 22,
  },

  timelineItem: {
    alignItems: 'center',
    width: 48,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 7,
    zIndex: 2,
  },

  activeDot: {
    backgroundColor: '#813EFF',
  },

  inactiveDot: {
    backgroundColor: '#D5D5D5',
  },

  line: {
    flex: 1,
    height: 3,
    marginTop: 5,
    marginHorizontal: -2,
  },

  activeLine: {
    backgroundColor: '#813EFF',
  },

  inactiveLine: {
    backgroundColor: '#D5D5D5',
  },

  timelineText: {
    fontSize: 8,
    textAlign: 'center',
    lineHeight: 10,
  },

  activeTimelineText: {
    color: '#813EFF',
    fontWeight: '700',
  },

  inactiveTimelineText: {
    color: '#999',
    fontWeight: '500',
  },

  deliveryDates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 14,
  },

  dateColumn: {
    flex: 1,
  },

  dateColumnRight: {
    flex: 1,
    alignItems: 'flex-end',
  },

  dateLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 3,
  },

  dateText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#222',
    marginBottom: 3,
  },

  locationText: {
    fontSize: 11,
    color: '#666',
  },

  deliveryBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },

  personContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  personImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 9,
  },

  referenceLabel: {
    fontSize: 10,
    color: '#999',
    marginBottom: 2,
  },

  personName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222',
  },

  transportBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: 95,
  },

  transportLabel: {
    fontSize: 9,
    color: '#999',
    marginLeft: 7,
  },

  transportText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#222',
    marginLeft: 7,
  },

  pendingRequestsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#121212',
    marginBottom: 10,
    marginTop: -10,
  },

  requestCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 12,
  },

  requestTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  requestRoute: {
    fontSize: 16,
    fontWeight: '800',
    color: '#222',
  },

  pendingBadge: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  pendingBadgeText: {
    color: '#813EFF',
    fontSize: 11,
    fontWeight: '700',
  },

  requestInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  requestLabel: {
    fontSize: 10,
    color: '#999',
    marginBottom: 3,
  },

  requestDate: {
    fontSize: 14,
    fontWeight: '800',
    color: '#222',
  },

  requestPerson: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  requestPersonImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 9,
  },

  requestPersonName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#222',
  },

  recentDeliveriesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#121212',
  },

  recentCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 12,
  },

  recentTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  recentRoute: {
    fontSize: 16,
    fontWeight: '800',
    color: '#222',
  },

  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF7EF',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
  },

  completedBadgeText: {
    color: '#2E9D5B',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },

  recentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  finishedText: {
    fontSize: 10,
    color: '#888',
    marginTop: 4,
  },
});