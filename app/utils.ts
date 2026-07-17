// Helper function to safely access localStorage
const getLocalStorage = (key, defaultValue) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key) || defaultValue
  }
  return defaultValue
}

export const generateImage = async (formData: FormData, boldFields: string[]) => {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    console.error("Canvas operations are not available in this environment")
    return new Blob()
  }

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (!ctx) return new Blob()

  // Set canvas size
  canvas.width = 800
  canvas.height = 1200

  // Set background
  ctx.fillStyle = "#1a2e3b"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Set text style
  ctx.fillStyle = "white"
  ctx.textAlign = "center"

  // Add title
  ctx.font = "bold 32px Arial"
  ctx.fillText("॥ શ્રી ગણેશાય નમઃ ॥", canvas.width / 2, 50)

  // Add separator - now left-aligned
  ctx.textAlign = "center"

  // Center the title
  ctx.textAlign = "center"
  ctx.font = "bold 28px Arial"
  ctx.fillText("દૈનિક પંચાંગ", canvas.width / 2, 120)

  // Add separator - left-aligned
  ctx.textAlign = "center"

  // Add static header - centered
  ctx.textAlign = "center"
  ctx.font = "bold 16px Arial"
  const line1 = getLocalStorage("vikramSamvatLine1", "વિક્રમ સંવત ૨૦૮૧ , ઉત્તરાયણ , વસંત ઋતુ , શાલિવાહન શકે ૧૯૪૬")
  ctx.fillText(line1, canvas.width / 2, 180)
  const line2 = getLocalStorage("vikramSamvatLine2", "ક્રોધીનામ - અનલ નામ સંવત્સર")
  ctx.fillText(line2, canvas.width / 2, 210)

  // Rest of the function remains the same
  // Add separator - left-aligned
  ctx.textAlign = "left"
  ctx.fillText("............................", 50, 240)

  // Add form data
  ctx.font = "20px Arial"
  ctx.textAlign = "left"
  let y = 270

  // Function to set font based on boldFields
  const setFont = (field: string) => {
    ctx.font = boldFields.includes(field) ? "bold 20px Arial" : "20px Arial"
  }

  // Add tithi and date
  ctx.fillText(`\n`, 50, y)
  y += 30

  setFont("tithi")
  ctx.fillText(`- તિથિ - ${formData.tithi}`, 50, y)
  y += 30

  setFont("tarikh")
  ctx.fillText(`- તા . ${formData.tarikh}`, 50, y)
  y += 40

  // Add separator - left-aligned
  ctx.fillText("............................", 50, y)
  y += 40

  // Add the fields with proper formatting
  setFont("nakshatra")
  ctx.fillText(`- નક્ષત્ર - ${formData.nakshatra}`, 50, y)
  y += 30

  setFont("yog")
  ctx.fillText(`- યોગ   - ${formData.yog}`, 50, y)
  y += 30

  setFont("karan")
  ctx.fillText(`- કરણ  - ${formData.karan}`, 50, y)
  y += 30

  // Add separator - left-aligned
  ctx.fillText("............................", 50, y)
  y += 40

  // Add sunrise and sunset
  setFont("suryoday")
  ctx.fillText(`- સૂર્યોદય - ${formData.suryoday} કલાકે`, 50, y)
  y += 30

  setFont("suryasta")
  ctx.fillText(`- સૂર્યાસ્ત - ${formData.suryasta} કલાકે`, 50, y)
  y += 30

  // Add separator - left-aligned
  ctx.fillText("............................", 50, y)
  y += 40

  // Add rashi
  setFont("aajNiRashi")
  ctx.fillText(`-  આજ ની રાશી...  ${formData.aajNiRashi} .`, 50, y)
  y += 30

  // Add separator - left-aligned
  y += 40

  // Add din mahima - centered title
  ctx.textAlign = "center"
  ctx.font = "bold 24px Arial"
  ctx.fillText("આજ નો દિન મહિમા", canvas.width / 2, y)
  y += 40

  // Din mahima items - left-aligned
  ctx.font = "20px Arial"
  ctx.textAlign = "left"
  formData.dinMahima.forEach((item: string) => {
    if (item.trim()) {
      ctx.fillText(`- ${item}`, 50, y)
      y += 30
    }
  })

  // Convert canvas to blob
  return new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob || new Blob())
    }, "image/png")
  })
}

export const generateFormattedText = (formData: FormData, boldFields: string[]): string => {
  let text = ""
  const line1 = getLocalStorage("vikramSamvatLine1", "વિક્રમ સંવત ૨૦૮૧ , ઉત્તરાયણ , વસંત ઋતુ , શાલિવાહન શકે ૧૯૪૬")
  const line2 = getLocalStorage("vikramSamvatLine2", "ક્રોધીનામ - અનલ નામ સંવત્સર")

  const bold = (str: string) => `*${str}*`

  // Add header - centered
  text += bold("|| શ્રી ગણેશાય નમઃ ||") + "\n\n"
  text += bold("દૈનિક પંચાંગ") + "\n"
  text += "............................\n\n"
  text += line1
  text += "\n"
  text += line2
  text += "\n"
  text += "............................\n"

  // Rest of the function remains the same
  // Add tithi and date
  text += `- ${boldFields.includes("tithi") ? bold(`તિથિ - ${formData.tithi}`) : `તિથિ - ${formData.tithi}`}\n`
  text += `- ${boldFields.includes("tarikh") ? bold(`તા . ${formData.tarikh}`) : `તા . ${formData.tarikh}`}\n`
  text += "............................\n"

  // Add nakshatra, yog, karan
  text += `- ${boldFields.includes("nakshatra") ? bold(`નક્ષત્ર - ${formData.nakshatra}`) : `નક્ષત્ર - ${formData.nakshatra}`}\n`
  text += `- ${boldFields.includes("yog") ? bold(`યોગ - ${formData.yog}`) : `યોગ - ${formData.yog}`}\n`
  text += `- ${boldFields.includes("karan") ? bold(`કરણ - ${formData.karan}`) : `કરણ - ${formData.karan}`}\n`
  text += "............................\n"

  // Add sunrise and sunset
  text += `- ${boldFields.includes("suryoday") ? bold(`સૂર્યોદય - ${formData.suryoday} કલાકે`) : `સૂર્યોદય - ${formData.suryoday} કલાકે`} \n`
  text += `- ${boldFields.includes("suryasta") ? bold(`સૂર્યાસ્ત - ${formData.suryasta} કલાકે`) : `સૂર્યાસ્ત - ${formData.suryasta} કલાકે`} \n`
  text += "............................\n"

  // Add rashi
  text += `- ${boldFields.includes("aajNiRashi") ? bold(`આજ ની રાશી: ${formData.aajNiRashi}`) : `આજ ની રાશી: ${formData.aajNiRashi}`}\n`

  text += "............................\n"
  text += "\n"
  // Add din mahima - centered
  text += bold("આજ નો દિન મહિમા") + "\n"

  // Add din mahima items
  formData.dinMahima.forEach((item: string) => {
    if (item.trim()) {
      text += `- ${item}\n`
    }
  })

  return text
}

// New function to extract data from image using Tesseract.js
export const extractDataFromImage = async (imageUrl: string) => {
  // Dynamically import Tesseract.js
  const { createWorker } = await import("tesseract.js")

  // Create a worker with Gujarati language support
  const worker = await createWorker("guj")

  try {
    // Recognize text from the image
    const {
      data: { text },
    } = await worker.recognize(imageUrl)

    // Log the extracted text for debugging
    console.log("Extracted text:", text)

    // Parse the extracted text to populate form fields
    const extractedData = parseExtractedText(text)

    return extractedData
  } finally {
    // Always terminate the worker when done
    await worker.terminate()
  }
}

// Improved helper function to parse the extracted text
const parseExtractedText = (text: string) => {
  // Initialize extracted data object
  const extractedData: any = {
    dinMahima: [],
  }

  // Split text into lines and clean them
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line)

  console.log("Parsed lines:", lines)

  // Extract tithi - look for lines with tithi-related terms
  const tithiMatch = lines.find(
    (line) =>
      line.includes("તિથિ") ||
      line.match(/ફાગણ|ચૈત્ર|વૈશાખ|જ્યેષ્ઠ|અષાઢ|શ્રાવણ|ભાદરવો|આસો|કારતક|માગશર|પોષ|મહા/) ||
      (line.match(/વદ|સુદ/) && line.match(/સોમ|મંગળ|બુધ|ગુરુ|શુક્ર|શનિ|રવિ/)),
  )

  if (tithiMatch) {
    extractedData.tithi = tithiMatch
      .replace(/^[-•\s]+/, "")
      .trim()
      .replace(/"/g, "")
  }

  // Extract date (tarikh) - look for lines with date patterns
  const tarikhLines = lines.filter(
    (line) =>
      line.includes("તા") ||
      line.match(/\d{1,2}[_/\-.]\d{1,2}[_/\-.]\d{2,4}/) ||
      line.match(/[૦-૯]{1,2}[_/\-.][૦-૯]{1,2}[_/\-.][૦-૯]{2,4}/),
  )

  if (tarikhLines.length > 0) {
    // Try to find the most likely date line
    for (const line of tarikhLines) {
      // Look for Gujarati or English numerals in date format
      const dateMatch = line.match(/[૦-૯0-9]{1,2}[_/\-.][૦-૯0-9]{1,2}[_/\-.][૦-૯0-9]{2,4}/)
      if (dateMatch) {
        extractedData.tarikh = dateMatch[0]
        break
      }
    }
  }

  // Extract nakshatra
  const nakshatraLine = lines.find(
    (line) =>
      line.includes("નક્ષત્ર") ||
      (line.includes("-") &&
        line.match(
          /હસ્ત|ચિત્રા|સ્વાતિ|વિશાખા|અનુરાધા|જ્યેષ્ઠા|મૂળ|પૂર્વાષાઢા|ઉત્તરાષાઢા|શ્રવણ|ધનિષ્ઠા|શતભિષા|પૂર્વાભાદ્રપદ|ઉત્તરાભાદ્રપદ|રેવતી|અશ્વિની|ભરણી|કૃત્તિકા|રોહિણી|મૃગશીર્ષ|આર્દ્રા|પુનર્વસુ|પુષ્ય|આશ્લેષા|મઘા|પૂર્વાફાલ્ગુની|ઉત્તરાફાલ્ગુની/,
        )),
  )

  if (nakshatraLine) {
    const parts = nakshatraLine.split("-")
    if (parts.length > 1) {
      extractedData.nakshatra = parts[parts.length - 1].trim()
    }
  }

  // Extract yog
  const yogLine = lines.find(
    (line) =>
      line.includes("યોગ") ||
      (line.includes("-") &&
        line.match(
          /વિષ્કુંભ|પ્રીતિ|આયુષ્માન|સૌભાગ્ય|શોભન|અતિગંડ|સુકર્મા|ધૃતિ|શૂલ|ગંડ|વૃદ્ધિ|ધ્રુવ|વ્યાઘાત|હર્ષણ|વજ્ર|સિદ્ધિ|વ્યતીપાત|વરીયાન|પરિઘ|શિવ|સિદ્ધ|સાધ્ય|શુભ|શુક્લ|બ્રહ્મ|ઐન્દ્ર|વૈધૃતિ/,
        )),
  )

  if (yogLine) {
    const parts = yogLine.split("-")
    if (parts.length > 1) {
      extractedData.yog = parts[parts.length - 1].trim()
    }
  }

  // Extract karan
  const karanLine = lines.find(
    (line) =>
      line.includes("કરણ") ||
      (line.includes("-") && line.match(/બવ|બાલવ|કૌલવ|તૈતિલ|ગર|વણિજ|વિષ્ટિ|શકુનિ|ચતુષ્પદ|નાગ|કિંસ્તુઘ્ન/)),
  )

  if (karanLine) {
    const parts = karanLine.split("-")
    if (parts.length > 1) {
      extractedData.karan = parts[parts.length - 1].trim()
    }
  }

  // Extract sunrise - look for lines with sunrise time
  const suryodayLine = lines.find((line) => line.includes("સૂર્યોદય") || line.match(/ઉદય/))

  if (suryodayLine) {
    // Look for time pattern like 6/47 or ૬/૪૭
    const timeMatch = suryodayLine.match(/[૦-૯0-9]{1,2}\/[૦-૯0-9]{1,2}/)
    if (timeMatch) {
      extractedData.suryoday = timeMatch[0]
    } else {
      // If no direct match, try to extract numbers
      const numbers = suryodayLine.match(/[૦-૯0-9]{1,2}/g)
      if (numbers && numbers.length >= 2) {
        extractedData.suryoday = `${numbers[0]}/${numbers[1]}`
      }
    }
  }

  // Extract sunset - look for lines with sunset time
  const suryastaLine = lines.find((line) => line.includes("સૂર્યાસ્ત") || line.match(/અસ્ત/))

  if (suryastaLine) {
    // Look for time pattern like 6/49 or ૬/૪૯
    const timeMatch = suryastaLine.match(/[૦-૯0-9]{1,2}\/[૦-૯0-9]{1,2}/)
    if (timeMatch) {
      extractedData.suryasta = timeMatch[0]
    } else {
      // If no direct match, try to extract numbers
      const numbers = suryastaLine.match(/[૦-૯0-9]{1,2}/g)
      if (numbers && numbers.length >= 2) {
        extractedData.suryasta = `${numbers[0]}/${numbers[1]}`
      }
    }
  }

  // Extract rashi - look for lines with rashi information
  const rashiLine = lines.find(
    (line) => line.includes("રાશી") || line.match(/મેષ|વૃષભ|મિથુન|કર્ક|સિંહ|કન્યા|તુલા|વૃશ્ચિક|ધન|મકર|કુંભ|મીન/),
  )

  if (rashiLine) {
    // Try to extract the rashi name
    const rashiMatch = rashiLine.match(/મેષ|વૃષભ|મિથુન|કર્ક|સિંહ|કન્યા|તુલા|વૃશ્ચિક|ધન|મકર|કુંભ|મીન/)
    if (rashiMatch) {
      extractedData.aajNiRashi = rashiMatch[0]
    } else {
      // If no direct match, try to extract after "રાશી"
      const parts = rashiLine.split(/રાશી[.…\s]*/)
      if (parts.length > 1) {
        extractedData.aajNiRashi = parts[1].trim().replace(/\.$/, "")
      }
    }
  }

  // Extract din mahima items - look for the section and all items
  const dinMahimaStarted = false
  const dinMahimaItems = []

  // First find the din mahima header
  const dinMahimaHeaderIndex = lines.findIndex(
    (line) => line.includes("આજ નો દિન મહિમા") || line.includes("આજનો દિન મહિમા"),
  )

  if (dinMahimaHeaderIndex !== -1) {
    // Process all lines after the header
    for (let i = dinMahimaHeaderIndex + 1; i < lines.length; i++) {
      const line = lines[i]

      // Check if this is a din mahima item (starts with bullet/dash and contains "આજે")
      if (line.match(/^[-•\s]/) || line.includes("આજે")) {
        dinMahimaItems.push(
          line
            .replace(/^[-•\s]+/, "")
            .trim()
            .replace(/"/g, ""),
        )
      }
      // If we hit another section header, stop processing
      else if (line.match(/^[.]{5,}/) || line.match(/^={5,}/)) {
        break
      }
    }
  }

  // If we found din mahima items, add them
  if (dinMahimaItems.length > 0) {
    extractedData.dinMahima = dinMahimaItems
  } else {
    // If no din mahima items were found, add an empty one
    extractedData.dinMahima = [""]
  }

  // Clean up any quotation marks from all extracted fields
  Object.keys(extractedData).forEach((key) => {
    if (typeof extractedData[key] === "string") {
      extractedData[key] = extractedData[key].replace(/"/g, "")
    } else if (Array.isArray(extractedData[key])) {
      extractedData[key] = extractedData[key].map((item) => (typeof item === "string" ? item.replace(/"/g, "") : item))
    }
  })

  console.log("Extracted data:", extractedData)

  return extractedData
}
