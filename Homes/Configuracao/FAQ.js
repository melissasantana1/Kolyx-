import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const FAQ_DATA = [
  {
    id: 0,
    question: 'How do i create a delivery on Kolyx?',
    answer:
      'Enter your destination and preferred date, then describe what you want to send. You can choose a specific date or a flexible option. Kolyx will show you travelers going the same way, you can chat with them and choose the one you prefer.',
  },
  {
    id: 1,
    question: 'What types of items can i send using Kolyx?',
    answer:
      'You can send personal items, gifts, documents, clothes, and everyday goods. Prohibited or illegal items, dangerous goods, and items restricted by law are not allowed.',
  },
  {
    id: 2,
    question: 'Can i send large or fragile items?',
    answer:
      "Yes, but it depends on the traveler's capacity and preferences. Travelers clearly state what they accept. For fragile items, proper packaging is required, and you should inform the traveler in advance.",
  },
  {
    id: 3,
    question: 'How do i track my shipment?',
    answer:
      'You can follow your delivery status directly in the app through notifications and chat updates with traveler. Key steps like pickup and delivery confirmation are shown in real time.',
  },
  {
    id: 4,
    question: "What if there's an issue with the package?",
    answer:
      'If there is a problem, you can report it in the app. Our support team will review the case and help find fair solution. Payments are protected until delivery is confirmed.',
  },
  {
    id: 5,
    question: 'What happens if i need to cancel the delivery?',
    answer:
      'You can cancel before the traveler accepts or before pickup. After acceptance or pickup, cancellation may involve conditions. The app will clearly show the policy before confirming.',
  },
  {
    id: 6,
    question: 'Do i need insurance in my delivery?',
    answer:
      "Basic protection is included through Kolyx's secure system. For high-value items, we recommend discussing additional coverage directly with the traveler.",
  },
  {
    id: 7,
    question: 'How are transporters verified?',
    answer:
      'Travelers go through profile verification such as email/phone verification and identity checks. Ratings and reviews from other users also help ensure trust.',
  },
  {
    id: 8,
    question: 'How can i contact the transporter?',
    answer:
      "You can message the traveler directly through Kolyx's secure in app chat before and after booking.",
  },
  {
    id: 9,
    question: 'Why do we hold payments until delivery?',
    answer:
      'Payments are held securely to protect both sides. The traveler is paid only after the sender confirms successful delivery. This ensures trust and fairness for everyone.',
  },
];

export default function FAQ() {
  const navigation = useNavigation();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>FAQ</Text>

        <View style={styles.rightSpacer} />
      </View>

      {/* CONTENT */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {FAQ_DATA.map((item, index) => (
          <View key={item.id} style={styles.card}>
            
            {/* Question */}
            <View style={styles.questionRow}>
              <Text style={styles.questionText}>
                {item.question}
              </Text>

              <TouchableOpacity onPress={() => toggleItem(index)}>
                <Ionicons
                  name={openIndex === index ? 'chevron-up' : 'chevron-down'}
                  size={22}
                  color="#000"
                />
              </TouchableOpacity>
            </View>

            {/* Answer */}
            {openIndex === index && (
              <Text style={styles.answerText}>
                {item.answer}
              </Text>
            )}

          </View>
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  backButton: {
    width: 40,
    alignItems: 'flex-start',
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },

  rightSpacer: {
    width: 40,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  card: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },

  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    marginRight: 10,
  },

  answerText: {
    marginTop: 12,
    fontSize: 14,
    color: '#813EFF',
    lineHeight: 20,
  },
});
