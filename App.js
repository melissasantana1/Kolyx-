import { Inter_300Light, Inter_800ExtraBold, useFonts } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Asset from 'expo-asset';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';

import Tela1 from './Onbording/Tela1';
import Tela2 from './Onbording/Tela2';
import Tela3 from './Onbording/Tela3';
import Routes from './Routes/index';
import Welcome from './Sign/Welcome';

import Currency from './Homes/Configuracao/Currency';
import FAQ from './Homes/Configuracao/FAQ';
import Help from './Homes/Configuracao/Help';
import Language from './Homes/Configuracao/Language';
import Privacy from './Homes/Configuracao/Privacy';
import Security from './Homes/Configuracao/Security';

import CurrencyT from './Homes2/ConfiguracaoT/CurrencyT';
import Earnings from './Homes2/ConfiguracaoT/Earnings';
import FAQT from './Homes2/ConfiguracaoT/FAQT';
import HelpT from './Homes2/ConfiguracaoT/HelpT';
import LanguageT from './Homes2/ConfiguracaoT/LanguageT';
import Offiline from './Homes2/ConfiguracaoT/Offline';
import Password from './Homes2/ConfiguracaoT/Password';
import Policy from './Homes2/ConfiguracaoT/Policy';
import Scheduled from './Homes2/ConfiguracaoT/Scheduled';

import Settings from "./Homes/Settings";

import { LanguageProvider } from "./i18n/context/LanguageContext";


import EditProfile from './Homes/EditProfile';
import Filtros from './Homes/Filtros';
import Home from './Homes/Home';
import SearchResults from './Homes/SearchResult';
import Sendnow from './Homes/SendNow';

import HomeT from './Homes2/HomeT';
import IndexTras from './Homes2/IndexTras';
import LoadingScreen from './Homes2/Loadingscreen';

import IndexSend from './Homes/IndexSend';
import EditProfileT from './Homes2/EditProfile';

import Chat from './Homes/Configuracao/HelpCenter/Chat';
import ChatSuport from './Homes/Configuracao/HelpCenter/ChatEmail/ChatSuport';
import EmailSuport from './Homes/Configuracao/HelpCenter/ChatEmail/EmailSuport';

import ChangeNumber from './Homes/Configuracao/PasswordSecurity/ChangeNumber.js';
import Withdraw from "./Homes2/ConfiguracaoT/Withdraw/Withdraw";

import SettingsT from './Homes2/SettingsT';

import InboxChat from "./Homes/InboxChat";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstTime, setIsFirstTime] = useState(null);

  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    async function preloadImages() {
      const images = [
        require('./Onbording/img/tela1.png'),
        require('./Onbording/img/tela2.png'),
        require('./Onbording/img/tela3.png'),
        require('./Onbording/img/Top.png'),
      ];
      await Promise.all(images.map((img) => Asset.loadAsync(img)));
    }
    preloadImages();
  }, []);

  useEffect(() => {
    async function checkOnboardingStatus() {
      try {
        const hasSeen = await AsyncStorage.getItem('hasSeenOnboarding');
        setIsFirstTime(!hasSeen);
      } catch (error) {
        console.log('Erro ao verificar onboarding:', error);
        setIsFirstTime(true);
      }
    }
    checkOnboardingStatus();
  }, []);

  const finishOnboarding = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    setIsFirstTime(false);
  };

  if (!fontsLoaded || isFirstTime === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#813EFF" />
      </View>
    );
  }

  return (
    <>
    <LanguageProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} hidden={false} />
      <NavigationContainer>

        <Stack.Navigator screenOptions={{ headerShown: false }}>

          {/* ONBOARDING */}
          {isFirstTime ? (
            <>
              <Stack.Screen name="Tela1">
                {(props) => <Tela1 {...props} onFinish={finishOnboarding} />}
              </Stack.Screen>
              <Stack.Screen name="Tela2">
                {(props) => <Tela2 {...props} onFinish={finishOnboarding} />}
              </Stack.Screen>
              <Stack.Screen name="Tela3">
                {(props) => <Tela3 {...props} onFinish={finishOnboarding} />}
              </Stack.Screen>
              <Stack.Screen name="Welcome" component={Welcome} />
            </>
          ) : null}

          {/* TELAS GLOBAIS — SEM DUPLICAÇÃO */}
          <Stack.Screen name="Routes" component={Routes} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Sendnow" component={Sendnow} />
          <Stack.Screen name="SearchResults" component={SearchResults} />
          <Stack.Screen name="Filtros" component={Filtros} />

          {/* TRANSPORTER */}
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen name="IndexTras" component={IndexTras} />
          <Stack.Screen name="HomeT" component={HomeT} />
          <Stack.Screen name="EditProfileT" component={EditProfileT} />

          {/* SENDER */}
          <Stack.Screen name="IndexSend" component={IndexSend} />
          <Stack.Screen name="Home" component={Home} />
           <Stack.Screen name="Currency" component={Currency} />
          <Stack.Screen name="Security" component={Security} />
          <Stack.Screen name="Language" component={Language} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="FAQ" component={FAQ} />
          <Stack.Screen name="Privacy" component={Privacy} />

          <Stack.Screen name="Earnings" component={Earnings} />
          <Stack.Screen name="Scheduled" component={Scheduled} />
          <Stack.Screen name="Offiline" component={Offiline} />
          <Stack.Screen name="CurrencyT" component={CurrencyT} />
          <Stack.Screen name="LanguageT" component={LanguageT} />
          <Stack.Screen name="Password" component={Password} />
          <Stack.Screen name="HelpT" component={HelpT} />
          <Stack.Screen name="FAQT" component={FAQT} />
          <Stack.Screen name="Policy" component={Policy} />

          <Stack.Screen name="Settings" component={Settings} />
        
          <Stack.Screen name="InboxChat" component={InboxChat} />

          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="ChatSuport" component={ChatSuport} />
          <Stack.Screen name="EmailSuport" component={EmailSuport} />
          <Stack.Screen name="ChangeNumber" component={ChangeNumber}/>
          <Stack.Screen name="Withdraw" component={Withdraw}/>
          <Stack.Screen name="SettingsT" component={SettingsT}/>
           
        </Stack.Navigator>

      </NavigationContainer>
      </LanguageProvider>
    </>
  );
}
