"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available languages
export type Language = "gu" | "hi" | "en"

// Define translations interface
export interface Translations {
  [key: string]: {
    [key in Language]: string
  }
}

// Create translations object
export const translations: Translations = {
  // Form labels
  tithi: {
    gu: "તિથિ",
    hi: "तिथि",
    en: "Tithi",
  },
  tarikh: {
    gu: "તારીખ",
    hi: "तारीख",
    en: "Date",
  },
  nakshatra: {
    gu: "નક્ષત્ર",
    hi: "नक्षत्र",
    en: "Nakshatra",
  },
  yog: {
    gu: "યોગ",
    hi: "योग",
    en: "Yog",
  },
  karan: {
    gu: "કરણ",
    hi: "करण",
    en: "Karan",
  },
  suryoday: {
    gu: "સૂર્યોદય",
    hi: "सूर्योदय",
    en: "Sunrise",
  },
  suryasta: {
    gu: "સૂર્યાસ્ત",
    hi: "सूर्यास्त",
    en: "Sunset",
  },
  aajNiRashi: {
    gu: "આજ ની રાશી",
    hi: "आज की राशि",
    en: "Today's Zodiac",
  },
  dinMahima: {
    gu: "આજ નો દિન મહિમા",
    hi: "आज का दिन महिमा",
    en: "Today's Significance",
  },

  // Buttons and actions
  generate: {
    gu: "જનરેટ",
    hi: "जनरेट",
    en: "Generate",
  },
  generateImage: {
    gu: "ઇમેજ જનરેટ કરો",
    hi: "इमेज जनरेट करें",
    en: "Generate Image",
  },
  generatePDF: {
    gu: "PDF જનરેટ કરો",
    hi: "PDF जनरेट करें",
    en: "Generate PDF",
  },
  copy: {
    gu: "કોપી",
    hi: "कॉपी",
    en: "Copy",
  },
  copyText: {
    gu: "ટેક્સ્ટ કોપી કરો",
    hi: "टेक्स्ट कॉपी करें",
    en: "Copy Text",
  },
  share: {
    gu: "શેર",
    hi: "शेयर",
    en: "Share",
  },
  loadFromImage: {
    gu: "ઇમેજમાંથી લોડ કરો",
    hi: "इमेज से लोड करें",
    en: "Load from Image",
  },
  makeBold: {
    gu: "બોલ્ડ કરો",
    hi: "बोल्ड करें",
    en: "Make Bold",
  },
  loading: {
    gu: "લોડિંગ...",
    hi: "लोड हो रहा है...",
    en: "Loading...",
  },

  // Tabs
  panchangForm: {
    gu: "પંચાંગ ફોર્મ",
    hi: "पंचांग फॉर्म",
    en: "Panchang Form",
  },
  festivals: {
    gu: "તહેવારો",
    hi: "त्योहार",
    en: "Festivals",
  },
  settings: {
    gu: "સેટિંગ્સ",
    hi: "सेटिंग्स",
    en: "Settings",
  },

  // Settings
  selectTheme: {
    gu: "થીમ પસંદ કરો",
    hi: "थीम चुनें",
    en: "Select Theme",
  },
  editTitle: {
    gu: "શીર્ષક સંપાદિત કરો",
    hi: "शीर्षक संपादित करें",
    en: "Edit Title",
  },
  language: {
    gu: "ભાષા",
    hi: "भाषा",
    en: "Language",
  },

  // Placeholders
  enterTithi: {
    gu: "તિથિ દાખલ કરો",
    hi: "तिथि दर्ज करें",
    en: "Enter Tithi",
  },
  selectDate: {
    gu: "તારીખ પસંદ કરો",
    hi: "तारीख चुनें",
    en: "Select Date",
  },
  enterNakshatra: {
    gu: "નક્ષત્ર દાખલ કરો",
    hi: "नक्षत्र दर्ज करें",
    en: "Enter Nakshatra",
  },
  enterYog: {
    gu: "યોગ દાખલ કરો",
    hi: "योग दर्ज करें",
    en: "Enter Yog",
  },
  enterKaran: {
    gu: "કરણ દાખલ કરો",
    hi: "करण दर्ज करें",
    en: "Enter Karan",
  },
  enterSunrise: {
    gu: "સૂર્યોદય સમય",
    hi: "सूर्योदय समय",
    en: "Sunrise Time",
  },
  enterSunset: {
    gu: "સૂર્યાસ્ત સમય",
    hi: "सूर्यास्त समय",
    en: "Sunset Time",
  },
  enterRashi: {
    gu: "આજ ની રાશી",
    hi: "आज की राशि",
    en: "Today's Zodiac",
  },

  // Festival calendar
  todaysFestival: {
    gu: "આજનો તહેવાર",
    hi: "आज का त्योहार",
    en: "Today's Festival",
  },
  upcomingFestivals: {
    gu: "આગામી તહેવારો",
    hi: "आगामी त्योहार",
    en: "Upcoming Festivals",
  },
  viewAll: {
    gu: "બધા જુઓ",
    hi: "सभी देखें",
    en: "View All",
  },
  festivalCalendar: {
    gu: "તહેવાર કેલેન્ડર",
    hi: "त्योहार कैलेंडर",
    en: "Festival Calendar",
  },
  major: {
    gu: "મુખ્ય",
    hi: "प्रमुख",
    en: "Major",
  },
  minor: {
    gu: "નાનો",
    hi: "छोटा",
    en: "Minor",
  },
  days: {
    gu: "દિવસ",
    hi: "दिन",
    en: "days",
  },

  // Error messages
  error: {
    gu: "ભૂલ",
    hi: "त्रुटि",
    en: "Error",
  },
  extractionError: {
    gu: "ઇમેજમાંથી ડેટા એક્સટ્રેક્ટ કરવામાં નિષ્ફળ. કૃપા કરીને વધુ સ્પષ્ટ ઇમેજ અપલોડ કરો અથવા ડેટા મેન્યુઅલી દાખલ કરો.",
    hi: "इमेज से डेटा निकालने में विफल। कृपया एक स्पष्ट इमेज अपलोड करें या डेटा मैन्युअल रूप से दर्ज करें।",
    en: "Failed to extract data from image. Please try a clearer image or enter data manually.",
  },

  // Headers
  panchangHeader: {
    gu: "દૈનિક પંચાંગ",
    hi: "दैनिक पंचांग",
    en: "Daily Panchang",
  },
  ganeshInvocation: {
    gu: "॥ શ્રી ગણેશાય નમઃ ॥",
    hi: "॥ श्री गणेशाय नमः ॥",
    en: "॥ Shri Ganeshaya Namah ॥",
  },

  // New features
  fetchToday: {
    gu: "આજનું પંચાંગ મેળવો",
    hi: "आज का पंचांग प्राप्त करें",
    en: "Get Today's Panchang",
  },
  muhurat: {
    gu: "મુહૂર્ત",
    hi: "मुहूर्त",
    en: "Muhurat",
  },
  addOverlay: {
    gu: "ઓવરલે ઉમેરો",
    hi: "ओवरले जोड़ें",
    en: "Add Overlay",
  },
  generateQR: {
    gu: "QR કોડ જનરેટ કરો",
    hi: "QR कोड जनरेट करें",
    en: "Generate QR",
  },
  batchGenerate: {
    gu: "બેચ જનરેટ કરો",
    hi: "बैच जनरेट करें",
    en: "Batch Generate",
  },
}

// Define context type
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "gu",
  setLanguage: () => {},
  t: (key) => key,
})

// Create provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with stored language or default to Gujarati
  const [language, setLanguage] = useState<Language>("gu")

  // Load language preference from localStorage on mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem("panchang_language") as Language
    if (storedLanguage && ["gu", "hi", "en"].includes(storedLanguage)) {
      setLanguage(storedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("panchang_language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language]
    }
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook for using the language context
export function useLanguage() {
  return useContext(LanguageContext)
}
