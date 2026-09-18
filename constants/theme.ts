import type { ThemeOption, OverlayOption } from "@/types/theme";

export const DEFAULT_THEME: ThemeOption = {
  id: "default",
  name: "મૂળભૂત",
  background: "#1a2e3b",
  textColor: "white",
  borderColor: "#ffffff",
};

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
