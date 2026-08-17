// i18n/context/LanguageContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import { createContext, useContext, useEffect, useState } from "react";
import i18n from "../index";

const LanguageContext = createContext({
  locale: "en",
  changeLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    (async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("APP_LANGUAGE");

        // 🔥 NÃO muda idioma automaticamente
        // 🔥 só usa o idioma salvo pelo usuário
        // 🔥 se não existir, mantém inglês
        const locales = Localization.getLocales(); // mantido (não removido)
        const lang = savedLanguage || "en";

        i18n.locale = lang;
        setLocale(lang);
      } catch (e) {
        console.warn("Erro ao carregar idioma:", e);
      }
    })();
  }, []);

  const changeLanguage = async (lang) => {
    try {
      i18n.locale = lang;
      setLocale(lang);
      await AsyncStorage.setItem("APP_LANGUAGE", lang);
    } catch (e) {
      console.warn("Erro ao salvar idioma:", e);
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
