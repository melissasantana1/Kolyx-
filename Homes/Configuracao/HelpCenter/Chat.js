import { useNavigation } from '@react-navigation/native';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function Chat() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* Header (só a seta) */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Título livre */}
      <Text style={styles.title}>Chat</Text>

      {/* Área da imagem */}
      <View style={styles.imageArea}>
        <Image
          source={require('./Chat.png')}
          style={styles.image}
        />
      </View>

      {/* Textos */}
      <Text style={styles.mainText}>How can we help you?</Text>

      <Text style={styles.subText}>
        We're here to aswer any questions you {"\n"}may have. Just ask!
      </Text>

      {/* Botão */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('ChatSuport')}
      >
        <Text style={styles.startButtonText}>Start a chat</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 0,
  },

  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },

  backArrow: {
    fontSize: 26,
    marginTop: 46,
    marginLeft: 3
  },

  title: {
    marginTop: 70, // 🔥 agora funciona SEM ATRAPALHAR
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '800',
    
  },

  imageArea: {
    width: '100%',
    height: 200,
    marginTop: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },

  mainText: {
    marginTop: 27,
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center', 
    
  },

  subText: {
    marginTop: 10,
    fontSize: 17,
    color: '#813EFF',
    textAlign: 'center',
  },

  startButton: {
  marginTop: 'auto',     // 👈 empurra o botão pra baixo
  marginBottom: 50,      // 👈 distância do fundo
  marginHorizontal: 30,  // 👈 margem esquerda e direita
  paddingVertical: 15,
  backgroundColor: '#813EFF',
  borderRadius: 9,
  alignItems: 'center',
  height: 60
},

  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    justifyContent: 'center',
    marginTop: 5
  },
});
