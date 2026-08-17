// Profile.js
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function ProfileT() {
  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState('Marco Rossi');
  const [rating, setRating] = useState(4.6);

  // NOVO SISTEMA DE BANDEIRA
  const [countryCode, setCountryCode] = useState('IT');
  const getFlagUrl = (code) =>
    `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

  const [countryInitials, setCountryInitials] = useState('IT');

  const [languages, setLanguages] = useState(['EN', 'DE']);
  const [activeTab, setActiveTab] = useState('About');

  const [deliveriesCount, setDeliveriesCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [transportModes, setTransportModes] = useState(["Car", "Scooter", "Airplane"]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permissão necessária',
            'Precisamos de acesso às suas fotos para você poder escolher uma foto de perfil.'
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (err) {
      console.log('Erro ao selecionar imagem:', err);
    }
  };

  const handleEditProfile = () => {
    setMenuVisible(false);
    navigation.navigate('EditProfileT', { currentData: { name, imageUri, countryCode } });
  };

  return (
    <View style={styles.container}>

      {/* ---------- Top bar ---------- */}
      <View style={styles.topBar}>
        <Text style={styles.empty} />
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            style={styles.threeDots}
            onPress={() => setMenuVisible(!menuVisible)}
            activeOpacity={0.8}
          >
            <Ionicons name="ellipsis-vertical" size={22} color="#222" />
          </TouchableOpacity>

          {menuVisible && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handleEditProfile}
                activeOpacity={0.7}
              >
                <Ionicons name="create-outline" size={18} color="#321393" />
                <Text style={styles.dropdownText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Ionicons name="camera" size={28} color="#fff" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Nome + Rating */}
      <View style={styles.nameRow}>
        <Text style={styles.nameText}>{name}</Text>
        <SingleStar rating={rating} />
      </View>

      {/* País + Idiomas */}
      <View style={styles.infoRow}>
        <View style={styles.nationality}>
          <View style={styles.roundFlag}>
            <Image
              source={{ uri: getFlagUrl(countryCode) }}
              style={{ width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.countryText}>{countryInitials}</Text>
        </View>

        <View style={styles.langInbox}>
          <Ionicons name="mail-outline" size={18} color="#321393" />
          <Text style={styles.langText}>{languages.join(' • ')}</Text>
        </View>
      </View>

      {/* ------------------ ABAS ------------------ */}
      <View style={styles.tabsWrapper}>
        <TabButton title="About" active={activeTab === 'About'} onPress={() => setActiveTab('About')} />
        <TabButton title="Reviews" active={activeTab === 'Reviews'} onPress={() => setActiveTab('Reviews')} />
        <TabButton title="History" active={activeTab === 'History'} onPress={() => setActiveTab('History')} />
      </View>

      {/* Conteúdo da aba */}
      <View style={styles.tabContent}>
        {activeTab === 'About' && (
          <View>
            <Text style={styles.aboutText}>This is a simulated about section.</Text>

            {/* CARD DELIVERIES + REVIEWS */}
            <View style={styles.statsCard}>
              <View style={[styles.statBox, styles.statBoxCenter]}>
                <Text style={styles.statValue}>{deliveriesCount}</Text>
                <Text style={styles.statTitle}>Deliveries</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{reviewsCount}</Text>
                <Text style={styles.statTitle}>Reviews</Text>
              </View>
            </View>

            {/* TRANSPORT MODES */}
            <View style={styles.deliveryHeader}>
              <Text style={styles.deliverySizeTitle}>Transport Modes</Text>
            </View>

            <View style={styles.modeBoxes}>
              {transportModes.map((mode, index) => (
                <View key={index} style={styles.sizeBoxSmall}>
                  <Text style={styles.sizeText}>{mode}</Text>
                </View>
              ))}
            </View>

            {/* DELIVERY SIZE */}
            <View style={styles.deliveryHeader}>
              <View style={styles.deliveryHeaderInner}>
                <Text style={styles.deliverySizeTitle}>Delivery Size</Text>
                <TouchableOpacity style={styles.infoTouch} onPress={() => setModalVisible(true)}>
                  <View style={styles.infoIconCircle}>
                    <Ionicons name="help-outline" size={14} color="#813EFF" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.sizeBoxes}>
              <View style={styles.sizeBoxSmall}><Text style={styles.sizeText}>Small</Text></View>
              <View style={styles.sizeBoxSmall}><Text style={styles.sizeText}>Medium</Text></View>
              <View style={styles.sizeBoxSmall}><Text style={styles.sizeText}>Large</Text></View>
            </View>
          </View>
        )}

        {activeTab === 'Reviews' && <Text style={styles.aboutText}>No reviews yet.</Text>}
        {activeTab === 'History' && <Text style={styles.aboutText}>No delivery history yet.</Text>}
      </View>

      {/* MODAL DELIVERY SIZE */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Delivery Sizes</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color="#000" />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalText}>
                Here you can find general information about delivery sizes.
              </Text>

              <View style={styles.modalDivider} />

              <Text style={styles.modalSubtitle}>Small</Text>
              <Text style={styles.modalText}>Small deliveries are suitable for items like documents or small packages.</Text>

              <View style={styles.modalDivider} />

              <Text style={styles.modalSubtitle}>Medium</Text>
              <Text style={styles.modalText}>Medium deliveries fit larger boxes or multiple small items together.</Text>

              <View style={styles.modalDivider} />

              <Text style={styles.modalSubtitle}>Large</Text>
              <Text style={styles.modalText}>Large deliveries cover big or heavy packages that require extra handling.</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ===================== COMPONENTE TAB ===================== */
function TabButton({ title, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.tabBtn}
      activeOpacity={0.8}
    >
      <Text style={[styles.tabBtnText, active && styles.tabBtnTextActive]}>
        {title}
      </Text>

      {active && <View style={styles.internalIndicator} />}
    </TouchableOpacity>
  );
}

/* ===================== COMPONENTE ESTRELA ===================== */
function SingleStar({ rating }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      <Ionicons name="star" size={16} color="#FFC700" />
      <Text style={{ color: '#333', fontWeight: '600' }}>{rating.toFixed(1)}</Text>
    </View>
  );
}

/* ===================== ESTILOS COMPLETOS ===================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 18 },

  topBar: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 6, marginBottom: 6 },
  threeDots: { padding: 7, marginTop: 40 },
  dropdownMenu: { position: 'absolute', top: 65, right: 0, backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#E0E0E0', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, width: 150, zIndex: 10 },
  dropdownItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 14 },
  dropdownText: { fontSize: 15, color: '#321393', fontWeight: '600', marginLeft: 6 },

  avatarContainer: { alignItems: 'center', marginTop: 8 },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#EDEDED', borderWidth: 3, borderColor: '#fff' },
  avatarPlaceholder: { backgroundColor: '#321393', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 },

  nameRow: { marginTop: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 },
  nameText: { fontSize: 20, fontWeight: '700', color: '#121212' },

  infoRow: { marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 13 },
  nationality: { flexDirection: 'row', alignItems: 'center' },

  roundFlag: { width: 20, height: 20, borderRadius: 16, overflow: 'hidden', backgroundColor: '#ddd', borderWidth: 0.9,
    borderColor: '#686363ff', },
  countryText: { marginLeft: 6, fontWeight: '600', color: '#333' },

  langInbox: { flexDirection: 'row', alignItems: 'center', marginLeft: 12 },
  langText: { marginLeft: 6, color: '#333', fontWeight: '600' },

  /* ===== ABAS ===== */
  tabsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    paddingHorizontal: 15
  },

  tabBtn: {
    paddingVertical: 8,
    width: 90,
    alignItems: 'center',
    position: 'relative',
  },

  tabBtnText: {
    color: '#666',
    fontWeight: '700',
    fontSize: 16
  },

  tabBtnTextActive: {
    color: '#813EFF'
  },

  /* ===== INDICADOR DENTRO DA ABA ===== */
  internalIndicator: {
    width: 90,
    height: 3,
    backgroundColor: '#813EFF',
    borderRadius: 3,
    marginTop: 15
  },

  tabContent: { marginTop: 20, paddingHorizontal: 6 },

  aboutText: { color: '#444' },

  statsCard: { marginTop: 18, flexDirection: 'row', borderRadius: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#EEE', overflow: 'hidden' },
  statBox: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  statBoxCenter: { borderRightWidth: 1, borderRightColor: '#E5E5E5' },
  statValue: { fontSize: 18, fontWeight: '700', color: '#321393' },
  statTitle: { fontSize: 12, color: '#666', marginTop: 6, textAlign: 'center' },

  deliveryHeader: { width: '100%', alignItems: 'flex-start', marginBottom: 15, marginTop: 25, marginLeft: 6 },
  deliveryHeaderInner: { flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap' },
  deliverySizeTitle: { fontSize: 16, fontWeight: '700', color: '#321393', marginRight: 9 },

  infoTouch: { marginLeft: 0 },
  infoIconCircle: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#F3E8FF', alignItems: 'center', justifyContent: 'center' },

  sizeBoxes: { flexDirection: 'row', marginTop: -5, marginLeft: 0 },
  sizeBoxSmall: { minWidth: 65, backgroundColor: '#F3E8FF', borderWidth: 1, borderColor: '#813EFF', borderRadius: 10, paddingVertical: 7, alignItems: 'center', marginHorizontal: 7, paddingHorizontal: 8 },
  sizeText: { color: '#813EFF', fontWeight: '700', fontSize: 12 },

  modeBoxes: { flexDirection: 'row', flexWrap: 'wrap', marginTop: -5, marginLeft: 0 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', borderRadius: 14, padding: 20, width: '90%', maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 },
  modalTitle: { fontSize: 18, fontWeight: '700' },

  modalText: { fontSize: 15, marginBottom: 12, marginTop: 10 },
  modalDivider: { height: 1, backgroundColor: '#E5E5E5', marginVertical: 10 },
  modalSubtitle: { fontSize: 16, fontWeight: '500', marginBottom: 6 },
});
