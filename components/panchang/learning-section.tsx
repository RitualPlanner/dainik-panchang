"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, HelpCircle, Info } from "lucide-react";
import { useLanguage } from "@/app/contexts/language-context";
import { useScreenSize } from "@/app/utils/responsive-utils";

interface LearningContentItem {
  id: string;
  title: {
    gu: string;
    hi: string;
    en: string;
  };
  content: {
    gu: string;
    hi: string;
    en: string;
  };
  category: "basics" | "elements" | "significance";
}

const learningContent: LearningContentItem[] = [
  {
    id: "what-is-panchang",
    title: {
      gu: "પંચાંગ શું છે?",
      hi: "पंचांग क्या है?",
      en: "What is Panchang?",
    },
    content: {
      gu: "પંચાંગ એ હિન્દુ કેલેન્ડર છે જે પાંચ અંગો પર આધારિત છે.",
      hi: "पंचांग हिंदू कैलेंडर है जो पांच अंगों पर आधारित है।",
      en: "Panchang is a Hindu calendar based on five elements.",
    },
    category: "basics",
  },
];

export function LearningSection() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<
    "basics" | "elements" | "significance"
  >("basics");
  const screenSize = useScreenSize();

  const filteredContent = learningContent.filter(
    (item) => item.category === activeCategory
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2" />
          {language === "gu"
            ? "પંચાંગ શીખો"
            : language === "hi"
              ? "पंचांग सीखें"
              : "Learn Panchang"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeCategory}
          onValueChange={(value) => setActiveCategory(value as any)}
        >
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="basics">
              <Info className="h-4 w-4 mr-1 md:mr-2" />
              <span className={screenSize.isMobile ? "text-xs" : ""}>
                {language === "gu"
                  ? "મૂળભૂત"
                  : language === "hi"
                    ? "मूलभूत"
                    : "Basics"}
              </span>
            </TabsTrigger>
            <TabsTrigger value="elements">
              <HelpCircle className="h-4 w-4 mr-1 md:mr-2" />
              <span className={screenSize.isMobile ? "text-xs" : ""}>
                {language === "gu"
                  ? "તત્વો"
                  : language === "hi"
                    ? "તત્વ"
                    : "Elements"}
              </span>
            </TabsTrigger>
            <TabsTrigger value="significance">
              <BookOpen className="h-4 w-4 mr-1 md:mr-2" />
              <span className={screenSize.isMobile ? "text-xs" : ""}>
                {language === "gu"
                  ? "મહત્વ"
                  : language === "hi"
                    ? "महत्व"
                    : "Significance"}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeCategory}>
            <Accordion type="single" collapsible className="space-y-2">
              {filteredContent.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-left">
                    {item.title[language as keyof typeof item.title]}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm">
                      {item.content[language as keyof typeof item.content]}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
