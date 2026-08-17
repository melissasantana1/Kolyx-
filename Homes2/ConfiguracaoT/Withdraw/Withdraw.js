import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Withdraw() {
  const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState("apple");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Withdraw</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* AVAILABLE BOX */}
        <View style={styles.balanceBox}>
          <Text style={styles.balanceValue}>$0</Text>
          <Text style={styles.balanceLabel}>Available for withdrawal</Text>
        </View>

        {/* AMOUNT INPUT */}
        <Text style={styles.sectionTitle}>Amount</Text>

        <View style={styles.amountRow}>
          <View style={styles.currencyBox}>
            <Text style={styles.currencyText}>$</Text>
          </View>

          <TextInput
            placeholder="0.00"
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        {/* METHODS */}
        <View style={styles.methodsHeader}>
          <Text style={[styles.sectionTitle, { fontWeight: "700" }]}>
            Withdrawal methods
          </Text>

          <TouchableOpacity onPress={() => alert("Add new card clicked")}>
            <Text style={styles.addCard}>+ Add new card</Text>
          </TouchableOpacity>
        </View>

        {/* APPLE PAY */}
        <TouchableOpacity
          style={[
            styles.methodCard,
            selectedMethod === "apple" && styles.methodSelected,
          ]}
          onPress={() => setSelectedMethod("apple")}
        >
          <View style={styles.methodLeftApple}>
            <Image
              source={require("./img/applepay.png")}
              style={styles.applePayImage}
              resizeMode="contain"
            />
            <Text style={styles.methodText}>Apple Pay</Text>
          </View>

          <View style={styles.radioOuter}>
            {selectedMethod === "apple" && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        {/* GOOGLE PAY */}
        <TouchableOpacity
          style={[
            styles.methodCard,
            selectedMethod === "google" && styles.methodSelected,
          ]}
          onPress={() => setSelectedMethod("google")}
        >
          <View style={styles.methodLeft}>
            <Image
              source={require("./img/googlepay.png")}
              style={styles.googlePayImage}
              resizeMode="contain"
            />
            <Text style={styles.methodText}>Google Pay</Text>
          </View>

          <View style={styles.radioOuter}>
            {selectedMethod === "google" && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        {/* CONFIRM BUTTON */}
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmText}>Confirm withdrawal</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
    marginBottom: 30,
  },

  backButton: { width: 40 },

  backText: { fontSize: 28 },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    color: "black",
  },

  balanceBox: {
    borderWidth: 1,
    borderColor: "#813EFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
  },

  balanceValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#813EFF",
  },

  balanceLabel: {
    marginTop: 5,
    fontSize: 12,
    color: "#813EFF",
  },

  sectionTitle: {
    fontWeight: "400",
    fontSize: 16,
    marginBottom: 12,
  },

  amountRow: {
    flexDirection: "row",
    marginBottom: 30,
  },

  currencyBox: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 18,
    height: 60,
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
  },

  currencyText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DDD",
    borderLeftWidth: 0,
    paddingHorizontal: 15,
    fontSize: 18,
    height: 60,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  methodsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  addCard: {
    color: "#813EFF",
    fontSize: 12,
    fontWeight: "600",
  },

  methodCard: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    padding: 18,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  methodSelected: {
    backgroundColor: "#F2EDFF",
    borderColor: "#813EFF",
  },

  methodLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  methodLeftApple: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  methodText: {
    fontSize: 16,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#813EFF",
    alignItems: "center",
    justifyContent: "center",
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#813EFF",
  },

  confirmButton: {
    backgroundColor: "#813EFF",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 40,
  },

  confirmText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  applePayImage: {
    width: 55,
    height: 40,
    borderWidth: 1,
    borderColor: "#808080",
    backgroundColor: 'white',
    borderRadius: 10
  },

  googlePayImage: {
    width: 55,
    height: 40,
    borderWidth: 1,
    borderColor: "#808080",
    backgroundColor: 'white',
    borderRadius: 10
  },
}); 