"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, CalendarIcon, FileText } from "lucide-react"
import { useLanguage } from "../contexts/language-context"
import { generateImage } from "../utils"
import { generatePDF } from "../utils/pdf-export"
import { fetchPanchangData } from "../services/panchang-api"
import { convertToGujaratiNumerals } from "../utils/date-utils"
import JSZip from "jszip"

interface BatchGeneratorProps {
  boldFields: string[]
  currentTheme: any
}

export function BatchGenerator({ boldFields, currentTheme }: BatchGeneratorProps) {
  const { language, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [outputFormat, setOutputFormat] = useState<"png" | "pdf">("png")
  const [generateSingleZip, setGenerateSingleZip] = useState(true)

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const getDatesInRange = (start: Date, end: Date): Date[] => {
    const dates: Date[] = []
    const currentDate = new Date(start)

    while (currentDate <= end) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return dates
  }

  const handleBatchGenerate = async () => {
    if (!startDate || !endDate) return

    setIsGenerating(true)
    setProgress(0)

    try {
      const dates = getDatesInRange(startDate, endDate)
      const zip = new JSZip()
      const totalDates = dates.length

      for (let i = 0; i < dates.length; i++) {
        const date = dates[i]
        const formattedDate = formatDate(date)

        // Fetch Panchang data for this date
        const panchangData = await fetchPanchangData(date)

        // Format date in Gujarati
        const day = String(date.getDate()).padStart(2, "0")
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const year = date.getFullYear()
        const gujaratiDate = convertToGujaratiNumerals(`${day}/${month}/${year}`)

        // Add date to the Panchang data
        panchangData.tarikh = gujaratiDate

        if (outputFormat === "png") {
          // Generate image
          const imageBlob = await generateImage(panchangData, boldFields, currentTheme)

          // Add to zip
          zip.file(`panchang_${formattedDate}.png`, imageBlob)
        } else {
          // Generate PDF
          const pdfBlob = await generatePDF(panchangData, boldFields)

          // Add to zip
          zip.file(`panchang_${formattedDate}.pdf`, pdfBlob)
        }

        // Update progress
        setProgress(Math.round(((i + 1) / totalDates) * 100))
      }

      // Generate and download zip
      const zipBlob = await zip.generateAsync({ type: "blob" })
      const zipUrl = URL.createObjectURL(zipBlob)

      const downloadLink = document.createElement("a")
      downloadLink.href = zipUrl
      downloadLink.download = `panchang_batch_${formatDate(startDate)}_to_${formatDate(endDate)}.zip`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)

      // Clean up
      URL.revokeObjectURL(zipUrl)
      setOpen(false)
    } catch (error) {
      console.error("Error generating batch:", error)
    } finally {
      setIsGenerating(false)
      setProgress(0)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CalendarIcon className="h-4 w-4 mr-2" />
          {t("batchGenerate")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("batchGenerate")}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{language === "gu" ? "શરૂઆત તારીખ" : language === "hi" ? "प्रारंभ तिथि" : "Start Date"}</Label>
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} className="rounded-md border" />
            </div>
            <div className="space-y-2">
              <Label>{language === "gu" ? "અંતિમ તારીખ" : language === "hi" ? "अंतिम तिथि" : "End Date"}</Label>
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} className="rounded-md border" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{language === "gu" ? "આઉટપુટ ફોર્મેટ" : language === "hi" ? "आउटपुट फॉर्मेट" : "Output Format"}</Label>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="format-png"
                  checked={outputFormat === "png"}
                  onChange={() => setOutputFormat("png")}
                />
                <Label htmlFor="format-png">PNG</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="format-pdf"
                  checked={outputFormat === "pdf"}
                  onChange={() => setOutputFormat("pdf")}
                />
                <Label htmlFor="format-pdf">PDF</Label>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="zip"
              checked={generateSingleZip}
              onCheckedChange={(checked) => setGenerateSingleZip(checked as boolean)}
            />
            <Label htmlFor="zip">
              {language === "gu"
                ? "બધા ફાઇલ્સને એક ZIP ફાઇલમાં ડાઉનલોડ કરો"
                : language === "hi"
                  ? "सभी फाइलों को एक ZIP फाइल में डाउनलोड करें"
                  : "Download all files in a single ZIP file"}
            </Label>
          </div>

          {isGenerating && (
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-sm text-center">
                {language === "gu"
                  ? `પ્રગતિ: ${progress}%`
                  : language === "hi"
                    ? `प्रगति: ${progress}%`
                    : `Progress: ${progress}%`}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleBatchGenerate} disabled={isGenerating || !startDate || !endDate}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {language === "gu" ? "જનરેટ થઈ રહ્યું છે..." : language === "hi" ? "जनरेट हो रहा है..." : "Generating..."}
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                {language === "gu" ? "બેચ જનરેટ કરો" : language === "hi" ? "बैच जनरेट करें" : "Generate Batch"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
