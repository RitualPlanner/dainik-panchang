import type { FormData } from "@/types/panchang";
import { getCurrentGujaratiDate } from "@/app/utils/date-utils";

export const DEFAULT_FORM_DATA: FormData = {
  tithi: "",
  tarikh: getCurrentGujaratiDate(),
  nakshatra: "",
  yog: "",
  karan: "",
  suryoday: "",
  suryasta: "",
  aajNiRashi: "",
  dinMahima: [""],
};

export const PANCHANG_STORAGE_KEYS = [
  "panchang_tithi",
  "panchang_tarikh",
  "panchang_nakshatra",
  "panchang_yog",
  "panchang_karan",
  "panchang_suryoday",
  "panchang_suryasta",
  "panchang_aajNiRashi",
  "panchang_dinMahima",
  "panchang_boldFields",
] as const;

export const DEFAULT_VIKRAM_SAMVAT_LINE1 =
  "વિક્રમ સંવત ૨૦૮૧ , ઉત્તરાયણ , વસંત ઋતુ , શાલિવાહન શકે ૧૯૪૬";

export const DEFAULT_VIKRAM_SAMVAT_LINE2 = "ક્રોધીનામ - અનલ નામ સંવત્સર";
