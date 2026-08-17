import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const COLORS = {
  purple: "#813EFF",
  black: "#000",
  purpleLight: "rgba(129, 62, 255, 0.08)"
};

const currencies = [
  "USD",
  "EUR",
  "GBP",
  "AUD",
  "CAD",
  "ILS",
  "HKD",
  "SEK",
  "NZD",
  "CNY"
];

export default function Currency() {
  const navigation = useNavigation();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Currency</Text>
      </View>

      {/* Currency Buttons */}
      <FlatList
        data={currencies}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const selected = item === selectedCurrency;

          return (
            <TouchableOpacity
              style={[
                styles.currencyBox,
                selected && styles.currencyBoxSelected
              ]}
              onPress={() => setSelectedCurrency(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.currencyText}>{item}</Text>

              <View style={styles.radioOuter}>
                {selected && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  /* Container */
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 60
  },

  /* Header */
  header: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30
  },

  backButton: {
    position: "absolute",
    left: 20
  },

  /* Title */
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.black,
    textAlign: "center"
  },

  /* List */
  list: {
    paddingBottom: 20
  },

  /* Currency Box */
  currencyBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.purple,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 14,
    marginHorizontal: 20
  },

  /* Selected Currency Background */
  currencyBoxSelected: {
    backgroundColor: COLORS.purpleLight
  },

  currencyText: {
    fontSize: 16,
    color: COLORS.black
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.purple,
    alignItems: "center",
    justifyContent: "center"
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.purple
  }
});
