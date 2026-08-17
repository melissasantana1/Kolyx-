import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from '../Homes/IndexSend';
import Signin from '../Sign/Signin';
import Signup from '../Sign/Signup';

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Signin" component={Signin} />
      <AuthStack.Screen name="Signup" component={Signup} />
     <AuthStack.Screen name="MainTabs" component={MainTabs} />
      
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;
