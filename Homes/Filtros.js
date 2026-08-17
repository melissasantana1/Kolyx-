import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function Filtros({ navigation }) {
  const MIN = 5;
  const MAX = 50;

  const [distance, setDistance] = useState(MIN);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const transportOptions = [
    "car","bicycle","airplane","motorcycle","van","public transport",
    "scooter","boat","e-scooter","truck","on foot","tuk-tuk","container"
  ];
  const [selectedModes, setSelectedModes] = useState([]);
  const sizes = ["Small","Medium","Large"];
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const availableCount = 0;

  const toggleRating = (r) => {
    setSelectedRatings(prev =>
      prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]
    );
  };

  const toggleMode = (mode) => {
    setSelectedModes(prev =>
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    );
  };

  const toggleSize = (s) => {
    setSelectedSizes(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const clearAll = () => {
    setDistance(MIN);
    setSelectedRatings([]);
    setSelectedModes([]);
    setSelectedSizes([]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Filters</Text>

        <TouchableOpacity onPress={clearAll}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}>

        {/* Distance Section */}
        <View style={styles.distanceSection}>
          <View style={styles.distanceRow}>
            <Text style={styles.sectionTitle}>Distance</Text>
            <Text style={styles.distanceValue}>{distance} km</Text>
          </View>

          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={MIN}
            maximumValue={MAX}
            step={1}
            value={distance}
            onValueChange={setDistance}
            minimumTrackTintColor="#813EFF"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#813EFF"
          />
        </View>

        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <Text style={styles.sectionTitle}>Rating</Text>

          <View style={styles.ratingRow}>
            {[2,3,4,5].map(r => {
              const active = selectedRatings.includes(r);
              return (
                <TouchableOpacity
                  key={r}
                  style={[styles.ratingBox, active && styles.ratingBoxActive]}
                  onPress={() => toggleRating(r)}
                >
                  <Text style={[styles.ratingNumber, active && styles.ratingNumberActive]}>{r}</Text>
                  <Ionicons name="star" size={14} color={active ? "#fff" : "#813EFF"} style={{ marginLeft: 4 }} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Transport Mode */}
        <View style={styles.transportSection}>
          <Text style={styles.sectionTitle}>Transport mode</Text>

          <View style={styles.modesGrid}>
            {transportOptions.map(m => {
              const active = selectedModes.includes(m);
              return (
                <TouchableOpacity
                  key={m}
                  style={[styles.modeBox, active && styles.modeBoxActive]}
                  onPress={() => toggleMode(m)}
                >
                  <Text style={[styles.modeText, active && styles.modeTextActive]}>{m}</Text>
                  {active && <Ionicons name="checkmark-circle" size={14} color="#fff" style={{ marginLeft: 4 }} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Delivery Size */}
        <View style={styles.deliverySection}>
          <View style={styles.deliveryRow}>
            <Text style={styles.sectionTitle}>Delivery size</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.helpCircle}>
              <Text style={styles.helpText}>?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sizeRow}>
            {sizes.map(s => {
              const active = selectedSizes.includes(s);
              return (
                <TouchableOpacity
                  key={s}
                  style={[styles.sizeBox, active && styles.sizeBoxActive]}
                  onPress={() => toggleSize(s)}
                >
                  <Text style={[styles.sizeText, active && styles.sizeTextActive]}>{s}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

      </ScrollView>

      {/* BOTTOM BUTTON */}
      <TouchableOpacity style={styles.bottomButton} disabled={availableCount === 0}>
        <Text style={styles.bottomButtonText}>{availableCount} transporters available</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Delivery Sizes</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color="#000" />
              </Pressable>
            </View>

            <ScrollView>
              <Text style={styles.modalText}>
                Here you can find general information about delivery sizes.
              </Text>

              <View style={styles.modalDivider} />

              <Text style={styles.modalSubtitle}>Small</Text>
              <Text style={styles.modalText}>
                Small deliveries are suitable for documents or small packages.
              </Text>

              <View style={styles.modalDivider} />

              <Text style={styles.modalSubtitle}>Medium</Text>
              <Text style={styles.modalText}>
                Medium deliveries fit larger boxes or multiple items.
              </Text>

              <View style={styles.modalDivider} />

              <Text style={styles.modalSubtitle}>Large</Text>
              <Text style={styles.modalText}>
                Large deliveries cover big or heavy packages.
              </Text>
            </ScrollView>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    height: 100,
    paddingHorizontal: 16,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 20
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#000' },
  clearText: { color: '#813EFF', fontWeight: '700' },

  distanceSection: { marginBottom: 30 },
  ratingSection: { marginBottom: 25, marginTop: -10 },
  transportSection: { marginBottom: 25, marginTop: 7 },
  deliverySection: { marginBottom: 25, marginTop: -10 },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#000', marginBottom: 15, marginTop: 15 },

  distanceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  distanceValue: { color: '#000', fontWeight: '600' },

  ratingRow: { flexDirection: 'row', gap: 10, marginBottom: -15 },
  ratingBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#813EFF', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 6 },
  ratingBoxActive: { backgroundColor: '#813EFF' },
  ratingNumber: { color: '#813EFF', fontWeight: '600' },
  ratingNumberActive: { color: '#fff' },

  modesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  modeBox: { backgroundColor: '#F3EFFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, marginRight: 6, marginBottom: 6, flexDirection: 'row', alignItems: 'center' },
  modeBoxActive: { backgroundColor: '#5A28D6' },
  modeText: { color: '#5A28D6', fontWeight: '600' },
  modeTextActive: { color: '#fff' },

  deliveryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  helpCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#F0EBFF', justifyContent: 'center', alignItems: 'center', marginLeft: 6 },
  helpText: { color: '#5A28D6', fontWeight: '700' },

  sizeRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  sizeBox: { borderWidth: 1, borderColor: '#813EFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  sizeBoxActive: { backgroundColor: '#5A28D6' },
  sizeText: { color: '#813EFF', fontWeight: '600' },
  sizeTextActive: { color: '#fff' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#fff', padding: 18, borderRadius: 12, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: '700', marginLeft: 70, marginBottom: 10},
  modalText: { fontSize: 14, color: '#444', marginBottom: 10 },
  modalSubtitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  modalDivider: { height: 1, backgroundColor: '#ddd', marginVertical: 10 },

  bottomButton: { backgroundColor: '#813EFF', borderRadius: 10, paddingVertical: 14, alignItems: 'center', position: 'absolute', bottom: 50, left: 20, right: 20 },
  bottomButtonText: { color: '#fff', fontWeight: '700' }
});
