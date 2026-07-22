/**
 * Converts English numerals to Gujarati numerals
 */
export function convertToGujaratiNumerals(dateStr: string): string {
  const gujaratiNumerals = ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"]
  return dateStr.replace(/[0-9]/g, (match) => {
    return gujaratiNumerals[Number.parseInt(match)]
  })
}

/**
 * Gets the current date in Gujarati format (DD/MM/YYYY)
 */
export function getCurrentGujaratiDate(): string {
  const today = new Date()
  const day = String(today.getDate()).padStart(2, "0")
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const year = today.getFullYear()

  const dateStr = `${day}/${month}/${year}`
  return convertToGujaratiNumerals(dateStr)
}

/**
 * Converts Gujarati numerals to English numerals
 */
export function convertToEnglishNumerals(dateStr: string): string {
  const gujaratiToEnglishMap: { [key: string]: string } = {
    "૦": "0",
    "૧": "1",
    "૨": "2",
    "૩": "3",
    "૪": "4",
    "૫": "5",
    "૬": "6",
    "૭": "7",
    "૮": "8",
    "૯": "9"
  }
  return dateStr.replace(/[૦-૯]/g, (match) => gujaratiToEnglishMap[match])
}

/**
 * Parses a Gujarati date string (DD/MM/YYYY) into a Date object
 */
export function parseGujaratiDate(dateStr: string): Date | undefined {
  if (!dateStr) return undefined
  const englishDateStr = convertToEnglishNumerals(dateStr)
  const parts = englishDateStr.split("/")
  if (parts.length === 3) {
    const day = Number.parseInt(parts[0], 10)
    const month = Number.parseInt(parts[1], 10) - 1
    const year = Number.parseInt(parts[2], 10)
    const parsedDate = new Date(year, month, day)
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate
    }
  }
  return undefined
}
