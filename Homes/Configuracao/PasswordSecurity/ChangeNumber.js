import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function ChangeNumber() {
  const navigation = useNavigation();
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const inputs = useRef([]);

  /* TIMER STATES */
  const [seconds, setSeconds] = useState(60);
  const [timerStarted, setTimerStarted] = useState(false);
  const [canResend, setCanResend] = useState(false);

  /* TIMER LOGIC */
  useEffect(() => {
    if (!timerStarted) return;

    if (seconds === 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, timerStarted]);

  /* START TIMER */
  const requestCode = () => {
    setTimerStarted(true);
    setSeconds(60);
    setCanResend(false);
    // chamar backend aqui futuramente
  };

  const resendCode = () => {
    setSeconds(60);
    setCanResend(false);
    // chamar backend aqui futuramente
  };

  const handleChange = (text, index) => {
    if (text.length > 1) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }

    if (newCode.every((digit) => digit !== '')) {
      navigation.navigate('NewNumber');
    }
  };

  const handleBackspace = (key, index) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const formatTime = (sec) => {
    return `00:${sec < 10 ? '0' + sec : sec}`;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>

        <Text style={styles.title}>Change Number</Text>

        <View style={{ width: 40 }} />
      </View>

      {/* TEXTO */}
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to your current phone number
      </Text>

      {/* CODE INPUTS */}
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleBackspace(nativeEvent.key, index)
            }
            keyboardType="number-pad"
            maxLength={1}
            style={styles.codeBox}
          />
        ))}
      </View>

      {/* TIMER / REQUEST / RESEND */}
      <View style={styles.timerContainer}>
        
        {/* BEFORE REQUEST */}
        {!timerStarted && (
          <Text style={styles.resendText}>
            <Text style={styles.resendLink} onPress={requestCode}>
              Request code
            </Text>
          </Text>
        )}

        {/* COUNTDOWN */}
        {timerStarted && !canResend && (
          <Text style={styles.timerText}>
            You can request a new code in {formatTime(seconds)}
          </Text>
        )}

        {/* RESEND */}
        {canResend && (
          <Text style={styles.resendText}>
            Didn't receive the code?{' '}
            <Text style={styles.resendLink} onPress={resendCode}>
              Resend code
            </Text>
          </Text>
        )}

      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 75,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },

  backButton: {
    width: 40,
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
    marginBottom: 30,
    lineHeight: 20,
  },

  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  codeBox: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: '#813EFF',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },

  timerContainer: {
    marginTop: 30,
    alignItems: 'center',
  },

  timerText: {
    fontSize: 14,
    color: '#666',
  },

  resendText: {
    fontSize: 14,
    color: '#666',
  },

  resendLink: {
    color: '#813EFF',
    fontWeight: '600',
  },
});
