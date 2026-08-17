import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function EmailSuport() {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);

  const problems = [
    'Delivery lost',
    'Delivery damaged in transit',
    'Delivery delayed',
    'Transporter unresponsive',
    'Tracking not updating',
    'Account access issues',
    'Incorrect or unexpected charges',
    'Other',
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
           onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>Email Support</Text>

          <View style={styles.rightSpacer} />
        </View>

        {/* Problem Type */}
        <Text style={styles.label}>Problem type</Text>

        <View style={styles.selectWrapper}>
          <TouchableOpacity
            style={styles.selectBox}
            onPress={() => setOpen(!open)}
          >
            <Text style={styles.selectText}>
              {selectedProblem || 'Select a problem type'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>

          {open && (
            <View style={styles.dropdown}>
              {problems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.option,
                    selectedProblem === item && styles.optionSelected,
                  ]}
                  onPress={() => {
                    setSelectedProblem(item);
                    setOpen(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Leave a message */}
        <Text style={styles.label}>Leave a message</Text>

        <View style={styles.messageBox}>
          <TextInput
            style={styles.textInput}
            placeholder="Tell us what the problem is and we'll get back to you as soon as we can"
            placeholderTextColor="#999"
            multiline
          />
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send an email</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },

  backButton: {
    width: 40,
    alignItems: 'flex-start',
    marginTop: -15,
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginTop: -15,
  },

  rightSpacer: {
    width: 40,
  },

  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    marginTop: 20,
  },

  selectWrapper: {
    position: 'relative',
    zIndex: 10,
  },

  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    backgroundColor: '#fff',
  },

  selectText: {
    color: '#000',
    fontSize: 14,
  },

  dropdown: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    zIndex: 20,
  },

  option: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  optionSelected: {
    backgroundColor: '#EFE6FF', // roxo suave
  },

  optionText: {
    color: '#000',
    fontSize: 14,
  },

  messageBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 150,
    padding: 10,
  },

  textInput: {
    fontSize: 14,
    color: '#000',
    textAlignVertical: 'top',
  },

  button: {
    marginTop: 290,
   
    marginHorizontal: 10,
    backgroundColor: '#813EFF',
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
