import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Tela3(){
    const navigation = useNavigation();

  return(
     
<View style={styles.container}>

     <View style={styles.imageTopo}>
             <Image
              source={require('./img/Top.png')}
              style={styles.imagem}
            />
        </View>
      
  
      <View style={styles.imageContainer}>
        <Image
          source={require('./img/tela3.png')}
          style={styles.imagem}
        />
      </View>

      <Text style={styles.testFont}>Real-time updates</Text>
          <Text style={styles.testFont2}>Stay in the know with live tracking
            and instant updates on your shipments from pickup to delivery.
          </Text>
     

            <View style={styles.pagination}>
                              <View style={[styles.dot, { backgroundColor: '#ccc' }]} />  
                              <View style={[styles.dot, { backgroundColor: '#ccc' }]} />
                              <View style={[styles.dot, { backgroundColor: '#813EFF' }]} />
                               </View>
    
               <TouchableOpacity
               style={styles.button}
                 onPress={() => navigation.navigate('Welcome')}>
                   
                <Text style={styles.buttonText}>Let's get started</Text>
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
    marginBottom: -230, // empurra a imagem um pouco pra baixo
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