"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { useLanguage } from "../contexts/language-context"
import { convertToGujaratiNumerals } from "../utils/date-utils"

// Define muhurat types
type MuhuratCategory = "travel" | "marriage" | "business" | "education" | "religious"

type Muhurat = {
  name: {
    gu: string
    hi: string
    en: string
  }
  time: string
  quality: "excellent" | "good" | "neutral" | "avoid"
  description: {
    gu: string
    hi: string
    en: string
  }
}

// Mock muhurat data for different categories
const muhuratData: Record<MuhuratCategory, Muhurat[]> = {
  travel: [
    {
      name: {
        gu: "અભિજિત",
        hi: "अभिजित",
        en: "Abhijit",
      },
      time: "12:00 - 12:45",
      quality: "excellent",
      description: {
        gu: "પ્રવાસ માટે શ્રેષ્ઠ સમય",
        hi: "यात्रा के लिए सर्वोत्तम समय",
        en: "Best time for travel",
      },
    },
    {
      name: {
        gu: "વિજય",
        hi: "विजय",
        en: "Vijay",
      },
      time: "14:30 - 15:15",
      quality: "good",
      description: {
        gu: "સફળ પ્રવાસ માટે શુભ",
        hi: "सफल यात्रा के लिए शुभ",
        en: "Auspicious for successful travel",
      },
    },
    {
      name: {
        gu: "અમૃત",
        hi: "अमृत",
        en: "Amrit",
      },
      time: "08:15 - 09:30",
      quality: "good",
      description: {
        gu: "લાંબા પ્રવાસ માટે શુભ",
        hi: "लंबी यात्रा के लिए शुभ",
        en: "Good for long journeys",
      },
    },
    {
      name: {
        gu: "રાહુકાળ",
        hi: "राहुकाल",
        en: "Rahu Kaal",
      },
      time: "10:30 - 12:00",
      quality: "avoid",
      description: {
        gu: "પ્રવાસ માટે અશુભ",
        hi: "यात्रा के लिए अशुभ",
        en: "Inauspicious for travel",
      },
    },
  ],
  marriage: [
    {
      name: {
        gu: "શુભ લગ્ન",
        hi: "शुभ विवाह",
        en: "Shubh Vivah",
      },
      time: "19:00 - 21:30",
      quality: "excellent",
      description: {
        gu: "લગ્ન માટે શ્રેષ્ઠ મુહૂર્ત",
        hi: "विवाह के लिए सर्वोत्तम मुहूर्त",
        en: "Best muhurat for marriage",
      },
    },
    {
      name: {
        gu: "વિવાહ મુહૂર્ત",
        hi: "विवाह मुहूर्त",
        en: "Vivah Muhurat",
      },
      time: "10:15 - 12:00",
      quality: "good",
      description: {
        gu: "લગ્ન સંસ્કાર માટે શુભ",
        hi: "विवाह संस्कार के लिए शुभ",
        en: "Auspicious for marriage ceremony",
      },
    },
    {
      name: {
        gu: "ઉદ્વાહ",
        hi: "उद्वाह",
        en: "Udvaah",
      },
      time: "16:30 - 18:00",
      quality: "neutral",
      description: {
        gu: "લગ્ન માટે સામાન્ય સમય",
        hi: "विवाह के लिए सामान्य समय",
        en: "Average time for marriage",
      },
    },
  ],
  business: [
    {
      name: {
        gu: "લાભ",
        hi: "लाभ",
        en: "Labh",
      },
      time: "10:30 - 12:00",
      quality: "excellent",
      description: {
        gu: "નવો વ્યાપાર શરૂ કરવા માટે શ્રેષ્ઠ",
        hi: "नया व्यापार शुरू करने के लिए सर्वोत्तम",
        en: "Best for starting new business",
      },
    },
    {
      name: {
        gu: "ધન પ્રાપ્તિ",
        hi: "धन प्राप्ति",
        en: "Dhan Prapti",
      },
      time: "14:15 - 15:30",
      quality: "good",
      description: {
        gu: "નાણાકીય વ્યવહારો માટે શુભ",
        hi: "वित्तीय लेनदेन के लिए शुभ",
        en: "Auspicious for financial transactions",
      },
    },
    {
      name: {
        gu: "વાણિજ્ય",
        hi: "वाणिज्य",
        en: "Vanijya",
      },
      time: "09:00 - 10:15",
      quality: "good",
      description: {
        gu: "વેપાર વાણિજ્ય માટે શુભ",
        hi: "व्यापार वाणिज्य के लिए शुभ",
        en: "Good for trade and commerce",
      },
    },
    {
      name: {
        gu: "યમઘંટ",
        hi: "यमघंट",
        en: "Yamghant",
      },
      time: "16:30 - 18:00",
      quality: "avoid",
      description: {
        gu: "મહત્વપૂર્ણ વ્યાપારિક નિર્ણયો માટે ટાળો",
        hi: "महत्वपूर्ण व्यापारिक निर्णयों के लिए टालें",
        en: "Avoid for important business decisions",
      },
    },
  ],
  education: [
    {
      name: {
        gu: "સરસ્વતી",
        hi: "सरस्वती",
        en: "Saraswati",
      },
      time: "08:00 - 09:30",
      quality: "excellent",
      description: {
        gu: "અભ્યાસ અને પરીક્ષા માટે શ્રેષ્ઠ",
        hi: "अध्ययन और परीक्षा के लिए सर्वोत्तम",
        en: "Best for study and exams",
      },
    },
    {
      name: {
        gu: "વિદ્યારંભ",
        hi: "विद्यारंभ",
        en: "Vidyarambh",
      },
      time: "10:00 - 11:30",
      quality: "good",
      description: {
        gu: "નવી શિક્ષા શરૂ કરવા માટે શુભ",
        hi: "नई शिक्षा शुरू करने के लिए शुभ",
        en: "Auspicious for starting new education",
      },
    },
    {
      name: {
        gu: "બુદ્ધિ",
        hi: "बुद्धि",
        en: "Buddhi",
      },
      time: "15:00 - 16:30",
      quality: "neutral",
      description: {
        gu: "મનન અને ચિંતન માટે સારો સમય",
        hi: "मनन और चिंतन के लिए अच्छा समय",
        en: "Good time for contemplation and thinking",
      },
    },
  ],
  religious: [
    {
      name: {
        gu: "બ્રહ્મ મુહૂર્ત",
        hi: "ब्रह्म मुहूर्त",
        en: "Brahma Muhurat",
      },
      time: "04:30 - 06:00",
      quality: "excellent",
      description: {
        gu: "ધ્યાન અને પૂજા માટે શ્રેષ્ઠ",
        hi: "ध्यान और पूजा के लिए सर्वोत्तम",
        en: "Best for meditation and worship",
      },
    },
    {
      name: {
        gu: "અભિજિત",
        hi: "अभिजित",
        en: "Abhijit",
      },
      time: "12:00 - 12:45",
      quality: "good",
      description: {
        gu: "ધાર્મિક કાર્યો માટે શુભ",
        hi: "धार्मिक कार्यों के लिए शुभ",
        en: "Auspicious for religious activities",
      },
    },
    {
      name: {
        gu: "ગૌ ધૂલિ",
        hi: "गौ धूलि",
        en: "Go Dhuli",
      },
      time: "18:00 - 18:30",
      quality: "good",
      description: {
        gu: "સંધ્યા પૂજા માટે શુભ",
        hi: "संध्या पूजा के लिए शुभ",
        en: "Good for evening prayers",
      },
    },
    {
      name: {
        gu: "રાહુકાળ",
        hi: "राहुकाल",
        en: "Rahu Kaal",
      },
      time: "10:30 - 12:00",
      quality: "avoid",
      description: {
        gu: "ધાર્મિક કાર્યો માટે અશુભ",
        hi: "धार्मिक कार्यों के लिए अशुभ",
        en: "Inauspicious for religious activities",
      },
    },
  ],
}

export function MuhuratTimings() {
  const { language, t } = useLanguage()
  const [category, setCategory] = useState<MuhuratCategory>("travel")
  const currentYear = new Date().getFullYear()

  // Get quality badge variant
  const getQualityVariant = (quality: string) => {
    switch (quality) {
      case "excellent":
        return "success"
      case "good":
        return "default"
      case "neutral":
        return "secondary"
      case "avoid":
        return "destructive"
      default:
        return "outline"
    }
  }

  // Get quality text
  const getQualityText = (quality: string) => {
    switch (quality) {
      case "excellent":
        return language === "gu" ? "શ્રેષ્ઠ" : language === "hi" ? "उत्तम" : "Excellent"
      case "good":
        return language === "gu" ? "સારું" : language === "hi" ? "अच्छा" : "Good"
      case "neutral":
        return language === "gu" ? "સામાન્ય" : language === "hi" ? "सामान्य" : "Neutral"
      case "avoid":
        return language === "gu" ? "ટાળો" : language === "hi" ? "टालें" : "Avoid"
      default:
        return quality
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          {t("muhurat")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={category} onValueChange={(value) => setCategory(value as MuhuratCategory)}>
          <div className="text-xs text-muted-foreground mb-3 text-center">
            {language === "gu"
              ? `મુહૂર્ત પ્રાધાન્ય ૨૦૨૫ માટે`
              : language === "hi"
              ? `मुहूर्त प्राथमिकता २०२५ के लिए`
              : `Muhurat Priority for ${currentYear}`}
          </div>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="travel">
              {language === "gu" ? "પ્રવાસ" : language === "hi" ? "यात्रा" : "Travel"}
            </TabsTrigger>
            <TabsTrigger value="marriage">
              {language === "gu" ? "લગ્ન" : language === "hi" ? "विवाह" : "Marriage"}
            </TabsTrigger>
            <TabsTrigger value="business">
              {language === "gu" ? "વ્યાપાર" : language === "hi" ? "व्यापार" : "Business"}
            </TabsTrigger>
            <TabsTrigger value="education">
              {language === "gu" ? "શિક્ષણ" : language === "hi" ? "शिक्षा" : "Education"}
            </TabsTrigger>
            <TabsTrigger value="religious">
              {language === "gu" ? "ધાર્મિક" : language === "hi" ? "धार्मिक" : "Religious"}
            </TabsTrigger>
          </TabsList>

          {Object.entries(muhuratData).map(([key, muhuratsForCategory]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              {muhuratsForCategory.map((muhurat, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                  <div>
                    <h4 className="font-medium">{muhurat.name[language as keyof typeof muhurat.name]}</h4>
                    <p className="text-sm text-muted-foreground">
                      {language === "gu" ? convertToGujaratiNumerals(muhurat.time) : muhurat.time}
                    </p>
                    <p className="text-sm mt-1">{muhurat.description[language as keyof typeof muhurat.description]}</p>
                  </div>
                  <Badge variant={getQualityVariant(muhurat.quality) as any}>{getQualityText(muhurat.quality)}</Badge>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
