import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function PrivacyPolicy() {
  const navigation = useNavigation();

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

        <Text style={styles.title}>Privacy Policy</Text>
        <View style={styles.rightSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Text style={styles.date}>Last updated: [INSERT DATE]</Text>

        <Text style={styles.paragraph}>
Kolyx respects the privacy of its users and is committed to protecting personal data in accordance with the General Data Protection Regulation (GDPR – EU), applicable data protection laws, and the policies of the Google Play Store and Apple App Store.
        </Text>

        <Text style={styles.paragraph}>
By using the Kolyx application, you agree to this Privacy Policy.
        </Text>

        <Text style={styles.section}>1. Data Collected</Text>

        <Text style={styles.paragraph}>
Kolyx may collect the following personal data:
        </Text>

        <Text style={styles.subsection}>1.1 Data provided by the user</Text>
        <Text style={styles.list}>• Name</Text>
        <Text style={styles.list}>• Email address</Text>
        <Text style={styles.list}>• Phone number</Text>
        <Text style={styles.list}>• Photos submitted by the user (e.g. profile or delivery-related images)</Text>

        <Text style={styles.subsection}>1.2 Data collected automatically</Text>
        <Text style={styles.list}>• Real-time geographic location</Text>
        <Text style={styles.list}>• IP address</Text>
        <Text style={styles.list}>• Device language</Text>
        <Text style={styles.list}>• Device model</Text>
        <Text style={styles.list}>• Operating system and version</Text>
        <Text style={styles.list}>• Usage records and technical logs</Text>
        <Text style={styles.list}>• Session and authentication identifiers</Text>

        <Text style={styles.subsection}>1.3 Payment Data</Text>
        <Text style={styles.paragraph}>
Payments are processed by third-party payment providers, such as Stripe.
Kolyx does not store credit or debit card information.
        </Text>

        <Text style={styles.section}>2. Purpose of Data Processing</Text>
        
        <Text style={styles.paragraph}>
         The collected data is used to:
        </Text>
        <Text style={styles.list}>• Create and manage user accounts</Text>
        <Text style={styles.list}>• Authenticate and identify users</Text>
        <Text style={styles.list}>• Enable delivery services with accurate addresses</Text>
        <Text style={styles.list}>• Automatically set the application language</Text>
        <Text style={styles.list}>• Process payments and transactions</Text>
        <Text style={styles.list}>• Ensure security and prevent fraud</Text>
        <Text style={styles.list}>• Improve functionality, performance, and user experience</Text>
        <Text style={styles.list}>• Comply with legal and regulatory obligations</Text>

        <Text style={styles.section}>3. Data Sharing</Text>

         <Text style={styles.paragraph}>
          Personal data may be shared only when necessary with:
        </Text>
        <Text style={styles.list}>• Google (Android) and Apple (iOS)</Text>
        <Text style={styles.list}>• Cloud hosting and authentication service providers</Text>
        <Text style={styles.list}>• Stripe and other payment processors</Text>
        <Text style={styles.list}>• Analytics and performance monitoring services</Text>

        <Text style={styles.paragraph}>
         Kolyx does not sell personal data to third parties.
        </Text>

        <Text style={styles.section}>4. Data Storage and Security</Text>

        <Text style={styles.paragraph}>
        Personal data is stored in secure infrastructure using technologies such as:
        </Text>
        <Text style={styles.list}>• PostgreSQL</Text>
        <Text style={styles.list}>• Redis</Text>
        <Text style={styles.list}>• Supabase Auth</Text>

        <Text style={styles.subsection}>Security measures include:</Text>
        <Text style={styles.list}>• Data encryption</Text>
        <Text style={styles.list}>• Secure communication (HTTPS)</Text>
        <Text style={styles.list}>• Restricted access controls</Text>
        <Text style={styles.list}>• Monitoring against unauthorized access</Text>

        <Text style={styles.paragraph}>
Data is retained for as long as the user account remains active or as required by applicable law. Upon account deletion, data will be deleted or anonymized, unless legal retention is required.
        </Text>

        <Text style={styles.section}>5. User Rights</Text>

        <Text style={styles.paragraph}>
        In accordance with GDPR, users have the right to:
        </Text>
        <Text style={styles.list}>• Access their personal data</Text>
        <Text style={styles.list}>• Request correction of inaccurate data</Text>
        <Text style={styles.list}>• Request deletion of their account and data</Text>
        <Text style={styles.list}>• Withdraw consent for optional data processing</Text>
        <Text style={styles.list}>• Request data portability</Text>

        <Text style={styles.paragraph}>
Requests may be submitted through the contact details below.
        </Text>

        <Text style={styles.section}>6. Children’s Privacy</Text>

        <Text style={styles.paragraph}>
Kolyx is not intended for individuals under the age of 18. We do not knowingly collect personal data from minors.
        </Text>

        <Text style={styles.section}>7. Contact and Data Controller</Text>

        <Text style={styles.paragraph}>
📧 Contact email: kolyxofficial@gmail.com
        </Text>

        <Text style={styles.paragraph}>
👤 Data Controller: kolyx
        </Text>

        <Text style={styles.section}>8. Changes to This Privacy Policy</Text>

        <Text style={styles.paragraph}>
This Privacy Policy may be updated from time to time. Users will be informed through the application or by updating the date of this document.
        </Text>

        <Text style={styles.section}>TERMS OF USE – KOLYX</Text>

        <Text style={styles.paragraph}>
Last updated: [INSERT DATE]
        </Text>

        <Text style={styles.paragraph}>
By accessing or using the Kolyx application, you agree to these Terms of Use.
        </Text>

        <Text style={styles.section}>1. Service Description</Text>

        <Text style={styles.paragraph}>
Kolyx is a delivery intermediation platform that connects users who wish to send items with users who perform deliveries. The application is free to use, with charges applying only to delivery-related transactions.
        </Text>

        <Text style={styles.section}>2. Account Registration</Text>

        <Text style={styles.list}>• Account creation is required to use the application</Text>
        <Text style={styles.list}>• Users are responsible for the accuracy of the information provided</Text>
        <Text style={styles.list}>• Providing false or unauthorized third-party information is prohibited</Text>

        <Text style={styles.section}>3. Use of Location Data</Text>

        <Text style={styles.paragraph}>
Access to location data is essential for the proper functioning of the service. Without location access, certain features may not function correctly.
        </Text>

        <Text style={styles.section}>4. Payments</Text>

        <Text style={styles.paragraph}>
Payments are processed by third-party providers (e.g. Stripe). Kolyx does not store payment card data. Users agree to the terms and policies of the selected payment provider.
        </Text>

        <Text style={styles.section}>5. User Responsibilities</Text>

        <Text style={styles.paragraph}>
         Users agree to:
        </Text>
        <Text style={styles.list}>• Use the application lawfully</Text>
        <Text style={styles.list}>• Avoid fraudulent or abusive behavior</Text>
        <Text style={styles.list}>• Respect third-party rights</Text>
        <Text style={styles.list}>• Not attempt unauthorized access to systems or data</Text>

        <Text style={styles.section}>6. Limitation of Liability</Text>

        <Text style={styles.paragraph}>
Kolyx acts as an intermediary platform and is not responsible for: </Text>

<Text style={styles.list}>• Individual user actions</Text>
<Text style={styles.list}>• Losses resulting from misuse of the application</Text>
<Text style={styles.list}>• Failures caused by third-party services or connectivity issues</Text>
        

        <Text style={styles.section}>7. Account Suspension or Termination</Text>

        <Text style={styles.paragraph}>
Kolyx reserves the right to suspend or terminate accounts that violate these Terms or applicable laws.
        </Text>

        <Text style={styles.section}>8. Changes to the Terms</Text>

        <Text style={styles.paragraph}>
These Terms may be updated at any time. Continued use of the application after changes constitutes acceptance of the updated Terms.
        </Text>

        <Text style={styles.section}>9. Contact</Text>

        <Text style={styles.paragraph}>
📧 Support email: kolyxofficial@gmail.com
        </Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  backButton: { width: 40 },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
  },

  rightSpacer: { width: 40 },

  scrollContent: { padding: 20, paddingBottom: 50 },

  date: { fontSize: 14, color: '#999', marginBottom: 20 },

  section: { fontSize: 18, fontWeight: '700', marginTop: 25, marginBottom: 10 },

  subsection: { fontSize: 16, fontWeight: '600', marginTop: 15, marginBottom: 10 },

  paragraph: { fontSize: 15, lineHeight: 22, marginBottom: 10 },

  list: { fontSize: 15, marginLeft: 10, marginBottom: 5 },
});
