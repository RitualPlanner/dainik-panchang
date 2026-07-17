"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, HelpCircle, Info } from "lucide-react"
import { useLanguage } from "../contexts/language-context"
import { useScreenSize } from "../utils/responsive-utils"

// Define learning content types
interface LearningContent {
  id: string
  title: {
    gu: string
    hi: string
    en: string
  }
  content: {
    gu: string
    hi: string
    en: string
  }
  category: "basics" | "elements" | "significance"
}

// Sample learning content
const learningContent: LearningContent[] = [
  {
    id: "what-is-panchang",
    title: {
      gu: "પંચાંગ શું છે?",
      hi: "पंचांग क्या है?",
      en: "What is Panchang?",
    },
    content: {
      gu: "પંચાંગ એ હિન્દુ કેલેન્ડર છે જે પાંચ અંગો (તિથિ, વાર, નક્ષત્ર, યોગ અને કરણ) પર આધારિત છે. તે દિવસની શુભ અને અશુભ અવધિઓ, તહેવારો અને મુહૂર્તો નક્કી કરવા માટે વપરાય છે.",
      hi: "पंचांग हिंदू कैलेंडर है जो पांच अंगों (तिथि, वार, नक्षत्र, योग और करण) पर आधारित है। इसका उपयोग दिन के शुभ और अशुभ अवधियों, त्योहारों और मुहूर्तों को निर्धारित करने के लिए किया जाता है।",
      en: "Panchang is a Hindu calendar based on five elements (Tithi, Var, Nakshatra, Yog, and Karan). It is used to determine auspicious and inauspicious periods of the day, festivals, and muhurtas.",
    },
    category: "basics",
  },
  {
    id: "tithi",
    title: {
      gu: "તિથિ",
      hi: "तिथि",
      en: "Tithi",
    },
    content: {
      gu: "તિથિ એ ચંદ્ર દિવસ છે, જે ચંદ્ર અને સૂર્ય વચ્ચેના કોણીય અંતર પર આધારિત છે. એક ચંદ્ર માસમાં 30 તિથિઓ હોય છે, જેમાં 15 શુક્લ પક્ષમાં (પૂર્ણિમા સુધી) અને 15 કૃષ્ણ પક્ષમાં (અમાવસ્યા સુધી) હોય છે.",
      hi: "तिथि चंद्र दिवस है, जो चंद्रमा और सूर्य के बीच कोणीय अंतर पर आधारित है। एक चंद्र महीने में 30 तिथियां होती हैं, जिनमें 15 शुक्ल पक्ष में (पूर्णिमा तक) और 15 कृष्ण पक्ष में (अमावस्या तक) होती हैं।",
      en: "Tithi is a lunar day, based on the angular distance between the moon and the sun. There are 30 tithis in a lunar month, with 15 in the waxing phase (until full moon) and 15 in the waning phase (until new moon).",
    },
    category: "elements",
  },
  {
    id: "nakshatra",
    title: {
      gu: "નક્ષત્ર",
      hi: "नक्षत्र",
      en: "Nakshatra",
    },
    content: {
      gu: "નક્ષત્ર એ 27 તારા સમૂહો છે જેમાંથી ચંદ્ર પસાર થાય છે. દરેક નક્ષત્રનો પોતાનો અધિપતિ, ગુણ અને ફળ હોય છે. નક્ષત્રો વિવિધ પ્રવૃત્તિઓ માટે શુભ સમય નક્કી કરવામાં મદદ કરે છે.",
      hi: "नक्षत्र 27 तारा समूह हैं जिनसे चंद्रमा गुजरता है। प्रत्येक नक्षत्र का अपना अधिपति, गुण और फल होता है। नक्षत्र विभिन्न गतिविधियों के लिए शुभ समय निर्धारित करने में मदद करते हैं।",
      en: "Nakshatras are 27 star constellations through which the moon passes. Each nakshatra has its own ruling deity, qualities, and effects. Nakshatras help determine auspicious times for various activities.",
    },
    category: "elements",
  },
  {
    id: "yog",
    title: {
      gu: "યોગ",
      hi: "योग",
      en: "Yog",
    },
    content: {
      gu: "યોગ એ સૂર્ય અને ચંદ્રની સંયુક્ત સ્થિતિ છે. કુલ 27 યોગ છે, જે દરેક દિવસની ઊર્જા અને ફળ નક્કી કરે છે. કેટલાક યોગ શુભ હોય છે, જ્યારે અન્ય અશુભ માનવામાં આવે છે.",
      hi: "योग सूर्य और चंद्रमा की संयुक्त स्थिति है। कुल 27 योग हैं, जो प्रत्येक दिन की ऊर्जा और फल निर्धारित करते हैं। कुछ योग शुभ होते हैं, जबकि अन्य अशुभ माने जाते हैं।",
      en: "Yog is the combined position of the sun and moon. There are 27 yogs in total, which determine the energy and effects of each day. Some yogs are considered auspicious, while others are inauspicious.",
    },
    category: "elements",
  },
  {
    id: "karan",
    title: {
      gu: "કરણ",
      hi: "करण",
      en: "Karan",
    },
    content: {
      gu: "કરણ એ અર્ધ તિથિ છે, એટલે કે એક તિથિના અડધા ભાગને કરણ કહેવાય છે. કુલ 11 કરણ છે, જેમાંથી 7 ચલિત (બવ, બાલવ, કૌલવ, તૈતિલ, ગર, વણિજ, વિષ્ટિ) અને 4 સ્થિર (શકુનિ, ચતુષ્પદ, નાગ, કિંસ્તુઘ્ન) છે.",
      hi: "करण अर्ध तिथि है, यानी एक तिथि के आधे भाग को करण कहा जाता है। कुल 11 करण हैं, जिनमें से 7 चलित (बव, बालव, कौलव, तैतिल, गर, वणिज, विष्टि) और 4 स्थिर (शकुनि, चतुष्पद, नाग, किंस्तुघ्न) हैं।",
      en: "Karan is half of a tithi, meaning half of a lunar day. There are 11 karans in total, of which 7 are movable (Bava, Balava, Kaulava, Taitila, Gara, Vanija, Vishti) and 4 are fixed (Shakuni, Chatushpada, Naga, Kimstughna).",
    },
    category: "elements",
  },
  {
    id: "importance",
    title: {
      gu: "પંચાંગનું મહત્વ",
      hi: "पंचांग का महत्व",
      en: "Importance of Panchang",
    },
    content: {
      gu: "પંચાંગ હિન્દુ જીવનમાં મહત્વપૂર્ણ ભૂમિકા ભજવે છે. તે ધાર્મિક ઉત્સવો, વ્રત, તહેવારો, લગ્ન અને અન્ય શુભ કાર્યો માટે શુભ સમય નક્કી કરવામાં મદદ કરે છે. પંચાંગ ખેતી, વ્યાપાર અને દૈનિક જીવનમાં પણ માર્ગદર્શન આપે છે.",
      hi: "पंचांग हिंदू जीवन में महत्वपूर्ण भूमिका निभाता है। यह धार्मिक उत्सवों, व्रत, त्योहारों, विवाह और अन्य शुभ कार्यों के लिए शुभ समय निर्धारित करने में मदद करता है। पंचांग कृषि, व्यापार और दैनिक जीवन में भी मार्गदर्शन प्रदान करता है।",
      en: "Panchang plays a vital role in Hindu life. It helps determine auspicious times for religious ceremonies, fasts, festivals, marriages, and other important events. Panchang also provides guidance in agriculture, business, and daily life.",
    },
    category: "significance",
  },
  {
    id: "festivals",
    title: {
      gu: "તહેવારો અને પંચાંગ",
      hi: "त्योहार और पंचांग",
      en: "Festivals and Panchang",
    },
    content: {
      gu: "હિન્દુ તહેવારો પંચાંગ અનુસાર ઉજવવામાં આવે છે. દિવાળી, હોળી, નવરાત્રિ, જન્માષ્ટમી જેવા મોટા તહેવારો તિથિ, નક્ષત્ર અને અન્ય પંચાંગ તત્વો પર આધારિત છે. પંચાંગ તહેવારોની સાચી તારીખ અને સમય નક્કી કરવામાં મદદ કરે છે.",
      hi: "हिंदू त्योहार पंचांग के अनुसार मनाए जाते हैं। दिवाली, होली, नवरात्रि, जन्माष्टमी जैसे बड़े त्योहार तिथि, नक्षत्र और अन्य पंचांग तत्वों पर आधारित हैं। पंचांग त्योहारों की सही तारीख और समय निर्धारित करने में मदद करता है।",
      en: "Hindu festivals are celebrated according to the Panchang. Major festivals like Diwali, Holi, Navratri, Janmashtami are based on tithi, nakshatra, and other Panchang elements. Panchang helps determine the correct date and time for festivals.",
    },
    category: "significance",
  },
]

export function LearningSection() {
  const { language, t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<"basics" | "elements" | "significance">("basics")
  const screenSize = useScreenSize()

  // Filter content by category
  const filteredContent = learningContent.filter((item) => item.category === activeCategory)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2" />
          {language === "gu" ? "પંચાંગ શીખો" : language === "hi" ? "पंचांग सीखें" : "Learn Panchang"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="basics">
              <Info className="h-4 w-4 mr-1 md:mr-2" />
              <span className={screenSize.isMobile ? "text-xs" : ""}>
                {language === "gu" ? "મૂળભૂત" : language === "hi" ? "मूलभूत" : "Basics"}
              </span>
            </TabsTrigger>
            <TabsTrigger value="elements">
              <HelpCircle className="h-4 w-4 mr-1 md:mr-2" />
              <span className={screenSize.isMobile ? "text-xs" : ""}>
                {language === "gu" ? "તત્વો" : language === "hi" ? "तत्व" : "Elements"}
              </span>
            </TabsTrigger>
            <TabsTrigger value="significance">
              <BookOpen className="h-4 w-4 mr-1 md:mr-2" />
              <span className={screenSize.isMobile ? "text-xs" : ""}>
                {language === "gu" ? "મહત્વ" : language === "hi" ? "महत्व" : "Significance"}
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
                    <p className="text-sm">{item.content[language as keyof typeof item.content]}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
