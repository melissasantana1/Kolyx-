import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Scheduled() {
  const [pressed, setPressed] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Scheduled trips</Text>
      </View>

      {/* Trip Card 1 */}
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <View>
            <Text style={styles.tripDate}>March 20, 2026</Text>
            <Text style={styles.arrivalDate}>
              Arrival: March 19, 2026
            </Text>
          </View>

          <Text style={styles.transport}>Plane</Text>
        </View>
      </View>

      {/* Trip Card 2 */}
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <View>
            <Text style={styles.tripDate}>April 10, 2026</Text>
            <Text style={styles.arrivalDate}>
              Arrival: April 09, 2026
            </Text>
          </View>

          <Text style={styles.transport}>Bus</Text>
        </View>
      </View>

      {/* Add Trip Button */}
      <TouchableOpacity
        style={[
          styles.addButton,
          pressed && { backgroundColor: "#813EFF" },
        ]}
        activeOpacity={0.8}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
      >
        <Text
          style={[
            styles.addButtonText,
            pressed && { color: "#fff" },
          ]}
        >
          + Add a trip
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  backButton: {
    position: "absolute",
    left: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  card: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 24,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  tripDate: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  arrivalDate: {
    fontSize: 11,
    color: "#777",
    marginTop: 4,
  },
  transport: {
    fontSize: 12,
    color: "#777",
  },
  addButton: {
    borderWidth: 2,
    borderColor: "#813EFF",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 24,
    backgroundColor: "#fff",
  },
  addButtonText: {
    color: "#813EFF",
    fontSize: 16,
    fontWeight: "600",
  },
});