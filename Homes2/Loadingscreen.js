 import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function LoadingScreen({ navigation, route }) {
  const { targetScreen } = route.params || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: targetScreen || 'IndexSend' }], // fallback seguro
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation, targetScreen]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#813EFF" />
    </View>
  );
}
