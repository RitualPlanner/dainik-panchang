"use client";

import type React from "react";
import {
  Sparkles,
  RotateCcw,
  AlertTriangle,
  Compass,
  Smartphone,
  FileText,
  ExternalLink,
  Check,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useLanguage } from "@/app/contexts/language-context";
import pkg from "@/package.json";
import type { WhatsNewModalProps } from "@/types/components";

export function WhatsNewModal({ open, onOpenChange }: WhatsNewModalProps) {
  const { language } = useLanguage();

  const content = {
    title: {
      gu: `નવું શું છે v${pkg.version} માં?`,
      hi: `नया क्या है v${pkg.version} में?`,
      en: `What's New in v${pkg.version}?`,
    },
    intro: {
      gu: `દૈનિક પંચાંગ v${pkg.version} માં તમારું સ્વાગત છે! તમારા માટે લાવ્યા છીએ આ નવા સુધારાઓ:`,
      hi: `दैनिक पंचांग v${pkg.version} में आपका स्वागत है! आपके लिए लाए हैं ये नए सुधार:`,
      en: `Welcome to Dainik Panchang v${pkg.version}! Here are the latest improvements for you:`,
    },
    features: [
      {
        icon: <RotateCcw className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />,
        title: {
          gu: "મોબાઇલ એન્ડ ડેસ્કટોપ રિસેટ સુધારો (Reset Button)",
          hi: "मोबाइल और डेस्कटॉप रीसेट सुधार (Reset Button)",
          en: "Mobile & Desktop Reset Improvement",
        },
        description: {
          gu: "મોબાઈલ અને ડેસ્કટોપ સ્ક્રીન બંનેમાં રીસેટ બટન હવે 'રીસેટ' આઇકોન સાથે એકસરખું દેખાશે.",
          hi: "मोबाइल और डेस्कटॉप स्क्रीन दोनों में रीसेट बटन अब 'रीसेट' आइकन के साथ समान दिखेगा।",
          en: "Reset button with icon and label now appears consistently across mobile and desktop screens.",
        },
      },
      {
        icon: (
          <AlertTriangle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
        ),
        title: {
          gu: "પેજ રિફ્રેશ કન્ફર્મેશન એલર્ટ (Page Refresh Alert)",
          hi: "पेज रीफ्रेश कन्फर्मेशन अलर्ट (Page Refresh Alert)",
          en: "Page Refresh Confirmation Alert",
        },
        description: {
          gu: "જો ફોર્મમાં ડેટા લખેલો હશે અને પેજ રીફ્રેશ કરશો, તો તમારો ડેટા અજાણતા ભૂંસાઈ ન જાય તે માટે પૉપઅપ એલર્ટ મળશે.",
          hi: "यदि फॉर्म में डेटा लिखा होगा और पेज रीफ्रेश करेंगे, तो डेटा गलती से डिलीट न हो इसके लिए अलर्ट मिलेगा।",
          en: "Warns you before refreshing the page if form inputs contain unsaved data to prevent loss.",
        },
      },
      {
        icon: <Compass className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />,
        title: {
          gu: "ઓટોમેટિક તારીખ બદલાવ રિસેટ (Midnight Auto-Reset)",
          hi: "स्वचालित तारीख बदलाव रीसेट (Midnight Auto-Reset)",
          en: "Midnight Automatic Form Reset",
        },
        description: {
          gu: "દરરોજ રાત્રે ૧૨ વાગ્યે અથવા તારીખ બદલાતા જૂનો ડેટા આપોઆપ રીસેટ થઈને નવી તારીખ માટે ફોર્મ તૈયાર થઈ જશે.",
          hi: "हर दिन रात 12 बजे या तारीख बदलते ही पुराना डेटा स्वचालित रूप से रीसेट होकर नया फॉर्म तैयार हो जाएगा।",
          en: "Automatically resets the form at midnight or upon date change for a fresh daily panchang.",
        },
      },
      {
        icon: (
          <Smartphone className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
        ),
        title: {
          gu: "સંપૂર્ણ મોબાઇલ રિસ્પોન્સિવ (Mobile Responsiveness)",
          hi: "पूर्ण मोबाइल रिस्पॉन्सिव (Mobile Responsiveness)",
          en: "Enhanced Mobile Responsiveness",
        },
        description: {
          gu: "મોબાઈલ સ્ક્રીન પર તમામ હેડર આઇકોન, ટાઇટલ અને લેંગ્વેજ સ્વિચર પરફેક્ટ લેઆઉટ સાથે સેટ કર્યા છે.",
          hi: "मोबाइल स्क्रीन पर सभी हेडर आइकन, टाइटल और भाषा विकल्प सही लेआउट में सेट किए गए हैं।",
          en: "Header icons, titles, and language switches optimized cleanly for mobile views.",
        },
      },
      {
        icon: <FileText className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />,
        title: {
          gu: "ટેક્સ્ટ અને ઈમેજ ફોર્મેટિંગ સુધારો (Clean Formatting)",
          hi: "टेक्स्ट और इमेज फॉर्मेटिंग सुधार (Clean Formatting)",
          en: "Clean Text & Export Formatting",
        },
        description: {
          gu: "ઈમેજ, PDF અને વ્હોટ્સએપ ટેક્સ્ટમાં લાઇન સ્પેસિંગ અને બોલ્ડ ઓપ્શનમાં સુધારો કરવામાં આવ્યો છે.",
          hi: "इमेज, PDF और व्हाट्सएप टेक्स्ट में लाइन स्पेसिंग और बोल्ड विकल्प सुधारे गए हैं।",
          en: "Fixed text alignment, bold field dropdown options, and spacing in generated images & PDFs.",
        },
      },
    ],
    verifiedBadge: {
      gu: "GitHub પર આ આવૃત્તિ અધિકૃત રીતે Verified રીલીઝ ટેગ ધરાવે છે.",
      hi: "यह संस्करण आधिकारिक रूप से GitHub पर Verified रिलीज टैग के साथ उपलब्ध है।",
      en: "This version release is cryptographically signed & verified on GitHub.",
    },
    releaseLink: {
      gu: "GitHub પર પૂર્ણ રીલીઝ નોટ્સ જુઓ",
      hi: "GitHub पर पूर्ण रिलीज नोट्स देखें",
      en: "View full release notes on GitHub",
    },
    gotIt: {
      gu: "સમજાઈ ગયું, આભાર!",
      hi: "समझ गया, धन्यवाद!",
      en: "Got it, Thanks!",
    },
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[95vw] max-w-[620px] sm:max-w-[680px] md:max-w-[720px] max-h-[85vh] rounded-3xl p-5 sm:p-7 md:p-8 bg-card border-border shadow-2xl overflow-y-auto">
        <AlertDialogHeader className="space-y-3 pb-2 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20">
              <Sparkles className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div>
              <AlertDialogTitle className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                {content.title[language as keyof typeof content.title] ||
                  content.title.en}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                {content.intro[language as keyof typeof content.intro] ||
                  content.intro.en}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        {/* Verified Badge Notice */}
        <div className="my-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2.5">
          <Check className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>
            {content.verifiedBadge[
              language as keyof typeof content.verifiedBadge
            ] || content.verifiedBadge.en}
          </span>
        </div>

        {/* Feature List */}
        <div className="space-y-3.5 sm:space-y-4 py-2">
          {content.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-accent/40 hover:bg-accent/70 transition-colors border border-border/40"
            >
              {feature.icon}
              <div className="space-y-0.5">
                <h4 className="text-sm font-semibold text-foreground">
                  {feature.title[language as keyof typeof feature.title] ||
                    feature.title.en}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feature.description[
                    language as keyof typeof feature.description
                  ] || feature.description.en}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Release Link */}
        <div className="pt-2 flex justify-start">
          <a
            href={`https://github.com/RitualPlanner/Dainik-Panchang-V1/releases/tag/v${pkg.version}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-medium text-primary hover:underline flex items-center gap-1.5 transition-all"
          >
            <span>
              {content.releaseLink[
                language as keyof typeof content.releaseLink
              ] || content.releaseLink.en}
            </span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <AlertDialogFooter className="pt-4 border-t border-border/60">
          <AlertDialogAction
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto px-6 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-semibold text-sm cursor-pointer shadow-md transition-all"
          >
            {content.gotIt[language as keyof typeof content.gotIt] ||
              content.gotIt.en}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
