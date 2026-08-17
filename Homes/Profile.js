
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// --------------------------------------------------------------
// LARGURA DA TELA (para ajudar no layout das tabs)
// --------------------------------------------------------------
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Profile() {
  const navigation = useNavigation();

  // --------------------------------------------------------------
  // ESTADOS DO PERFIL
  // --------------------------------------------------------------
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState('Melissa Santana');
  const [rating] = useState(4.6);

  // País
  const [countryCode, setCountryCode] = useState('BR');
  const [countryInitials] = useState('BR');
  const [languages] = useState(['PT', 'EN']);

  // Tabs
  const [activeTab, setActiveTab] = useState('About');

  // Stats
  const [responseTime] = useState('30 min');
  const [deliveriesCount] = useState(0);
  const [reviewsCount] = useState(0);

  // Menus e modal
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // --------------------------------------------------------------
  // PERMISSÃO DA GALERIA
  // --------------------------------------------------------------
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

  // --------------------------------------------------------------
  // SELECIONAR FOTO
  // --------------------------------------------------------------
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

  // --------------------------------------------------------------
  // ABRIR TELA DE EDITAR PERFIL
  // --------------------------------------------------------------
  const handleEditProfile = () => {
    setMenuVisible(false);
    navigation.navigate('EditProfile', { currentData: { name, imageUri, countryCode } });
  };

  // --------------------------------------------------------------
  // BANDEIRA PERFEITA (PNG DO FLAGCDN)
  // --------------------------------------------------------------
  const getFlagUrl = (code) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

  // ==============================================================
  // RENDER
  // ==============================================================
  return (
    <View style={styles.container}>

      {/* -------------------------------------------------------------- */}
      {/* MENU SUPERIOR */}
      {/* -------------------------------------------------------------- */}
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

      {/* -------------------------------------------------------------- */}
      {/* FOTO DO PERFIL */}
      {/* -------------------------------------------------------------- */}
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

      {/* -------------------------------------------------------------- */}
      {/* NOME + RATING */}
      {/* -------------------------------------------------------------- */}
      <View style={styles.nameRow}>
        <Text style={styles.nameText}>{name}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={18} color="#FFC700" />
          <Text style={styles.ratingNumber}>{rating.toFixed(1)}</Text>
        </View>
      </View>

      {/* -------------------------------------------------------------- */}
      {/* BANDEIRA + IDIOMAS */}
      {/* -------------------------------------------------------------- */}
      <View style={styles.infoRow}>
        <View style={styles.nationality}>
          <View style={styles.roundFlag}>
            <Image
              source={{ uri: getFlagUrl(countryCode) }}
              style={{ width: '100%', height: '100%' }}
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

      {/* -------------------------------------------------------------- */}
      {/* TABS (3 IGUAIS, CENTRALIZADAS, BARRA FIXA IGUAL) */}
      {/* -------------------------------------------------------------- */}
      <View style={styles.tabsRow}>
        <TabButton title="About" active={activeTab === 'About'} onPress={() => setActiveTab('About')} />
        <TabButton title="Reviews" active={activeTab === 'Reviews'} onPress={() => setActiveTab('Reviews')} />
        <TabButton title="History" active={activeTab === 'History'} onPress={() => setActiveTab('History')} />
      </View>

      <View style={styles.separator} />

      {/* -------------------------------------------------------------- */}
      {/* CONTEÚDO DAS TABS */}
      {/* -------------------------------------------------------------- */}
      <View style={styles.tabContent}>
        {activeTab === 'About' && (
          <View>
            <Text style={styles.aboutText}>This is a simulated about section.</Text>

            <View style={styles.statsCard}>
              <StatBox title="Response time" value={responseTime} />
              <StatBox title="Deliveries" value={String(deliveriesCount)} />
              <StatBox title="Reviews" value={String(reviewsCount)} />
            </View>

            <View style={styles.deliveryHeader}>
              <View style={styles.deliveryHeaderInner}>
                <Text style={styles.deliverySizeTitle}>Delivery Size</Text>

                <TouchableOpacity
                  style={styles.infoTouch}
                  onPress={() => setModalVisible(true)}
                  activeOpacity={0.6}
                >
                  <View style={styles.infoIconCircle}>
                    <Ionicons name="help-outline" size={14} color="#813EFF" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.sizeBoxes}>
              <View style={styles.sizeBox}><Text style={styles.sizeText}>Small</Text></View>
              <View style={styles.sizeBox}><Text style={styles.sizeText}>Medium</Text></View>
              <View style={styles.sizeBox}><Text style={styles.sizeText}>Large</Text></View>
            </View>
          </View>
        )}

        {activeTab === 'Reviews' && (
          <Text style={styles.aboutText}>No reviews yet.</Text>
        )}

        {activeTab === 'History' && (
          <Text style={styles.aboutText}>No delivery history yet.</Text>
        )}
      </View>

      {/* -------------------------------------------------------------- */}
      {/* MODAL DE INFORMAÇÕES */}
      {/* -------------------------------------------------------------- */}
      <Modal
        animationType="fade"
        transparent={true}
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
              <Text style={styles.modalText}>Small deliveries are suitable for documents or small packages.</Text>

              <View style={styles.modalDivider} />

              <Text style={styles.modalSubtitle}>Medium</Text>
              <Text style={styles.modalText}>Fit larger boxes or multiple small items.</Text>

              <View style={styles.modalDivider} />

              <Text style={styles.modalSubtitle}>Large</Text>
              <Text style={styles.modalText}>For big or heavy packages requiring extra handling.</Text>
            </ScrollView>

          </View>
        </View>
      </Modal>

    </View>
  );
}

// --------------------------------------------------------------
// COMPONENTES AUXILIARES
// --------------------------------------------------------------
function TabButton({ title, active, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabBtn}>
      <Text style={[styles.tabBtnText, active && styles.tabBtnTextActive]}>
        {title}
      </Text>

      {active && <View style={styles.fixedTabBar} />}
    </TouchableOpacity>
  );
}

function StatBox({ title, value }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

// --------------------------------------------------------------
// ESTILOS
// --------------------------------------------------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 18 },

  // TOP BAR
  topBar: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 6, marginBottom: 6 },
  threeDots: { padding: 7, marginTop: 40 },
  dropdownMenu: { position: 'absolute', top: 65, right: 0, backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#E0E0E0', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, width: 150, zIndex: 10 },
  dropdownItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 14 },
  dropdownText: { fontSize: 15, color: '#813EFF', fontWeight: '600', marginLeft: 6 },

  // AVATAR
  avatarContainer: { alignItems: 'center', marginTop: 8 },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#EDEDED', borderWidth: 3, borderColor: '#fff' },
  avatarPlaceholder: { backgroundColor: '#813EFF', justifyContent: 'center', alignItems: 'center' },

  // NOME + RATING
  nameRow: { marginTop: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 },
  nameText: { fontSize: 20, fontWeight: '700', color: '#121212', marginRight: 10 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingNumber: { marginLeft: 6, color: '#333', fontWeight: '600' },

  // NACIONALIDADE
  infoRow: { marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 18 },
  nationality: { flexDirection: 'row', alignItems: 'center' },
  countryText: { marginLeft: 6, fontWeight: '600', color: '#333' },
  langInbox: { flexDirection: 'row', alignItems: 'center', marginLeft: 12 },
  langText: { marginLeft: 6, color: '#333', fontWeight: '600' },

  // BANDEIRA
  roundFlag: {
    width: 22,
    height: 22,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 0.9,
    borderColor: '#686363ff',
  },

  // --------------------------------------------------------------
  // TABS — TODAS IGUALMENTE SEPARADAS, BARRA PERFEITA
  // --------------------------------------------------------------
  tabsRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Cada tab ocupa exatamente 1/3
  tabBtn: {
    width: SCREEN_WIDTH / 3.3,
    alignItems: 'center',
    paddingVertical: 10,
  
  },

  tabBtnText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  tabBtnTextActive: {
    color: '#813EFF',
  },

  // Barra roxa fixa
  fixedTabBar: {
    marginTop: 16,
    width: '80%',
    height: 3,
    backgroundColor: '#813EFF',
    borderRadius: 3,
  },

 

  // CONTEÚDO
  tabContent: { marginTop: 14 },
  aboutText: { color: '#444' },

  // CARDS
  statsCard: { marginTop: 18, flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderRadius: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#EEE' },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '700', color: '#321393' },
  statTitle: { fontSize: 12, color: '#666', marginTop: 6, textAlign: 'center' },

  // DELIVERY
  deliveryHeader: { width: '100%', alignItems: 'flex-start', marginBottom: 15, marginTop: 25 },
  deliveryHeaderInner: { flexDirection: 'row', alignItems: 'center' },
  deliverySizeTitle: { fontSize: 16, fontWeight: '700', color: '#321393', marginRight: 6 },
  infoIconCircle: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#F3E8FF', alignItems: 'center', justifyContent: 'center' },

  sizeBoxes: { flexDirection: 'row', marginTop: 6 },
  sizeBox: { width: 80, backgroundColor: '#F3E8FF', borderWidth: 1, borderColor: '#813EFF', borderRadius: 10, paddingVertical: 10, alignItems: 'center', marginHorizontal: 4 },
  sizeText: { color: '#813EFF', fontWeight: '700' },

  // MODAL
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', borderRadius: 14, padding: 20, width: '90%', maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#000', marginTop: 15 },
  modalText: { color: '#000', fontSize: 15, marginBottom: 12, marginTop: 10 },
  modalDivider: { height: 1, backgroundColor: '#E5E5E5', marginVertical: 10 },
  modalSubtitle: { fontSize: 16, fontWeight: '500', color: '#000', marginBottom: 6 },
});
