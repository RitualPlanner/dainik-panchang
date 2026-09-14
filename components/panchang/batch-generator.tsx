"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, CalendarIcon, FileText } from "lucide-react";
import { useLanguage } from "@/app/contexts/language-context";
import { generateImage } from "@/app/utils";
import { generatePDF } from "@/app/utils/pdf-export";
import { fetchPanchangData } from "@/app/services/panchang-api";
import { convertToGujaratiNumerals } from "@/app/utils/date-utils";
import JSZip from "jszip";
import type { ThemeOption } from "@/types/theme";

interface BatchGeneratorProps {
  boldFields: string[];
  currentTheme?: ThemeOption;
}

export function BatchGenerator({
  boldFields,
  currentTheme,
}: BatchGeneratorProps) {
  const { language, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputFormat, setOutputFormat] = useState<"png" | "pdf">("png");

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getDatesInRange = (start: Date, end: Date): Date[] => {
    const dates: Date[] = [];
    const currentDate = new Date(start);

    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const handleBatchGenerate = async () => {
    if (!startDate || !endDate) return;

    setIsGenerating(true);
    setProgress(0);

    try {
      const dates = getDatesInRange(startDate, endDate);
      const zip = new JSZip();
      const totalDates = dates.length;

      for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
        const formattedDate = formatDate(date);

        const panchangData = await fetchPanchangData(date);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const gujaratiDateStr = convertToGujaratiNumerals(
          `${day}/${month}/${year}`
        );

        const formData = {
          ...panchangData,
          tarikh: gujaratiDateStr,
        };

        if (outputFormat === "png") {
          const blob = await generateImage(formData, boldFields, currentTheme);
          zip.file(`panchang-${formattedDate}.jpg`, blob);
        } else {
          const pdfBlob = await generatePDF(formData, boldFields);
          zip.file(`panchang-${formattedDate}.pdf`, pdfBlob);
        }

        setProgress(Math.round(((i + 1) / totalDates) * 100));
      }

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `panchang-batch-${formatDate(startDate)}-to-${formatDate(endDate)}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setOpen(false);
    } catch (error) {
      console.error("Error generating batch:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <FileText className="h-4 w-4 mr-2" />
          {language === "gu"
            ? "બેચ જનરેટર"
            : language === "hi"
              ? "बैच जनरेटर"
              : "Batch Generator"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {language === "gu"
              ? "બેચ જનરેટર"
              : language === "hi"
                ? "बैच जनरेटर"
                : "Batch Generator"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>
              {language === "gu"
                ? "શરૂઆતની તારીખ"
                : language === "hi"
                  ? "शुरुआती तारीख"
                  : "Start Date"}
            </Label>
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              className="rounded-md border mx-auto"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleBatchGenerate} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {progress}%
              </>
            ) : (
              "Generate Zip"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
