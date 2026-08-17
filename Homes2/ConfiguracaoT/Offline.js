import { StyleSheet, Text, View } from 'react-native';

export default function Offiline() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Offline Mode</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 22,
    fontWeight: '700',
  },
});
