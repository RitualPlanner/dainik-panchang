"use client";

import { useState, useEffect, useRef } from "react";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/app/contexts/language-context";
import {
  DEFAULT_VIKRAM_SAMVAT_LINE1,
  DEFAULT_VIKRAM_SAMVAT_LINE2,
} from "@/constants/panchang";

const getLocalStorage = (key: string, defaultValue: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key) || defaultValue;
  }
  return defaultValue;
};

const setLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export default function VikramSamvat() {
  const { language } = useLanguage();

  const [line1, setLine1] = useState(DEFAULT_VIKRAM_SAMVAT_LINE1);
  const [line2, setLine2] = useState(DEFAULT_VIKRAM_SAMVAT_LINE2);

  const [tempLine1, setTempLine1] = useState("");
  const [tempLine2, setTempLine2] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [focusTarget, setFocusTarget] = useState<"line1" | "line2" | null>(
    null
  );

  const line1InputRef = useRef<HTMLInputElement>(null);
  const line2InputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLine1(getLocalStorage("vikramSamvatLine1", DEFAULT_VIKRAM_SAMVAT_LINE1));
    setLine2(getLocalStorage("vikramSamvatLine2", DEFAULT_VIKRAM_SAMVAT_LINE2));
  }, []);

  const handleOpenDialog = (target: "line1" | "line2" = "line1") => {
    setTempLine1(line1);
    setTempLine2(line2);
    setFocusTarget(target);
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen && focusTarget) {
      setTimeout(() => {
        if (focusTarget === "line1" && line1InputRef.current) {
          line1InputRef.current.focus();
        } else if (focusTarget === "line2" && line2InputRef.current) {
          line2InputRef.current.focus();
        }
      }, 50);
    }
  }, [isOpen, focusTarget]);

  const handleSave = () => {
    setLine1(tempLine1);
    setLine2(tempLine2);
    setLocalStorage("vikramSamvatLine1", tempLine1);
    setLocalStorage("vikramSamvatLine2", tempLine2);
    setIsOpen(false);
  };

  const handleReset = () => {
    setTempLine1(DEFAULT_VIKRAM_SAMVAT_LINE1);
    setTempLine2(DEFAULT_VIKRAM_SAMVAT_LINE2);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-1 my-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            onClick={() => handleOpenDialog("line1")}
            className="group hover:bg-accent/50 p-2 text-center transition-all cursor-pointer rounded-xl flex items-center justify-center gap-2 max-w-full"
            title="ક્લિક કરીને વિક્રમ સંવત અને સંવત્સર સુધારો"
          >
            <p className="text-sm font-semibold tracking-wide text-foreground group-hover:text-primary transition-colors text-center truncate max-w-[85vw] sm:max-w-none">
              {line1}
            </p>
            <Edit2 className="h-4 w-4 opacity-70 group-hover:opacity-100 group-hover:text-primary transition-opacity flex-shrink-0" />
          </Button>
        </DialogTrigger>

        <DialogTrigger asChild>
          <Button
            variant="ghost"
            onClick={() => handleOpenDialog("line2")}
            className="group hover:bg-accent/50 p-1.5 text-center transition-all cursor-pointer rounded-xl flex items-center justify-center gap-2 max-w-full"
            title="ક્લિક કરીને વિક્રમ સંવત અને સંવત્સર સુધારો"
          >
            <p className="text-sm font-semibold tracking-wide text-foreground group-hover:text-primary transition-colors text-center truncate max-w-[85vw] sm:max-w-none">
              {line2}
            </p>
            <Edit2 className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 group-hover:text-primary transition-opacity flex-shrink-0" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[550px] rounded-2xl p-6 bg-card border-border shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              {language === "gu"
                ? "વિક્રમ સંવત વિગતો બદલો"
                : language === "hi"
                  ? "विक्रम संवत विवरण बदलें"
                  : "Edit Vikram Samvat Details"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                {language === "gu"
                  ? "વિક્રમ સંવત / ઋતુ / શાલિવાહન લાઇન 1:"
                  : language === "hi"
                    ? "विक्रम संवत / ऋतु / शालिवाहन लाइन 1:"
                    : "Vikram Samvat / Season / Shalivahan Line 1:"}
              </Label>
              <Input
                ref={line1InputRef}
                value={tempLine1}
                onChange={(e) => setTempLine1(e.target.value)}
                placeholder="વિક્રમ સંવત ૨૦૮૧..."
                className="w-full text-sm rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                {language === "gu"
                  ? "સંવત્સર નામ લાઇન 2:"
                  : language === "hi"
                    ? "संवत्सर नाम लाइन 2:"
                    : "Samvatsar Name Line 2:"}
              </Label>
              <Input
                ref={line2InputRef}
                value={tempLine2}
                onChange={(e) => setTempLine2(e.target.value)}
                placeholder="ક્રોધીનામ - અનલ નામ..."
                className="w-full text-sm rounded-lg"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-row items-center justify-between sm:justify-between gap-2 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
            >
              {language === "gu"
                ? "મૂળભૂત રીસેટ કરો"
                : language === "hi"
                  ? "डिफ़ॉल्ट रीसेट करें"
                  : "Reset to Default"}
            </Button>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              >
                {language === "gu"
                  ? "રદ કરો"
                  : language === "hi"
                    ? "रद्द करें"
                    : "Cancel"}
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer font-medium"
              >
                {language === "gu"
                  ? "સાચવો"
                  : language === "hi"
                    ? "सुरक्षित करें"
                    : "Save Changes"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
