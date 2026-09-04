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
import { useLanguage } from "./contexts/language-context";

// Helper function to safely access localStorage
const getLocalStorage = (key: string, defaultValue: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key) || defaultValue;
  }
  return defaultValue;
};

// Helper function to safely set localStorage
const setLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export default function VikramSamvat() {
  const { t, language } = useLanguage();

  // Default values
  const defaultLine1 =
    "વિક્રમ સંવત ૨૦૮૧ , ઉત્તરાયણ , વસંત ઋતુ , શાલિવાહન શકે ૧૯૪૬";
  const defaultLine2 = "ક્રોધીનામ - અનલ નામ સંવત્સર";

  // Retrieve stored values
  const [line1, setLine1] = useState(defaultLine1);
  const [line2, setLine2] = useState(defaultLine2);

  // Temp state for editing
  const [tempLine1, setTempLine1] = useState("");
  const [tempLine2, setTempLine2] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [focusTarget, setFocusTarget] = useState<"line1" | "line2" | null>(
    null
  );

  // Refs for focusing
  const line1InputRef = useRef<HTMLInputElement>(null);
  const line2InputRef = useRef<HTMLInputElement>(null);

  // Initialize state once the component mounts
  useEffect(() => {
    setLine1(getLocalStorage("vikramSamvatLine1", defaultLine1));
    setLine2(getLocalStorage("vikramSamvatLine2", defaultLine2));
  }, []);

  // Update localStorage when values change
  useEffect(() => {
    setLocalStorage("vikramSamvatLine1", line1);
  }, [line1]);

  useEffect(() => {
    setLocalStorage("vikramSamvatLine2", line2);
  }, [line2]);

  // Focus management when dialog opens
  useEffect(() => {
    if (isOpen && focusTarget) {
      const timer = setTimeout(() => {
        const input =
          focusTarget === "line1"
            ? line1InputRef.current
            : line2InputRef.current;
        if (input) {
          input.focus();
          const len = input.value.length;
          input.setSelectionRange(len, len);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, focusTarget]);

  // Open dialog and load current lines
  const handleOpenDialog = (target: "line1" | "line2") => {
    setTempLine1(line1);
    setTempLine2(line2);
    setFocusTarget(target);
    setIsOpen(true);
  };

  // Save changes
  const handleSave = () => {
    setLine1(tempLine1);
    setLine2(tempLine2);
    setIsOpen(false);
  };

  // Translations for the Dialog
  const dialogTranslations = {
    title: {
      gu: "કેલેન્ડર માહિતી સંપાદિત કરો",
      hi: "कैलेंडर जानकारी संपादित करें",
      en: "Edit Calendar Details",
    },
    line1Label: {
      gu: "લાઇન ૧ (વિક્રમ સંવત)",
      hi: "लाइन १ (विक्रम संवत)",
      en: "Line 1 (Vikram Samvat)",
    },
    line2Label: {
      gu: "લાઇન ૨ (સંવત્સર)",
      hi: "लाइन २ (संवत्सर)",
      en: "Line 2 (Samvatsar)",
    },
    save: {
      gu: "સાચવો",
      hi: "सहेजें",
      en: "Save Changes",
    },
    cancel: {
      gu: "રદ કરો",
      hi: "रद्द करें",
      en: "Cancel",
    },
  };

  const getT = (key: keyof typeof dialogTranslations) => {
    return dialogTranslations[key][language] || dialogTranslations[key]["en"];
  };

  return (
    <div className="space-y-1.5 mt-2 bg-amber-50/60 p-3 rounded-xl border border-amber-100/50 inline-block text-center max-w-full">
      <div className="flex items-center justify-center gap-2 group text-xs md:text-sm font-medium text-amber-900/85">
        <span>{line1}</span>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button
              className="p-1 rounded-md hover:bg-amber-100 text-amber-700/60 hover:text-amber-800 transition-colors"
              onClick={() => handleOpenDialog("line1")}
              title="Edit Details"
            >
              <Edit2 className="h-3 w-3" />
            </button>
          </DialogTrigger>
          <DialogContent className="w-[calc(100%-2rem)] sm:max-w-[480px] rounded-2xl border border-amber-100 bg-white shadow-xl">
            <DialogHeader>
              <DialogTitle className="font-bold text-amber-950 text-base md:text-lg">
                {getT("title")}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="line1"
                  className="text-amber-900 font-semibold text-xs md:text-sm text-left"
                >
                  {getT("line1Label")}
                </Label>
                <Input
                  id="line1"
                  ref={line1InputRef}
                  value={tempLine1}
                  onChange={(e) => setTempLine1(e.target.value)}
                  className="rounded-xl border-amber-200 focus-visible:ring-orange-500/30 bg-amber-50/10 text-left"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="line2"
                  className="text-amber-900 font-semibold text-xs md:text-sm text-left"
                >
                  {getT("line2Label")}
                </Label>
                <Input
                  id="line2"
                  ref={line2InputRef}
                  value={tempLine2}
                  onChange={(e) => setTempLine2(e.target.value)}
                  className="rounded-xl border-amber-200 focus-visible:ring-orange-500/30 bg-amber-50/10 text-left"
                />
              </div>
            </div>
            <DialogFooter className="flex flex-row gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="border-amber-200 hover:bg-amber-50/50 rounded-xl font-semibold text-amber-900"
              >
                {getT("cancel")}
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold rounded-xl shadow-md"
              >
                {getT("save")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center justify-center gap-2 group text-xs md:text-sm font-medium text-amber-900/80">
        <span>{line2}</span>
        <button
          className="p-1 rounded-md hover:bg-amber-100 text-amber-700/60 hover:text-amber-800 transition-colors"
          onClick={() => handleOpenDialog("line2")}
          title="Edit Details"
        >
          <Edit2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
