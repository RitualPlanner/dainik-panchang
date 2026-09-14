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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Layers } from "lucide-react";
import { useLanguage } from "@/app/contexts/language-context";
import type { OverlayOption } from "@/types/theme";
import { PRESET_OVERLAYS } from "@/constants/theme";

interface ImageOverlaySelectorProps {
  onSelectOverlay: (overlay: OverlayOption) => void;
  selectedOverlayId: string;
}

export function ImageOverlaySelector({
  onSelectOverlay,
  selectedOverlayId,
}: ImageOverlaySelectorProps) {
  const { language, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("deity");

  const handleSelectOverlay = (overlay: OverlayOption) => {
    onSelectOverlay(overlay);
    setOpen(false);
  };

  const selectedOverlay =
    PRESET_OVERLAYS.find((o) => o.id === selectedOverlayId) ||
    PRESET_OVERLAYS[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex justify-between items-center"
        >
          <div className="flex items-center">
            <Layers className="h-4 w-4 mr-2" />
            <span>{t("addOverlay")}</span>
          </div>
          {selectedOverlayId !== "none" && (
            <div className="flex items-center">
              <span className="text-xs mr-2">
                {
                  selectedOverlay.name[
                    language as keyof typeof selectedOverlay.name
                  ]
                }
              </span>
              <img
                src={selectedOverlay.previewUrl || "/placeholder.svg"}
                alt={selectedOverlay.name.en}
                className="h-6 w-6 rounded-sm"
              />
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("addOverlay")}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="deity">
              {language === "gu"
                ? "દેવતા"
                : language === "hi"
                  ? "देवता"
                  : "Deity"}
            </TabsTrigger>
            <TabsTrigger value="border">
              {language === "gu"
                ? "બોર્ડર"
                : language === "hi"
                  ? "बॉर्डर"
                  : "Border"}
            </TabsTrigger>
            <TabsTrigger value="background">
              {language === "gu"
                ? "બેકગ્રાઉન્ડ"
                : language === "hi"
                  ? "बैकग्राउंड"
                  : "Background"}
            </TabsTrigger>
            <TabsTrigger value="none">
              {language === "gu"
                ? "કોઈ નહીં"
                : language === "hi"
                  ? "कोई नहीं"
                  : "None"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="none" className="pt-4">
            <Button
              onClick={() => handleSelectOverlay(PRESET_OVERLAYS[0])}
              variant="outline"
              className="w-full"
            >
              {language === "gu"
                ? "કોઈ ઓવરલે નહીં"
                : language === "hi"
                  ? "कोई ओवरले नहीं"
                  : "No Overlay"}
            </Button>
          </TabsContent>

          {["deity", "border", "background"].map((type) => (
            <TabsContent key={type} value={type} className="pt-4">
              <RadioGroup
                value={selectedOverlayId}
                className="grid grid-cols-3 gap-4"
              >
                {PRESET_OVERLAYS.filter((option) => option.type === type).map(
                  (option) => (
                    <div
                      key={option.id}
                      className="flex flex-col items-center space-y-2"
                    >
                      <Label
                        htmlFor={option.id}
                        className="cursor-pointer flex flex-col items-center space-y-2"
                        onClick={() => handleSelectOverlay(option)}
                      >
                        <div className="border rounded-md p-1 hover:border-primary">
                          <img
                            src={option.previewUrl || "/placeholder.svg"}
                            alt={option.name.en}
                            className="h-16 w-16 object-contain"
                          />
                        </div>
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          className="sr-only"
                        />
                        <span className="text-sm">
                          {option.name[language as keyof typeof option.name]}
                        </span>
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
