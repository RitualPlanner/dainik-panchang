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
} from "lucide-react"
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
    <div className="min-h-screen bg-slate-100 p-2 md:p-4">
      <Card className="max-w-7xl mx-auto p-3 md:p-6 space-y-4 md:space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-center space-y-1 md:space-y-2 flex-1">
            <h1 className={`${getResponsiveFontSize(screenSize.width, 2)} font-bold`}>{t("ganeshInvocation")}</h1>
            <h2 className={`${getResponsiveFontSize(screenSize.width, 1)}`}>{t("panchangHeader")}</h2>
            <EditableText />
          </div>
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
          </div>
        </div>

        {extractionError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t("error")}</AlertTitle>
            <AlertDescription>{t("extractionError")}</AlertDescription>
          </Alert>
        )}

        {showNotification && (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <AlertCircle
              className="h-4 w-4 text
-green-500"
            />
            <AlertDescription className="text-green-700">{notificationMessage}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="form" value={activeMainTab} onValueChange={setActiveMainTab}>
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="form" className="flex items-center">
              <FileText className="h-4 w-4 mr-1 md:mr-2" />
              <span className="text-xs md:text-sm">{t("panchangForm")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-4 md:space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-2">


            </div>

            <div className={`grid grid-cols-1 ${screenSize.isTablet ? "md:grid-cols-2" : "md:grid-cols-3"} gap-4`}>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("tithi")}</label>
                <Input
                  name="tithi"
                  autoFocus
                  value={tithi}
                  onChange={handleInputChange}
                  placeholder={t("enterTithi")}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("tarikh")}</label>
                <CalendarPicker value={tarikh} onChange={(value) => setTarikh(value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("nakshatra")}</label>
                <Input
                  name="nakshatra"
                  value={nakshatra}
                  onChange={handleInputChange}
                  placeholder={t("enterNakshatra")}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("yog")}</label>
                <Input name="yog" value={yog} onChange={handleInputChange} placeholder={t("enterYog")} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("karan")}</label>
                <Input name="karan" value={karan} onChange={handleInputChange} placeholder={t("enterKaran")} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("suryoday")}</label>
                <Input name="suryoday" value={suryoday} onChange={handleInputChange} placeholder={t("enterSunrise")} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("suryasta")}</label>
                <Input name="suryasta" value={suryasta} onChange={handleInputChange} placeholder={t("enterSunset")} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("aajNiRashi")}</label>
                <Input
                  name="aajNiRashi"
                  value={aajNiRashi}
                  onChange={handleInputChange}
                  placeholder={t("enterRashi")}
                />
              </div>

              <div className="space-y-2">
                <ImageOverlaySelector onSelectOverlay={setSelectedOverlay} selectedOverlayId={selectedOverlay.id} />
              </div>
            </div>

            <DynamicFields fields={dinMahima} onChange={(newFields) => setDinMahima(newFields)} />

            <div className="flex gap-2 md:gap-4 justify-center flex-wrap">
              <Button onClick={handleGenerate} className={screenSize.isMobile ? "text-xs" : "w-40"}>
                <Download className="mr-2 h-4 w-4" />
                {t("generateImage")}
              </Button>

              <Button
                onClick={handleGeneratePDF}
                variant="outline"
                className={screenSize.isMobile ? "text-xs" : "w-40"}
              >
                <FileText className="mr-2 h-4 w-4" />
                {t("generatePDF")}
              </Button>

              <Button onClick={handleCopy} variant="outline" className={screenSize.isMobile ? "text-xs" : "w-40"}>
                <Copy className="mr-2 h-4 w-4" />
                {t("copyText")}
              </Button>

              <ShareOptions formData={formData} boldFields={boldFields} />

              <QRCodeGenerator formData={formData} boldFields={boldFields} />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={triggerFileInput}
                      variant="outline"
                      className={screenSize.isMobile ? "text-xs" : "w-40"}
                      disabled={isLoading}
                    >
                      <Upload className="mr-2 h-4 w-4" />
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
                  <Button variant="outline" className={screenSize.isMobile ? "text-xs" : "w-40"}>
                    {t("makeBold")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="space-y-1">
                  {Object.keys(formData).map((key) => (
                    <DropdownMenuItem key={key} className="flex items-center space-x-2">
                      <Checkbox checked={isFieldBold(key)} onCheckedChange={() => toggleBoldField(key)} id={key} />
                      <Label htmlFor={key}>{t(key)}</Label>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TabsContent>



          <TabsContent value="settings" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("selectTheme")}</label>
                  <ThemeSelector onChange={setCurrentTheme} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("editTitle")}</label>
                  <EditableText />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("language")}</label>
                  <div className="flex gap-2">
                    <LanguageSwitcher />
                    <Button variant="outline" onClick={() => setActiveMainTab("form")}>
                      {language === "gu" ? "ફોર્મ પર પાછા જાઓ" : language === "hi" ? "फॉर्म पर वापस जाएं" : "Back to Form"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === "gu" ? "નોટિફિકેશન" : language === "hi" ? "नोटिफिकेशन" : "Notifications"}
                  </label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notifications" />
                    <Label htmlFor="notifications">
                      {language === "gu"
                        ? "તહેવાર નોટિફિકેશન મેળવો"
                        : language === "hi"
                          ? "त्योहार नोटिफिकेशन प्राप्त करें"
                          : "Receive festival notifications"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="daily-panchang" />
                    <Label htmlFor="daily-panchang">
                      {language === "gu"
                        ? "દૈનિક પંચાંગ અપડેટ મેળવો"
                        : language === "hi"
                          ? "दैनिक पंचांग अपडेट प्राप्त करें"
                          : "Receive daily panchang updates"}
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === "gu" ? "ઓફલાઇન મોડ" : language === "hi" ? "ऑफलाइन मोड" : "Offline Mode"}
                  </label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="offline-mode" />
                    <Label htmlFor="offline-mode">
                      {language === "gu"
                        ? "ઓફલાઇન ઉપયોગ માટે ડેટા સાચવો"
                        : language === "hi"
                          ? "ऑफलाइन उपयोग के लिए डेटा सहेजें"
                          : "Save data for offline use"}
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === "gu" ? "ડેટા અને પ્રાઇવસી" : language === "hi" ? "डेटा और प्राइवेसी" : "Data & Privacy"}
                  </label>
                  <Button variant="outline" className="w-full">
                    {language === "gu" ? "ડેટા સાફ કરો" : language === "hi" ? "डेटा साफ करें" : "Clear Data"}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>


        </Tabs>
      </Card>

      {/* Floating notification */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg animate-fade-in-up">
          {notificationMessage}
        </div>
      )}
    </div>
  )
}
