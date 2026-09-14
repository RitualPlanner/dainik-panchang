import type { ThemeOption, OverlayOption } from "@/types/theme";

export const DEFAULT_THEME: ThemeOption = {
  id: "default",
  name: "મૂળભૂત",
  background: "#1a2e3b",
  textColor: "white",
  borderColor: "#ffffff",
};

export const PRESET_THEMES: ThemeOption[] = [
  DEFAULT_THEME,
  {
    id: "festival",
    name: "ઉત્સવ",
    background: "#8b0000",
    textColor: "gold",
    borderColor: "#ffd700",
  },
  {
    id: "spiritual",
    name: "આધ્યાત્મિક",
    background: "#2c3e50",
    textColor: "#e0e0e0",
    borderColor: "#9b59b6",
  },
  {
    id: "nature",
    name: "પ્રકૃતિ",
    background: "#1b5e20",
    textColor: "#f1f8e9",
    borderColor: "#aed581",
  },
  {
    id: "elegant",
    name: "સુંદર",
    background: "#212121",
    textColor: "#f5f5f5",
    borderColor: "#9e9e9e",
  },
];

export const DEFAULT_OVERLAY: OverlayOption = {
  id: "none",
  name: {
    gu: "કોઈ નહીં",
    hi: "कोई नहीं",
    en: "None",
  },
  previewUrl: "/placeholder.svg?height=60&width=60",
  imageUrl: "",
  type: "none",
};

export const PRESET_OVERLAYS: OverlayOption[] = [
  DEFAULT_OVERLAY,
  {
    id: "ganesh",
    name: {
      gu: "ગણેશ",
      hi: "गणेश",
      en: "Ganesh",
    },
    previewUrl: "/placeholder.svg?height=60&width=60&text=Ganesh",
    imageUrl: "/placeholder.svg?height=200&width=200&text=Ganesh",
    type: "deity",
  },
  {
    id: "lakshmi",
    name: {
      gu: "લક્ષ્મી",
      hi: "लक्ष्मी",
      en: "Lakshmi",
    },
    previewUrl: "/placeholder.svg?height=60&width=60&text=Lakshmi",
    imageUrl: "/placeholder.svg?height=200&width=200&text=Lakshmi",
    type: "deity",
  },
  {
    id: "shiva",
    name: {
      gu: "શિવ",
      hi: "शिव",
      en: "Shiva",
    },
    previewUrl: "/placeholder.svg?height=60&width=60&text=Shiva",
    imageUrl: "/placeholder.svg?height=200&width=200&text=Shiva",
    type: "deity",
  },
  {
    id: "traditional_border",
    name: {
      gu: "પરંપરાગત બોર્ડર",
      hi: "पारंपरिक बॉर्डर",
      en: "Traditional Border",
    },
    previewUrl: "/placeholder.svg?height=60&width=60&text=Border",
    imageUrl: "/placeholder.svg?height=800&width=600&text=Border",
    type: "border",
  },
  {
    id: "floral_border",
    name: {
      gu: "ફૂલોની બોર્ડર",
      hi: "फूलों की बॉर्डर",
      en: "Floral Border",
    },
    previewUrl: "/placeholder.svg?height=60&width=60&text=Floral",
    imageUrl: "/placeholder.svg?height=800&width=600&text=Floral",
    type: "border",
  },
  {
    id: "temple_background",
    name: {
      gu: "મંદિર બેકગ્રાઉન્ડ",
      hi: "मंदिर बैकग्राउंड",
      en: "Temple Background",
    },
    previewUrl: "/placeholder.svg?height=60&width=60&text=Temple",
    imageUrl: "/placeholder.svg?height=800&width=600&text=Temple",
    type: "background",
  },
  {
    id: "parchment_background",
    name: {
      gu: "કાગળ બેકગ્રાઉન્ડ",
      hi: "कागज बैकग्राउंड",
      en: "Parchment Background",
    },
    previewUrl: "/placeholder.svg?height=60&width=60&text=Parchment",
    imageUrl: "/placeholder.svg?height=800&width=600&text=Parchment",
    type: "background",
  },
];
