import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function Tela2(){
  const navigation = useNavigation();

  function navegaSobre(){
    navigation.navigate('Sobre', { nome: 'frases pode ir aqui'})
  }
    return(
    <View style={styles.container}>


        <TouchableOpacity
                style={styles.skipButton}
                 onPress={() => navigation.navigate('Welcome')} // nome da sua tela inicial
                 >
                 <Text style={styles.skipButtonText}>Skip</Text>
                </TouchableOpacity>
        

         <View style={styles.imageTopo}>
                 <Image
                  source={require('./img/Top.png')}
                  style={styles.imagem}
                />
            </View>

         <View style={styles.imageContainer}>
                <Image
                  source={require('./img/tela2.png')}
                  style={styles.imagem}
                />

               <Text style={styles.testFont}>Deliver anything, anywhere</Text>
                   <Text style={styles.testFont2}>From small parcels to oversized
                    items, choose a delivery option that fits your needs and schedule. 

                   </Text>

              </View>       

               <View style={styles.pagination}>
                  <View style={[styles.dot, { backgroundColor: '#ccc' }]} />  
                  <View style={[styles.dot, { backgroundColor: '#813EFF' }]} />
                  <View style={[styles.dot, { backgroundColor: '#ccc' }]} />
                   </View>

           <TouchableOpacity
           style={styles.button}
             onPress={() => navigation.navigate('Tela3')}>
               
            <Text style={styles.buttonText}>Next</Text>
           </TouchableOpacity>
         </View>
   
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor:  '#fff',
    paddingBottom: 60,
     justifyContent: 'space-between', 
  },
  
texto: {
  fontSize: 18,
  color: '#000',
  marginVertical: 20, // dá espaço entre a imagem e o botão
},
  button: {
    backgroundColor: '#813EFF', // cor do botão 
    width: 328,
    height: 62,
    borderRadius: 9
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 23
  },
   imageContainer: {
    flex: 1, // ocupa o espaço do meio
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -220, // empurra a imagem um pouco pra baixo
  },
   imagem: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  textoSobreImagem: {
  position: 'absolute',
  zIndex: 999,
  color: 'black',
  fontSize: 22,
  fontWeight: 'bold',
  textAlign: 'center',
  top: '75%', // 👈 aqui controla a altura vertical
  left: 0,
  right: 0,
  transform: [{ translateY: -10 }],
},
testFont: {
  fontFamily: 'Inter_800ExtraBold', 
  fontSize: 30,
  color: '#000',
  marginBottom: 15,
  textAlign: 'center',
   paddingLeft: 15,
  paddingRight: 15
},
testFont2:{
   fontFamily: 'Inter_300Light', 
  fontSize: 18,
  color: '#813EFF',
  marginBottom: 50,
  textAlign: 'center',
  paddingLeft: 17,
  paddingRight: 17
},
imageTopo:{
    position: 'absolute',  // deixa a imagem fixa em relação à tela
  top: 15,                // posiciona no topo da tela
  left: 20,
  right: 38,
  alignItems: 'center',
  zIndex: 1,  
  marginTop: -90           // garante que fique acima de outros elementos
          // garante que fique acima de outros elementos
},
skipButton: {
  position: 'absolute',
  top: 57,         // distância do topo da tela
  right: 37,       // distância da borda direita
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

})