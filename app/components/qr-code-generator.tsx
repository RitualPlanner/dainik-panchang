"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { QrCode } from "lucide-react"
import { useLanguage } from "../contexts/language-context"
import { generateQRCode } from "../utils/qr-generator"
import { generateFormattedText } from "../utils"

interface QRCodeGeneratorProps {
  formData: any
  boldFields: string[]
}

export function QRCodeGenerator({ formData, boldFields }: QRCodeGeneratorProps) {
  const { t } = useLanguage()
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [panchangText, setPanchangText] = useState<string>("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      // Generate formatted panchang text
      const text = generateFormattedText(formData, boldFields)
      setPanchangText(text)

      // Generate QR code from panchang text
      generateQRCode(text).then((url) => {
        setQrCodeUrl(url)
      })
    }
  }, [open, formData, boldFields])

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(panchangText)
      alert(t("language") === "gu" ? "પંચાંગ કોપી થયો" : t("language") === "hi" ? "पंचांग कॉपी हुआ" : "Panchang copied!")
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const handleDownloadQR = () => {
    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = "panchang-qr-code.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <QrCode className="h-4 w-4 mr-2" />
          {t("generateQR")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("generateQR")}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 py-4">
          {qrCodeUrl && (
            <div className="border p-4 rounded-lg">
              <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code" className="w-64 h-64" />
            </div>
          )}
          <div className="flex gap-2">
            <Button onClick={handleCopyText} variant="outline">
              {t("copy")}
            </Button>
            <Button onClick={handleDownloadQR}>{t("generateImage")}</Button>
          </div>
          <p className="text-sm text-center text-muted-foreground">
            {t("language") === "gu"
              ? "આ QR કોડને સ્કેન કરવાથી આજનો પંચાંગ વિગતો મળશે"
              : t("language") === "hi"
                ? "इस QR कोड को स्कैन करने से आज का पंचांग विवरण मिलेगा"
                : "Scanning this QR code will show today's Panchang details"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
