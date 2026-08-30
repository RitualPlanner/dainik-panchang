"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Copy,
  Upload,
  AlertCircle,
  FileText,
  RefreshCw,
  Settings,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "next-themes"
import DynamicFields from "./dynamic-fields"
import { generateImage, generateFormattedText, extractDataFromImage } from "./utils"
import { generatePDF } from "./utils/pdf-export"
import { getCurrentGujaratiDate } from "./utils/date-utils"
import EditableText from "./EditableText"
import { useLocalStorageWithExpiry } from "./hooks/useLocalStorageWithExpiry"
import { CalendarPicker } from "./components/calendar-picker"
import { ThemeSelector, type ThemeOption } from "./components/theme-selector"
import { ShareOptions } from "./components/share-options"
import { ImageOverlaySelector, type OverlayOption } from "./components/image-overlay-selector"
import { QRCodeGenerator } from "./components/qr-code-generator"
import { LanguageSwitcher } from "./components/language-switcher"
import { useLanguage } from "./contexts/language-context"
import { fetchPanchangData } from "./services/panchang-api"
import { useScreenSize, getResponsiveFontSize } from "./utils/responsive-utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type FormData = {
  tithi: string
  tarikh: string
  nakshatra: string
  yog: string
  karan: string
  suryoday: string
  suryasta: string
  aajNiRashi: string
  dinMahima: string[]
}

// Default form data
const defaultFormData: FormData = {
  tithi: "",
  tarikh: getCurrentGujaratiDate(),
  nakshatra: "",
  yog: "",
  karan: "",
  suryoday: "",
  suryasta: "",
  aajNiRashi: "",
  dinMahima: [""],
}

export default function PanchangForm() {
  // Add this after the component declaration
  const { t, language } = useLanguage()
  const screenSize = useScreenSize()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Sync mounted state on client mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use localStorage with expiry for each field
  const [tithi, setTithi] = useLocalStorageWithExpiry("panchang_tithi", defaultFormData.tithi)
  const [tarikh, setTarikh] = useLocalStorageWithExpiry("panchang_tarikh", defaultFormData.tarikh)
  const [nakshatra, setNakshatra] = useLocalStorageWithExpiry("panchang_nakshatra", defaultFormData.nakshatra)
  const [yog, setYog] = useLocalStorageWithExpiry("panchang_yog", defaultFormData.yog)
  const [karan, setKaran] = useLocalStorageWithExpiry("panchang_karan", defaultFormData.karan)
  const [suryoday, setSuryoday] = useLocalStorageWithExpiry("panchang_suryoday", defaultFormData.suryoday)
  const [suryasta, setSuryasta] = useLocalStorageWithExpiry("panchang_suryasta", defaultFormData.suryasta)
  const [aajNiRashi, setAajNiRashi] = useLocalStorageWithExpiry("panchang_aajNiRashi", defaultFormData.aajNiRashi)
  const [dinMahima, setDinMahima] = useLocalStorageWithExpiry("panchang_dinMahima", defaultFormData.dinMahima)

  // Add these new state variables after the existing ones
  const [selectedOverlay, setSelectedOverlay] = useState<OverlayOption>({
    id: "none",
    name: {
      gu: "કોઈ નહીં",
      hi: "कोई नहीं",
      en: "None",
    },
    previewUrl: "/placeholder.svg?height=60&width=60",
    imageUrl: "",
    type: "none",
  })
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [activeMainTab, setActiveMainTab] = useState("form")
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  // Combine all fields into formData object
  const formData: FormData = {
    tithi,
    tarikh,
    nakshatra,
    yog,
    karan,
    suryoday,
    suryasta,
    aajNiRashi,
    dinMahima,
  }

  // Field setter functions map
  const fieldSetters = {
    tithi: setTithi,
    tarikh: setTarikh,
    nakshatra: setNakshatra,
    yog: setYog,
    karan: setKaran,
    suryoday: setSuryoday,
    suryasta: setSuryasta,
    aajNiRashi: setAajNiRashi,
    dinMahima: setDinMahima,
  }

  const [boldFields, setBoldFields] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [extractionError, setExtractionError] = useState<string | null>(null)
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>({
    id: "default",
    name: "મૂળભૂત",
    background: "#1a2e3b",
    textColor: "white",
    borderColor: "#ffffff",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load bold fields from localStorage
  useEffect(() => {
    const storedBoldFields = localStorage.getItem("panchang_boldFields")
    if (storedBoldFields) {
      try {
        const parsedBoldFields = JSON.parse(storedBoldFields)
        if (Array.isArray(parsedBoldFields)) {
          setBoldFields(parsedBoldFields)
        }
      } catch (error) {
        console.error("Error parsing bold fields from localStorage:", error)
      }
    }
  }, [])

  // Save bold fields to localStorage when they change
  useEffect(() => {
    localStorage.setItem("panchang_boldFields", JSON.stringify(boldFields))
  }, [boldFields])

  // Check URL for shared data on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const sharedData = urlParams.get("share")

      if (sharedData) {
        try {
          const decodedData = JSON.parse(atob(sharedData))

          // Update form data from shared data
          if (decodedData.formData) {
            Object.entries(decodedData.formData).forEach(([key, value]) => {
              if (key in fieldSetters) {
                fieldSetters[key as keyof typeof fieldSetters](value)
              }
            })
          }

          // Update bold fields from shared data
          if (decodedData.boldFields && Array.isArray(decodedData.boldFields)) {
            setBoldFields(decodedData.boldFields)
          }

          // Show notification
          setNotificationMessage(
            language === "gu"
              ? "શેર કરેલ પંચાંગ સફળતાપૂર્વક લોડ થયું"
              : language === "hi"
                ? "शेयर किया गया पंचांग सफलतापूर्वक लोड हुआ"
                : "Shared panchang loaded successfully",
          )
          setShowNotification(true)
          setTimeout(() => setShowNotification(false), 3000)
        } catch (error) {
          console.error("Error parsing shared data:", error)
        }
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Use the appropriate setter function from our map
    if (name in fieldSetters) {
      fieldSetters[name as keyof typeof fieldSetters](value)
    }
  }



  const handleGenerate = async () => {
    const imageBlob = await generateImage(formData, boldFields, currentTheme, selectedOverlay)
    const imageUrl = URL.createObjectURL(imageBlob)

    const downloadLink = document.createElement("a")
    downloadLink.href = imageUrl
    downloadLink.download = "panchang.png"
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)

    // Show notification
    setNotificationMessage(
      language === "gu"
        ? "પંચાંગ ઇમેજ સફળતાપૂર્વક જનરેટ થઈ"
        : language === "hi"
          ? "पंचांग इमेज सफलतापूर्वक ज��रेट हुई"
          : "Panchang image generated successfully",
    )
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handleGeneratePDF = async () => {
    const pdfBlob = await generatePDF(formData, boldFields)
    const pdfUrl = URL.createObjectURL(pdfBlob)

    const downloadLink = document.createElement("a")
    downloadLink.href = pdfUrl
    downloadLink.download = "panchang.pdf"
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)

    // Show notification
    setNotificationMessage(
      language === "gu"
        ? "પંચાંગ PDF સફળતાપૂર્વક જનરેટ થઈ"
        : language === "hi"
          ? "पंचांग PDF सफलतापूर्वक जनरेट हुई"
          : "Panchang PDF generated successfully",
    )
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handleCopy = async () => {
    const formattedText = generateFormattedText(formData, boldFields)
    try {
      await navigator.clipboard.writeText(formattedText)

      // Show notification
      setNotificationMessage(
        language === "gu"
          ? "પંચાંગ ટેક્સ્ટ ક્લિપબોર્ડ પર કોપી થઈ"
          : language === "hi"
            ? "पंचांग टेक्स्ट क्लिपबोर्ड पर कॉपी हुआ"
            : "Panchang text copied to clipboard",
      )
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const toggleBoldField = (field: string) => {
    setBoldFields((prev) => (prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]))
  }

  const isFieldBold = (field: string) => boldFields.includes(field)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setExtractionError(null)

    try {
      // Create a URL for the uploaded image
      const imageUrl = URL.createObjectURL(file)

      // Extract data from the image
      const extractedData = await extractDataFromImage(imageUrl)

      // Check if we got meaningful data
      const hasData = Object.values(extractedData).some(
        (value) => value && (Array.isArray(value) ? value.length > 0 && value[0] !== "" : value !== ""),
      )

      if (!hasData) {
        throw new Error("Could not extract meaningful data from the image")
      }

      // Update each field with its corresponding extracted data
      Object.entries(extractedData).forEach(([key, value]) => {
        if (key in fieldSetters) {
          fieldSetters[key as keyof typeof fieldSetters](value)
        }
      })

      // Clean up the URL
      URL.revokeObjectURL(imageUrl)

      // Show notification
      setNotificationMessage(
        language === "gu"
          ? "ઇમેજમાંથી ડેટા સફળતાપૂર્વક એક્સટ્રેક્ટ થયો"
          : language === "hi"
            ? "इमेज से डेटा सफलतापूर्वक एक्सट्रैक्ट हुआ"
            : "Data successfully extracted from image",
      )
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    } catch (error) {
      console.error("Error extracting data from image:", error)
      setExtractionError(t("extractionError"))
    } finally {
      setIsLoading(false)
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }



  // Replace the existing Card component with this updated version
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100/40 via-amber-50/60 to-stone-100/90 dark:from-stone-800/40 dark:via-stone-900/60 dark:to-stone-950/90 py-8 px-4 md:px-8 flex items-center justify-center transition-colors duration-300">
      <Card className="relative max-w-7xl w-full mx-auto p-6 md:p-10 space-y-6 md:space-y-8 glass-panel border border-amber-200/50 dark:border-stone-800 shadow-2xl rounded-3xl transition-colors duration-300">
        <img src="https://res.cloudinary.com/db6qh4jsv/image/upload/v1784730633/image1_s0xbfv.png" alt="Dainik Panchang Logo" className="absolute top-4 left-4 md:top-6 md:left-6 h-12 w-12 md:h-16 md:w-16 object-contain hover:scale-105 transition-all duration-200 z-10 bg-white p-1.5 rounded-xl border border-amber-200/40 shadow-sm" />
        <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 bg-white/70 dark:bg-stone-800/80 backdrop-blur-sm p-1.5 rounded-xl border border-amber-200/30 dark:border-stone-700/50 shadow-sm z-10">
          {mounted && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg text-amber-800 dark:text-amber-200 hover:bg-amber-100/50 dark:hover:bg-stone-700/50 transition-colors"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-amber-500" />
                ) : (
                  <Moon className="h-4 w-4 text-amber-800" />
                )}
              </Button>
              <div className="h-4 w-px bg-amber-400 dark:bg-stone-700" />
            </>
          )}
          <LanguageSwitcher />
        </div>
        <div className="flex flex-col items-center gap-6 border-b border-amber-200/40 pb-6 text-center">
          <div className="space-y-3 w-full flex flex-col items-center mt-6 md:mt-2">
            <h1 className={`${getResponsiveFontSize(screenSize.width, 2.5)} font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 tracking-wider drop-shadow-sm spiritual-glow`}>
              {t("ganeshInvocation")}
            </h1>
            <h2 className={`${getResponsiveFontSize(screenSize.width, 1.2)} font-semibold text-amber-800 tracking-wide uppercase`}>
              {t("panchangHeader")}
            </h2>
            <div className="mt-2 w-full flex justify-center">
              <EditableText />
            </div>
          </div>
        </div>

        {extractionError && (
          <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-900 rounded-xl">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-semibold">{t("error")}</AlertTitle>
            <AlertDescription>{t("extractionError")}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-2">


            </div>

            <div className={`grid grid-cols-1 ${screenSize.isTablet ? "md:grid-cols-2" : "md:grid-cols-3"} gap-6`}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-amber-900/80 tracking-wide">{t("tithi")}</label>
                <Input
                  name="tithi"
                  autoFocus
                  value={tithi}
                  onChange={handleInputChange}
                  placeholder={t("enterTithi")}
                  className="rounded-xl border-amber-200 bg-white/60 focus:bg-white focus-visible:ring-orange-500/30 hover:border-amber-300 shadow-sm transition-all duration-200 input-premium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-amber-900/80 tracking-wide">{t("tarikh")}</label>
                <CalendarPicker value={tarikh} onChange={(value) => setTarikh(value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-amber-900/80 tracking-wide">{t("nakshatra")}</label>
                <Input
                  name="nakshatra"
                  value={nakshatra}
                  onChange={handleInputChange}
                  placeholder={t("enterNakshatra")}
                  className="rounded-xl border-amber-200 bg-white/60 focus:bg-white focus-visible:ring-orange-500/30 hover:border-amber-300 shadow-sm transition-all duration-200 input-premium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-amber-900/80 tracking-wide">{t("yog")}</label>
                <Input
                  name="yog"
                  value={yog}
                  onChange={handleInputChange}
                  placeholder={t("enterYog")}
                  className="rounded-xl border-amber-200 bg-white/60 focus:bg-white focus-visible:ring-orange-500/30 hover:border-amber-300 shadow-sm transition-all duration-200 input-premium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-amber-900/80 tracking-wide">{t("karan")}</label>
                <Input
                  name="karan"
                  value={karan}
                  onChange={handleInputChange}
                  placeholder={t("enterKaran")}
                  className="rounded-xl border-amber-200 bg-white/60 focus:bg-white focus-visible:ring-orange-500/30 hover:border-amber-300 shadow-sm transition-all duration-200 input-premium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-amber-900/80 tracking-wide">{t("suryoday")}</label>
                <Input
                  name="suryoday"
                  value={suryoday}
                  onChange={handleInputChange}
                  placeholder={t("enterSunrise")}
                  className="rounded-xl border-amber-200 bg-white/60 focus:bg-white focus-visible:ring-orange-500/30 hover:border-amber-300 shadow-sm transition-all duration-200 input-premium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-amber-900/80 tracking-wide">{t("suryasta")}</label>
                <Input
                  name="suryasta"
                  value={suryasta}
                  onChange={handleInputChange}
                  placeholder={t("enterSunset")}
                  className="rounded-xl border-amber-200 bg-white/60 focus:bg-white focus-visible:ring-orange-500/30 hover:border-amber-300 shadow-sm transition-all duration-200 input-premium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-amber-900/80 tracking-wide">{t("aajNiRashi")}</label>
                <Input
                  name="aajNiRashi"
                  value={aajNiRashi}
                  onChange={handleInputChange}
                  placeholder={t("enterRashi")}
                  className="rounded-xl border-amber-200 bg-white/60 focus:bg-white focus-visible:ring-orange-500/30 hover:border-amber-300 shadow-sm transition-all duration-200 input-premium"
                />
              </div>

            </div>

            <DynamicFields fields={dinMahima} onChange={(newFields) => setDinMahima(newFields)} />

            <div className="flex gap-3 justify-center flex-wrap pt-4 border-t border-amber-100">
              <Button
                onClick={handleGenerate}
                className={`bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold rounded-xl shadow-md shadow-orange-500/20 transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 ${screenSize.isMobile ? "text-xs px-3" : "w-44"}`}
              >
                <Download className="mr-2 h-4 w-4" />
                {t("generateImage")}
              </Button>

              <Button
                onClick={handleGeneratePDF}
                variant="outline"
                className={`border-amber-200 hover:bg-amber-50/50 font-semibold text-amber-900 rounded-xl transition-all duration-200 ${screenSize.isMobile ? "text-xs px-3" : "w-44"}`}
              >
                <FileText className="mr-2 h-4 w-4 text-orange-500" />
                {t("generatePDF")}
              </Button>

              <Button
                onClick={handleCopy}
                variant="outline"
                className={`border-amber-200 hover:bg-amber-50/50 font-semibold text-amber-900 rounded-xl transition-all duration-200 ${screenSize.isMobile ? "text-xs px-3" : "w-44"}`}
              >
                <Copy className="mr-2 h-4 w-4 text-orange-500" />
                {t("copyText")}
              </Button>

              <ShareOptions formData={formData} boldFields={boldFields} />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={triggerFileInput}
                      variant="outline"
                      className={`border-amber-200 hover:bg-amber-50/50 font-semibold text-amber-900 rounded-xl transition-all duration-200 ${screenSize.isMobile ? "text-xs px-3" : "w-44"}`}
                      disabled={isLoading}
                    >
                      <Upload className="mr-2 h-4 w-4 text-orange-500" />
                      {isLoading ? t("loading") : t("loadFromImage")}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Upload a Panchang image to extract data</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`border-amber-200 hover:bg-amber-50/50 font-semibold text-amber-900 rounded-xl transition-all duration-200 ${screenSize.isMobile ? "text-xs px-3" : "w-44"}`}
                  >
                    {t("makeBold")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="space-y-1 rounded-xl p-2 border-amber-100 bg-white">
                  {Object.keys(formData).map((key) => (
                    <DropdownMenuItem key={key} className="flex items-center space-x-2 rounded-lg focus:bg-amber-50">
                      <Checkbox checked={isFieldBold(key)} onCheckedChange={() => toggleBoldField(key)} id={key} className="border-amber-400 text-orange-600 focus-visible:ring-orange-500" />
                      <Label htmlFor={key} className="text-amber-900 cursor-pointer">{t(key)}</Label>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>

      {/* Floating notification */}
      {showNotification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-2.5 rounded-xl shadow-lg border border-emerald-500/20 font-medium text-sm transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          {notificationMessage}
        </div>
      )}
    </div>
  )
}
