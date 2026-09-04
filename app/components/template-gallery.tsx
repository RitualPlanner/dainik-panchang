"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LayoutTemplate, Star } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import type { ThemeOption } from "./theme-selector";
import { useScreenSize } from "../utils/responsive-utils";

// Define template types
type TemplateCategory = "religious" | "festival" | "daily" | "custom";

export interface PanchangTemplate {
  id: string;
  name: {
    gu: string;
    hi: string;
    en: string;
  };
  description: {
    gu: string;
    hi: string;
    en: string;
  };
  previewUrl: string;
  category: TemplateCategory;
  theme: ThemeOption;
  isFeatured: boolean;
  data: any; // Template data
}

// Sample templates
const templates: PanchangTemplate[] = [
  {
    id: "daily-standard",
    name: {
      gu: "દૈનિક માનક",
      hi: "दैनिक मानक",
      en: "Daily Standard",
    },
    description: {
      gu: "સામાન્ય દૈનિક પંચાંગ ટેમ્પલેટ",
      hi: "सामान्य दैनिक पंचांग टेम्पलेट",
      en: "Standard daily panchang template",
    },
    previewUrl: "/placeholder.svg?height=200&width=150&text=Daily",
    category: "daily",
    theme: {
      id: "default",
      name: "મૂળભૂત",
      background: "#1a2e3b",
      textColor: "white",
      borderColor: "#ffffff",
    },
    isFeatured: true,
    data: {
      // Template specific data
      boldFields: ["tithi", "nakshatra"],
      overlayId: "none",
      layout: "standard",
    },
  },
  {
    id: "diwali-special",
    name: {
      gu: "દિવાળી સ્પેશિયલ",
      hi: "दिवाली स्पेशल",
      en: "Diwali Special",
    },
    description: {
      gu: "દિવાળી તહેવાર માટે ખાસ ટેમ્પલેટ",
      hi: "दिवाली त्योहार के लिए विशेष टेम्पलेट",
      en: "Special template for Diwali festival",
    },
    previewUrl: "/placeholder.svg?height=200&width=150&text=Diwali",
    category: "festival",
    theme: {
      id: "festival",
      name: "ઉત્સવ",
      background: "#8b0000",
      textColor: "gold",
      borderColor: "#ffd700",
    },
    isFeatured: true,
    data: {
      boldFields: ["tithi", "nakshatra", "yog"],
      overlayId: "lakshmi",
      layout: "festival",
    },
  },
  {
    id: "navratri-special",
    name: {
      gu: "નવરાત્રિ સ્પેશિયલ",
      hi: "नवरात्रि स्पेशल",
      en: "Navratri Special",
    },
    description: {
      gu: "નવરાત્રિ તહેવાર માટે ખાસ ટેમ્પલેટ",
      hi: "नवरात्रि त्योहार के लिए विशेष टेम्पलेट",
      en: "Special template for Navratri festival",
    },
    previewUrl: "/placeholder.svg?height=200&width=150&text=Navratri",
    category: "festival",
    theme: {
      id: "spiritual",
      name: "આધ્યાત્મિક",
      background: "#2c3e50",
      textColor: "#e0e0e0",
      borderColor: "#9b59b6",
    },
    isFeatured: false,
    data: {
      boldFields: ["tithi", "nakshatra"],
      overlayId: "ornate-border",
      layout: "festival",
    },
  },
  {
    id: "shiva-puja",
    name: {
      gu: "શિવ પૂજા",
      hi: "शिव पूजा",
      en: "Shiva Puja",
    },
    description: {
      gu: "શિવ પૂજા માટે ધાર્મિક ટેમ્પલેટ",
      hi: "शिव पूजा के लिए धार्मिक टेम्पलेट",
      en: "Religious template for Shiva Puja",
    },
    previewUrl: "/placeholder.svg?height=200&width=150&text=Shiva",
    category: "religious",
    theme: {
      id: "spiritual",
      name: "આધ્યાત્મિક",
      background: "#2c3e50",
      textColor: "#e0e0e0",
      borderColor: "#9b59b6",
    },
    isFeatured: false,
    data: {
      boldFields: ["tithi", "nakshatra", "yog"],
      overlayId: "shiva",
      layout: "religious",
    },
  },
  {
    id: "minimal",
    name: {
      gu: "મિનિમલ",
      hi: "मिनिमल",
      en: "Minimal",
    },
    description: {
      gu: "સરળ અને સ્વચ્છ લેઆઉટ",
      hi: "सरल और स्वच्छ लेआउट",
      en: "Simple and clean layout",
    },
    previewUrl: "/placeholder.svg?height=200&width=150&text=Minimal",
    category: "daily",
    theme: {
      id: "elegant",
      name: "સુંદર",
      background: "#212121",
      textColor: "#f5f5f5",
      borderColor: "#9e9e9e",
    },
    isFeatured: true,
    data: {
      boldFields: [],
      overlayId: "none",
      layout: "minimal",
    },
  },
  {
    id: "nature-theme",
    name: {
      gu: "પ્રકૃતિ થીમ",
      hi: "प्रकृति थीम",
      en: "Nature Theme",
    },
    description: {
      gu: "પ્રકૃતિ આધારિત સુંદર ટેમ્પલેટ",
      hi: "प्रकृति आधारित सुंदर टेम्पलेट",
      en: "Beautiful nature-based template",
    },
    previewUrl: "/placeholder.svg?height=200&width=150&text=Nature",
    category: "daily",
    theme: {
      id: "nature",
      name: "પ્રકૃતિ",
      background: "#1b5e20",
      textColor: "#f1f8e9",
      borderColor: "#aed581",
    },
    isFeatured: false,
    data: {
      boldFields: ["tithi", "nakshatra"],
      overlayId: "om-bg",
      layout: "standard",
    },
  },
];

interface TemplateGalleryProps {
  onSelectTemplate: (template: PanchangTemplate) => void;
}

export function TemplateGallery({ onSelectTemplate }: TemplateGalleryProps) {
  const { language, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<
    TemplateCategory | "featured"
  >("featured");
  const screenSize = useScreenSize();

  const handleSelectTemplate = (template: PanchangTemplate) => {
    onSelectTemplate(template);
    setOpen(false);
  };

  // Get templates based on active category
  const filteredTemplates =
    activeCategory === "featured"
      ? templates.filter((t) => t.isFeatured)
      : templates.filter((t) => t.category === activeCategory);

  // Get grid columns based on screen size
  const gridCols = screenSize.isMobile
    ? "grid-cols-1"
    : screenSize.isTablet
      ? "grid-cols-2"
      : "grid-cols-3";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <LayoutTemplate className="h-4 w-4 mr-2" />
          {language === "gu"
            ? "ટેમ્પલેટ ગેલેરી"
            : language === "hi"
              ? "टेम्पलेट गैलरी"
              : "Template Gallery"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {language === "gu"
              ? "ટેમ્પલેટ ગેલેરી"
              : language === "hi"
                ? "टेम्पलेट गैलरी"
                : "Template Gallery"}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeCategory}
          onValueChange={(value) => setActiveCategory(value as any)}
        >
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="featured">
              <Star className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">
                {language === "gu"
                  ? "ફીચર્ડ"
                  : language === "hi"
                    ? "फीचर्ड"
                    : "Featured"}
              </span>
            </TabsTrigger>
            <TabsTrigger value="daily">
              {language === "gu"
                ? "દૈનિક"
                : language === "hi"
                  ? "दैनिक"
                  : "Daily"}
            </TabsTrigger>
            <TabsTrigger value="festival">
              {language === "gu"
                ? "તહેવાર"
                : language === "hi"
                  ? "त्योहार"
                  : "Festival"}
            </TabsTrigger>
            <TabsTrigger value="religious">
              {language === "gu"
                ? "ધાર્મિક"
                : language === "hi"
                  ? "धार्मिक"
                  : "Religious"}
            </TabsTrigger>
            <TabsTrigger value="custom">
              {language === "gu"
                ? "કસ્ટમ"
                : language === "hi"
                  ? "कस्टम"
                  : "Custom"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeCategory} className="pt-2">
            <div className={`grid ${gridCols} gap-4`}>
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="overflow-hidden cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleSelectTemplate(template)}
                >
                  <div className="relative">
                    <img
                      src={template.previewUrl || "/placeholder.svg"}
                      alt={
                        template.name[language as keyof typeof template.name]
                      }
                      className="w-full h-40 object-cover"
                    />
                    {template.isFeatured && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500">
                        <Star className="h-3 w-3 mr-1" />
                        {language === "gu"
                          ? "ફીચર્ડ"
                          : language === "hi"
                            ? "फीचर्ड"
                            : "Featured"}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">
                      {template.name[language as keyof typeof template.name]}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {
                        template.description[
                          language as keyof typeof template.description
                        ]
                      }
                    </p>
                    <div className="flex items-center mt-2">
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: template.theme.background }}
                      />
                      <span className="text-xs">{template.theme.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {activeCategory === "custom" &&
                filteredTemplates.length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <p>
                      {language === "gu"
                        ? "તમે હજી સુધી કોઈ કસ્ટમ ટેમ્પલેટ સેવ કર્યું નથી."
                        : language === "hi"
                          ? "आपने अभी तक कोई कस्टम टेम्पलेट सेव नहीं किया है।"
                          : "You haven't saved any custom templates yet."}
                    </p>
                  </div>
                )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
