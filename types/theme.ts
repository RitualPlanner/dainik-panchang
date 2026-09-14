export interface ThemeOption {
  id: string;
  name: string;
  background: string;
  textColor: string;
  borderColor: string;
}

export interface OverlayOption {
  id: string;
  name: {
    gu: string;
    hi: string;
    en: string;
  };
  previewUrl: string;
  imageUrl: string;
  type: string;
}
