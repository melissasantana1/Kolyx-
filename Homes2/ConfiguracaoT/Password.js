import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const COLORS = {
  purple: "#813EFF",
  purpleLight: "rgba(129, 62, 255, 0.08)",
  gray: "#D0D0D0",
  black: "#000"
};

export default function Security() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </Pressable>

        <Text style={styles.title}>Password & Security</Text>
      </View>

      {/* Buttons */}
      <View style={styles.list}>
        
        {/* Change Phone Number */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
          onPress={() => navigation.navigate("ChangeNumber")}
        >
          <View style={styles.left}>
            <Ionicons name="call-outline" size={22} color={COLORS.black} />
            <Text style={styles.buttonText}>Change Phone Number</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={COLORS.black} />
        </Pressable>

        {/* Verified ID */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
        >
          <View style={styles.left}>
            <Ionicons
              name="shield-checkmark-outline"
              size={22}
              color={COLORS.black}
            />
            <Text style={styles.buttonText}>Verified ID</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={COLORS.black} />
        </Pressable>

        {/* Verified Phone Number */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
        >
          <View style={styles.left}>
            <Ionicons
              name="checkmark-circle-outline"
              size={22}
              color={COLORS.black}
            />
            <Text style={styles.buttonText}>Verified Phone Number</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={COLORS.black} />
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 60
  },

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

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.black
  },

  list: {
    marginTop: 10
  },

  button: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 14,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF"
  },

  buttonPressed: {
    backgroundColor: "rgba(129, 62, 255, 0.15)"
  },

  left: {
    flexDirection: "row",
    alignItems: "center"
  },

  buttonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 12
  }
});
