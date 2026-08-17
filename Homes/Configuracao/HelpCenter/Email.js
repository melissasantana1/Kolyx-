import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
  purple: '#813EFF',
  black: '#000'
};

export default function Email() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>

        <Text style={styles.title}>Email</Text>
      </View>

      {/* Conteúdo básico */}
      <View style={styles.content}>
        <Text style={styles.mainText}>
          Email support
        </Text>

        <Text style={styles.subText}>
          This is a basic email screen.  
          You can build the form here later.
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 60
  },

  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },

  backButton: {
    position: 'absolute',
    left: 20
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.black
  },

  content: {
    paddingHorizontal: 20
  },

  mainText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.purple,
    marginBottom: 10
  },

  subText: {
    fontSize: 14,
    color: COLORS.black
  }
});
