export type Language = "gu" | "hi" | "en";

export interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
