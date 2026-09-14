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
import { useLanguage } from "@/app/contexts/language-context";
import { useScreenSize } from "@/app/utils/responsive-utils";
import type { PanchangTemplate } from "@/types/panchang";

type TemplateCategory = "religious" | "festival" | "daily" | "custom";

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
    formData: {
      tithi: "",
      tarikh: "",
      nakshatra: "",
      yog: "",
      karan: "",
      suryoday: "",
      suryasta: "",
      aajNiRashi: "",
      dinMahima: [""],
    },
    themeId: "default",
    overlayId: "none",
    category: "daily",
  },
];

interface TemplateGalleryProps {
  onSelectTemplate: (template: PanchangTemplate) => void;
}

export function TemplateGallery({ onSelectTemplate }: TemplateGalleryProps) {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<
    TemplateCategory | "featured"
  >("featured");
  const screenSize = useScreenSize();

  const handleSelectTemplate = (template: PanchangTemplate) => {
    onSelectTemplate(template);
    setOpen(false);
  };

  const filteredTemplates =
    activeCategory === "featured"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

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
                  ? "દૈનિક"
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
                  ? "કસ્ટમ"
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
