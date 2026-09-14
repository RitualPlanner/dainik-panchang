import type { FormData, PanchangTemplate } from "./panchang";
import type { ThemeOption, OverlayOption } from "./theme";

export interface WhatsNewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface RefreshConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export interface DynamicFieldsProps {
  fields: string[];
  onChange: (fields: string[]) => void;
}

export interface CalendarPickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export interface ShareOptionsProps {
  formData: FormData;
  boldFields: string[];
}

export interface ThemeSelectorProps {
  currentTheme: ThemeOption;
  onSelectTheme: (theme: ThemeOption) => void;
}

export interface ImageOverlaySelectorProps {
  selectedOverlay: OverlayOption;
  onSelectOverlay: (overlay: OverlayOption) => void;
}

export interface TemplateGalleryProps {
  onSelectTemplate: (template: PanchangTemplate) => void;
  currentFormData: FormData;
}

export interface QRCodeGeneratorProps {
  formData: FormData;
  boldFields: string[];
}

export interface VoiceInputProps {
  onTranscript: (field: string, text: string) => void;
  currentField?: string;
}

export interface BatchGeneratorProps {
  currentFormData: FormData;
  boldFields: string[];
  currentTheme: ThemeOption;
  selectedOverlay: OverlayOption;
}
