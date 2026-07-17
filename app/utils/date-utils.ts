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
