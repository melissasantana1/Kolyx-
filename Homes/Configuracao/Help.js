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
  purplePressed: "rgba(129, 62, 255, 0.15)", // 🔥 mesmo roxo, só mais leve
  gray: "#D0D0D0",
  black: "#000"
};

export default function Help() {
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

        <Text style={styles.title}>Help center</Text>
      </View>

      {/* Buttons */}
      <View style={styles.list}>

        {/* Chat Button */}
        <Pressable
        onPress={() => navigation.navigate('Chat')}
  style={({ pressed }) => [
    styles.helpButton,
    pressed && styles.helpButtonPressed
  ]}
        >
          <View style={styles.left}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={26}
              color={COLORS.black}
            />

            <View style={styles.textContainer}>
              <Text style={styles.buttonTitle}>Chat</Text>
              <Text style={styles.buttonSubtitle}>
                Start a conversation with our support
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color={COLORS.black}
            style={styles.arrowIcon}
          />
        </Pressable>

        {/* Email Button */}
        <Pressable
          onPress={() => navigation.navigate('EmailSuport')}
  style={({ pressed }) => [
    styles.helpButton,
    pressed && styles.helpButtonPressed
  ]}
        >
          <View style={styles.left}>
            <Ionicons
              name="mail-outline"
              size={26}
              color={COLORS.black}
            />

            <View style={styles.textContainer}>
              <Text style={styles.buttonTitle}>Email</Text>
              <Text style={styles.buttonSubtitle}>
                Get solution sent directly to your email adress
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color={COLORS.black}
            style={styles.arrowIcon}
          />
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

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.black
  },

  /* List */
  list: {
    marginTop: 10
  },

  /* Help Button */
  helpButton: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 14,
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginBottom: 16,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF"
  },

  /* 🔥 Estado pressionado */
  helpButtonPressed: {
    backgroundColor: COLORS.purplePressed
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },

  textContainer: {
    marginLeft: 14,
    flex: 1
  },

  buttonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 4
  },

  buttonSubtitle: {
    fontSize: 14,
    color: COLORS.purple
  },

  /* Arrow (direita) */
  arrowIcon: {
    marginLeft: 10
  }
});
