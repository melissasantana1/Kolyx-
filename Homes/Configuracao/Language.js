import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import i18n from "../../i18n";

// 🔥 IMPORTA O HOOK GLOBAL
import { useLanguage } from "../../i18n/context/LanguageContext";

export default function Language() {
  const navigation = useNavigation();

  // 🔥 idioma vem do HOOK (GLOBAL)
  const { locale, changeLanguage } = useLanguage();

  // 🔥 lista baseada em CHAVES
  const languages = [
    { key: "arabic", code: "ar" },
    { key: "chinese", code: "zh" },
    { key: "english", code: "en" },
    { key: "french", code: "fr" },
    { key: "german", code: "de" },
    { key: "hindi", code: "hi" },
    { key: "italian", code: "it" },
    { key: "persian", code: "fa" },
    { key: "portuguese", code: "pt" },
    { key: "russian", code: "ru" },
    { key: "spanish", code: "es" },
    { key: "turkish", code: "tr" }
  ];

  return (
    <View key={locale} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>
          {i18n.t("language.title", { locale })}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {languages.map((lang, index) => {
          const selected = locale === lang.code;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.languageButton,
                selected && styles.languageButtonSelected
              ]}
              activeOpacity={0.6}
              onPress={() => changeLanguage(lang.code)}
            >
              <Text style={styles.languageText}>
                {i18n.t(`language.${lang.key}`)}
              </Text>

              <View style={styles.radioOuter}>
                {selected && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 15,
    position: "relative"
  },

  backButton: {
    position: "absolute",
    left: 20,
    padding: 5
  },

  title: {
    fontSize: 23,
    fontWeight: "700",
    color: "#000"
  },

  listContainer: {
    paddingBottom: 30
  },

  /* 🔹 BOTÃO NORMAL */
  languageButton: {
    borderWidth: 1,
    borderColor: "#813EFF",
    borderRadius: 10,
    paddingVertical: 17,
    paddingHorizontal: 20,
    marginBottom: 15,
    marginHorizontal: 20, // margem maior esquerda/direita
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  /* 🔹 BOTÃO SELECIONADO */
  languageButtonSelected: {
    backgroundColor: "rgba(255, 62, 245, 0.08)"
  },

  languageText: {
    fontSize: 17,
    color: "#000"
  },

  /* 🔘 RADIO */
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#813EFF",
    alignItems: "center",
    justifyContent: "center"
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#813EFF"
  }
});
