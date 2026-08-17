// i18n/index.js
import { I18n } from "i18n-js";

import ar from "./ar";
import de from "./de";
import en from "./en";
import es from "./es";
import fa from "./fa";
import fr from "./fr";
import hi from "./hi";
import it from "./it";
import pt from "./pt";
import ru from "./ru";
import tr from "./tr";
import zh from "./zh";

const i18n = new I18n({
  en,
  pt,
  es,
  fr,
  de,
  it,
  ar,
  zh,
  hi,
  fa,
  ru,
  tr,
});

i18n.enableFallback = true;


export default i18n;
