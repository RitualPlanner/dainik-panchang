export interface FormData {
  tithi: string;
  tarikh: string;
  nakshatra: string;
  yog: string;
  karan: string;
  suryoday: string;
  suryasta: string;
  aajNiRashi: string;
  dinMahima: string[];
}

export type BoldField = keyof FormData;

export interface PanchangTemplate {
  id: string;
  name: {
    gu: string;
    hi: string;
    en: string;
  };
  description: {
    gu: string;
    hi: string;
    en: string;
  };
  formData: FormData;
  themeId: string;
  overlayId: string;
  category: "daily" | "festival" | "special" | "custom";
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasFestival: boolean;
  festivalName?: string;
  festivalType?: "major" | "minor";
  tithi?: string;
  isImportant?: boolean;
}

export interface Schedule {
  id: string;
  time: string;
  frequency: "daily" | "weekly" | "monthly";
  recipients: string[];
  format: "image" | "pdf" | "text";
  themeId: string;
  templateId: string;
  isActive: boolean;
  lastRun?: string;
  nextRun?: string;
}

export interface LearningContent {
  id: string;
  title: {
    gu: string;
    hi: string;
    en: string;
  };
  summary: {
    gu: string;
    hi: string;
    en: string;
  };
  fullContent: {
    gu: string;
    hi: string;
    en: string;
  };
  category: "tithi" | "nakshatra" | "rashi" | "general";
  iconName: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  city: string;
  sunrise: string;
  sunset: string;
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  language: "gu" | "hi" | "en";
  theme: "light" | "dark" | "system";
  notifications: boolean;
  savedTemplates: string[];
}
