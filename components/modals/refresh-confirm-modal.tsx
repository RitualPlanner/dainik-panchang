"use client";

import type React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useLanguage } from "@/app/contexts/language-context";
import type { RefreshConfirmModalProps } from "@/types/components";

export function RefreshConfirmModal({
  open,
  onOpenChange,
  onConfirm,
}: RefreshConfirmModalProps) {
  const { language } = useLanguage();

  const content = {
    title: {
      gu: "શું તમે ચોક્કસ ડેટા રીસેટ કરવા માંગો છો?",
      hi: "क्या आप निश्चित रूप से डेटा रीसेट करना चाहते हैं?",
      en: "Are you sure you want to reset all data?",
    },
    description: {
      gu: "તમે ફોર્મમાં ભરેલી તમામ માહિતી અને વિગતો ડિલીટ થઈ જશે અને નવું ફોર્મ સેટ થઈ જશે.",
      hi: "फॉर्म में भरी गई सभी जानकारी और विवरण हट जाएंगे और नया फॉर्म सेट हो जाएगा।",
      en: "This action will clear all inputs and reset the Panchang form data.",
    },
    cancel: {
      gu: "રદ કરો",
      hi: "रद्द करें",
      en: "Cancel",
    },
    confirm: {
      gu: "હા, ડેટા રીસેટ કરો",
      hi: "हां, डेटा रीसेट करें",
      en: "Yes, Reset Data",
    },
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[480px] rounded-2xl p-6 bg-card border-border shadow-2xl">
        <AlertDialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-destructive/10 text-destructive ring-1 ring-destructive/20">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg font-bold text-foreground">
                {content.title[language as keyof typeof content.title] ||
                  content.title.en}
              </AlertDialogTitle>
            </div>
          </div>
          <AlertDialogDescription className="text-sm text-muted-foreground pt-1 leading-relaxed">
            {content.description[
              language as keyof typeof content.description
            ] || content.description.en}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-4 flex flex-row items-center justify-end gap-2">
          <AlertDialogCancel className="cursor-pointer rounded-xl">
            {content.cancel[language as keyof typeof content.cancel] ||
              content.cancel.en}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl cursor-pointer font-medium gap-1.5"
          >
            <RotateCcw className="h-4 w-4" />
            {content.confirm[language as keyof typeof content.confirm] ||
              content.confirm.en}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
