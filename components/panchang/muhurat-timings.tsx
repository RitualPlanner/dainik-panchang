"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { useLanguage } from "@/app/contexts/language-context";
import { convertToGujaratiNumerals } from "@/app/utils/date-utils";

type MuhuratCategory =
  "travel" | "marriage" | "business" | "education" | "religious";

type Muhurat = {
  name: {
    gu: string;
    hi: string;
    en: string;
  };
  time: string;
  quality: "excellent" | "good" | "neutral" | "avoid";
  description: {
    gu: string;
    hi: string;
    en: string;
  };
};

const muhuratData: Record<MuhuratCategory, Muhurat[]> = {
  travel: [
    {
      name: { gu: "અભિજિત", hi: "अभिजित", en: "Abhijit" },
      time: "12:00 - 12:45",
      quality: "excellent",
      description: {
        gu: "પ્રવાસ માટે શ્રેષ્ઠ સમય",
        hi: "यात्रा के लिए सर्वोत्तम समय",
        en: "Best time for travel",
      },
    },
  ],
  marriage: [],
  business: [],
  education: [],
  religious: [],
};

export function MuhuratTimings() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] =
    useState<MuhuratCategory>("travel");

  const getQualityVariant = (quality: string) => {
    switch (quality) {
      case "excellent":
        return "default";
      case "good":
        return "secondary";
      case "avoid":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getQualityText = (quality: string) => {
    switch (quality) {
      case "excellent":
        return language === "gu"
          ? "અતિ ઉત્તમ"
          : language === "hi"
            ? "अति उत्तम"
            : "Excellent";
      case "good":
        return language === "gu" ? "શુભ" : language === "hi" ? "शुभ" : "Good";
      case "avoid":
        return language === "gu"
          ? "વર્જ્ય"
          : language === "hi"
            ? "वर्ज्य"
            : "Avoid";
      default:
        return language === "gu"
          ? "સામાન્ય"
          : language === "hi"
            ? "सामान्य"
            : "Neutral";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          {language === "gu"
            ? "શુભ મુહૂર્ત સમય"
            : language === "hi"
              ? "शुभ मुहूर्त समय"
              : "Auspicious Timings"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeCategory}
          onValueChange={(value) => setActiveCategory(value as MuhuratCategory)}
        >
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger value="travel">
              {language === "gu"
                ? "પ્રવાસ"
                : language === "hi"
                  ? "यात्रा"
                  : "Travel"}
            </TabsTrigger>
            <TabsTrigger value="marriage">
              {language === "gu"
                ? "લગ્ન"
                : language === "hi"
                  ? "विवाह"
                  : "Marriage"}
            </TabsTrigger>
            <TabsTrigger value="business">
              {language === "gu"
                ? "વ્યાપાર"
                : language === "hi"
                  ? "व्यापार"
                  : "Business"}
            </TabsTrigger>
            <TabsTrigger value="education">
              {language === "gu"
                ? "શિક્ષણ"
                : language === "hi"
                  ? "शिक्षा"
                  : "Education"}
            </TabsTrigger>
            <TabsTrigger value="religious">
              {language === "gu"
                ? "ધાર્મિક"
                : language === "hi"
                  ? "धार्मिक"
                  : "Religious"}
            </TabsTrigger>
          </TabsList>

          {Object.entries(muhuratData).map(([key, muhuratsForCategory]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              {muhuratsForCategory.map((muhurat, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2 last:border-0"
                >
                  <div>
                    <h4 className="font-medium">
                      {muhurat.name[language as keyof typeof muhurat.name]}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {language === "gu"
                        ? convertToGujaratiNumerals(muhurat.time)
                        : muhurat.time}
                    </p>
                    <p className="text-sm mt-1">
                      {
                        muhurat.description[
                          language as keyof typeof muhurat.description
                        ]
                      }
                    </p>
                  </div>
                  <Badge variant={getQualityVariant(muhurat.quality) as any}>
                    {getQualityText(muhurat.quality)}
                  </Badge>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
