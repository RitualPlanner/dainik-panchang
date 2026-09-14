import type { FormData } from "./panchang";

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
  value: string;
  onChange: (value: string) => void;
}

export interface ShareOptionsProps {
  formData: FormData;
  boldFields: string[];
}
