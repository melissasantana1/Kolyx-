import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import i18n from '../i18n';
 // 🔥 ADICIONADO (ÚNICA COISA NOVA)

export default function Tela1(){
  const navigation = useNavigation();

  const handleSkip = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }], // garante que o usuário não volte ao onboarding
    });
  };

  return(
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.skipButton}
        onPress={handleSkip} // 🔥 corrigido (antes estava errado)
      >
        <Text style={styles.skipButtonText}>
          {i18n.t('onboarding.skip')}
        </Text>
      </TouchableOpacity>

      <View style={styles.imageTopo}>
        <Image
          source={require('./img/Top.png')}
          style={styles.imagem}
        />
      </View>

      <View style={styles.imageContainer}>
        <Image
         source={require('./img/tela1.png')}
          style={styles.imagem}
        />
      </View>

      <Text style={styles.testFont}>
        {i18n.t('onboarding.title')}
      </Text>

      <Text style={styles.testFont2}>
        {i18n.t('onboarding.description')}
      </Text>

      <View style={styles.pagination}>
        <View style={[styles.dot, { backgroundColor: '#813EFF' }]} />  
        <View style={[styles.dot, { backgroundColor: '#ccc' }]} />
        <View style={[styles.dot, { backgroundColor: '#ccc' }]} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Tela2')}
      >
        <Text style={styles.buttonText}>
          {i18n.t('onboarding.next')}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 60,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#813EFF',
    width: 328,
    height: 62,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 23
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -280,
  },
  imagem: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
 testFont: {
  fontFamily: 'Inter_800ExtraBold',
  fontSize: 30,
  color: '#000',
  marginBottom: -80,
  textAlign: 'center',
  alignSelf: 'center',
  paddingHorizontal: 25,
  paddingVertical: 95
  
},

testFont2:{
  fontFamily: 'Inter_300Light',
  fontSize: 18,
  color: '#813EFF',
  marginBottom: 40,
  textAlign: 'center',
  alignSelf: 'center',
  paddingHorizontal: 25,
  paddingVertical: -55
},
  imageTopo:{
    position: 'absolute',
    top: 15,
    left: 20,
    right: 38,
    alignItems: 'center',
    zIndex: 1,
    marginTop: -90
  },
  skipButton: {
    position: 'absolute',
    top: 57,
    right: 37,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 10,
  },
  skipButtonText: {
    color: '#813EFF',
    fontSize: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
