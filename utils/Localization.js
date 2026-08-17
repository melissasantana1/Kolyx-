import * as Localization from "expo-localization";

export const deviceLocale =
  Localization.getLocales()?.[0] || null;

export const countryCode =
  deviceLocale?.regionCode || "US";

export const currencyByCountry = {
  US: "USD",
  BR: "BRL",
  PT: "EUR",
  ES: "EUR",
};

export const deviceCurrency =
  currencyByCountry[countryCode] || "USD";
