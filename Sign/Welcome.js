import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

export default function Welcome({ navigation }) {
  const translateY = useRef(new Animated.Value(-100)).current; // começa acima
  const opacityAnim = useRef(new Animated.Value(0)).current; // começa invisível

  useEffect(() => {
    Animated.parallel([
      // Fade-in
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 2500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      // Descida + bounce
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 20, // desce para próximo do centro
          duration: 1500,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0, // bounce final
          duration: 1000,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Routes');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, translateY, opacityAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./img/logo.png')}
        style={[
          styles.imagem,
          {
            transform: [{ translateY }],
            opacity: opacityAnim,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#813EFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagem: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
