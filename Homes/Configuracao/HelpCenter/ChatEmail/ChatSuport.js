import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ChatSuport() {
  const navigation = useNavigation();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: message,
      },
    ]);

    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>Talk to Support</Text>

          <View style={styles.rightSpacer} />
        </View>

        {/* Lista de mensagens */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContainer}
          renderItem={({ item }) => (
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />

        {/* Input + botão */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={22} color="#813EFF" />
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },

  backButton: {
    width: 40,
    alignItems: 'flex-start',
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },

  rightSpacer: {
    width: 40,
  },

  messagesContainer: {
    padding: 20,
    paddingBottom: 140,
  },

  messageBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#F2F2F2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },

  messageText: {
    color: '#000',
    fontSize: 15,
  },

  inputContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },

  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 15,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    fontSize: 15,
    color: '#000',
  },

  sendButton: {
    marginLeft: 10,
  },
});
