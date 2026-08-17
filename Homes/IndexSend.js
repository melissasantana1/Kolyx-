import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';

// 🔹 Importa as telas reais
import Home from './Home';
import Inbox from './Inbox';
import Profile from './Profile';
import Settings from './Settings';


const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Inbox') iconName = focused ? 'mail' : 'mail-outline';
            else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
            else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: '#813EFF',
          tabBarInactiveTintColor: '#999',
         tabBarIconStyle: {
    marginTop: 6,
},

tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: -17,
},
          headerShown: false,

          // 🔹 Estilo da barra inferior
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            height: 60,
            backgroundColor: '#fff',
            borderRadius: 20,
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 6,
          },
        })}
      >
        {/*  Home */}
        <Tab.Screen name="Home" component={Home} />

        {/*  Inbox */}
        <Tab.Screen
          name="Inbox"
          component={Inbox}
          options={{ title: 'Inbox' }}
        />

        {/*  Settings */}
        <Tab.Screen name="Settings" component={Settings} />

        {/*  Profile */}
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>

      {/*  Fundo branco sob a barra inferior */}
      <View style={styles.tabBackground} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 27,
    backgroundColor: '#fff',
  },
});
