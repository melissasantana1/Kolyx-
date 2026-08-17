import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = {
  primary: '#813EFF',
  background: '#FFFFFF',
  text: '#000000',
  buttonText: '#FFFFFF',
};

const CODE_LENGTH = 6;

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check your SMS</Text>

      <Text style={styles.subtitle}>
        We sent you SMS with a 6 digit code
      </Text>

      <View style={styles.codeContainer}>
        {Array.from({ length: CODE_LENGTH }).map((_, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive the code?</Text>

        <TouchableOpacity>
          <Text style={styles.resendLink}> Resend</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 13,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 32,
  },

  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  codeInput: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
  },

  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },

  resendText: {
    fontSize: 14,
    color: COLORS.text,
  },

  resendLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
  },

  buttonText: {
    color: COLORS.buttonText,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
