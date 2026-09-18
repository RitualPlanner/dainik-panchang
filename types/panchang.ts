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
