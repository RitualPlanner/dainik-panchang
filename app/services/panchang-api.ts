// This service fetches Panchang data from an API
// For demonstration, we'll use a mock implementation that returns realistic data

import { convertToGujaratiNumerals } from "../utils/date-utils"

export type PanchangData = {
  tithi: string
  nakshatra: string
  yog: string
  karan: string
  suryoday: string
  suryasta: string
  aajNiRashi: string
  dinMahima: string[]
}

// Gujarati month names
const gujaratiMonths = [
  "જાન્યુઆરી",
  "ફેબ્રુઆરી",
  "માર્ચ",
  "એપ્રિલ",
  "મે",
  "જૂન",
  "જુલાઈ",
  "ઓગસ્ટ",
  "સપ્ટેમ્બર",
  "ઓક્ટોબર",
  "નવેમ્બર",
  "ડિસેમ્બર",
]

// Gujarati weekday names
const gujaratiWeekdays = ["રવિવાર", "સોમવાર", "મંગળવાર", "બુધવાર", "ગુરુવાર", "શુક્રવાર", "શનિવાર"]

// Nakshatra list
const nakshatras = [
  "અશ્વિની",
  "ભરણી",
  "કૃત્તિકા",
  "રોહિણી",
  "મૃગશીર્ષ",
  "આર્દ્રા",
  "પુનર્વસુ",
  "પુષ્ય",
  "આશ્લેષા",
  "મઘા",
  "પૂર્વાફાલ્ગુની",
  "ઉત્તરાફાલ્ગુની",
  "હસ્ત",
  "ચિત્રા",
  "સ્વાતિ",
  "વિશાખા",
  "અનુરાધા",
  "જ્યેષ્ઠા",
  "મૂળ",
  "પૂર્વાષાઢા",
  "ઉત્તરાષાઢા",
  "શ્રવણ",
  "ધનિષ્ઠા",
  "શતભિષા",
  "પૂર્વાભાદ્રપદ",
  "ઉત્તરાભાદ્રપદ",
  "રેવતી",
]

// Yog list
const yogs = [
  "વિષ્કુંભ",
  "પ્રીતિ",
  "આયુષ્માન",
  "સૌભાગ્ય",
  "શોભન",
  "અતિગંડ",
  "સુકર્મા",
  "ધૃતિ",
  "શૂલ",
  "ગંડ",
  "વૃદ્ધિ",
  "ધ્રુવ",
  "વ્યાઘાત",
  "હર્ષણ",
  "વજ્ર",
  "સિદ્ધિ",
  "વ્યતીપાત",
  "વરીયાન",
  "પરિઘ",
  "શિવ",
  "સિદ્ધ",
  "સાધ્ય",
  "શુભ",
  "શુક્લ",
  "બ્રહ્મ",
  "ઐન્દ્ર",
  "વૈધૃતિ",
]

// Karan list
const karans = ["બવ", "બાલવ", "કૌલવ", "તૈતિલ", "ગર", "વણિજ", "વિષ્ટિ", "શકુનિ", "ચતુષ્પદ", "નાગ", "કિંસ્તુઘ્ન"]

// Rashi list
const rashis = ["મેષ", "વૃષભ", "મિથુન", "કર્ક", "સિંહ", "કન્યા", "તુલા", "વૃશ્ચિક", "ધન", "મકર", "કુંભ", "મીન"]

// Tithi list
const tithis = [
  "પ્રતિપદા",
  "દ્વિતીયા",
  "તૃતીયા",
  "ચતુર્થી",
  "પંચમી",
  "ષષ્ઠી",
  "સપ્તમી",
  "અષ્ટમી",
  "નવમી",
  "દશમી",
  "એકાદશી",
  "દ્વાદશી",
  "ત્રયોદશી",
  "ચતુર્દશી",
  "પૂર્ણિમા",
  "અમાવસ્યા",
]

// Din Mahima templates
const dinMahimaTemplates = [
  [
    "આજે ભગવાન ગણેશની પૂજા કરવાથી વિશેષ લાભ થાય છે.",
    "આજે ભગવાન શિવની આરાધના કરવી શુભ છે.",
    "આજે સૂર્ય નમસ્કાર કરવાથી આરોગ્ય સારું રહેશે.",
  ],
  ["આજે હનુમાનજીની પૂજા કરવાથી શક્તિ અને સાહસ વધે છે.", "આજે ગાયત્રી મંત્રનો જાપ કરવો શુભ છે.", "આજે દાન-પુણ્ય કરવાથી વિશેષ ફળ મળે છે."],
  [
    "આજે માતા લક્ષ્મીની પૂજા કરવાથી ધન-સમૃદ્ધિ વધે છે.",
    "આજે સત્સંગ અને ધાર્મિક વાંચન કરવું શુભ છે.",
    "આજે ગરીબોને અન્નદાન કરવાથી પુણ્ય મળે છે.",
  ],
  ["આજે સરસ્વતી દેવીની પૂજા કરવાથી વિદ્યા અને જ્ઞાન વધે છે.", "આજે તુલસી પૂજન કરવાથી આરોગ્ય સારું રહે છે.", "આજે પિતૃઓને તર્પણ આપવું શુભ છે."],
  [
    "આજે ભગવાન વિષ્ણુની પૂજા કરવાથી સુખ-શાંતિ મળે છે.",
    "આજે રુદ્રાભિષેક કરવાથી નકારાત્મક ઊર્જા દૂર થાય છે.",
    "આજે તુલસી અને ચંદનનું સેવન કરવું શુભ છે.",
  ],
]

// Generate random time in Gujarati format (HH:MM)
function getRandomTime(minHour: number, maxHour: number): string {
  const hour = Math.floor(Math.random() * (maxHour - minHour + 1)) + minHour
  const minute = Math.floor(Math.random() * 60)
  return convertToGujaratiNumerals(`${hour}:${minute.toString().padStart(2, "0")}`)
}

// Get random items from an array
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Mock API call to fetch Panchang data for a specific date
export async function fetchPanchangData(date?: Date): Promise<PanchangData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const targetDate = date || new Date()
  const day = targetDate.getDate()
  const month = targetDate.getMonth()
  const year = targetDate.getFullYear()
  const weekday = targetDate.getDay()

  // Use deterministic "random" values based on the date, month, year
  const dateHash = day + month * 31 + year
  const tithiIndex = dateHash % tithis.length
  const nakshatraIndex = (dateHash + 3) % nakshatras.length
  const yogIndex = (dateHash + 5) % yogs.length
  const karanIndex = (dateHash + 7) % karans.length
  const rashiIndex = (dateHash + 9) % rashis.length

  // Generate time based on season and latitude (for Indian Standard Time)
  // Winter: sunrise 6:30-7:00, sunset 17:30-18:00
  // Spring/Summer: sunrise 5:30-6:30, sunset 18:00-19:00
  // Autumn: sunrise 6:00-6:30, sunset 17:30-18:00
  
  let sunriseHour = 6, sunsetHour = 18
  if (month === 11 || month === 0 || month === 1) {
    // Winter months - later sunrise, earlier sunset
    sunriseHour = 6
    sunsetHour = 17
  } else if (month === 4 || month === 5) {
    // Summer months - earlier sunrise, later sunset
    sunriseHour = 5
    sunsetHour = 19
  }

  const sunrise = getRandomTime(sunriseHour, sunriseHour + 1)
  const sunset = getRandomTime(sunsetHour, sunsetHour + 1)

  // Select a random din mahima template based on the weekday
  const dinMahimaTemplate = dinMahimaTemplates[weekday % dinMahimaTemplates.length]

  // Construct the Panchang data with date-specific logic
  const panchangData: PanchangData = {
    tithi: `${tithis[tithiIndex]} ${day % 2 === 0 ? "શુક્લ પક્ષ" : "કૃષ્ણ પક્ષ"}`,
    nakshatra: nakshatras[nakshatraIndex],
    yog: yogs[yogIndex],
    karan: karans[karanIndex],
    suryoday: sunrise,
    suryasta: sunset,
    aajNiRashi: rashis[rashiIndex],
    dinMahima: dinMahimaTemplate,
  }

  return panchangData
}
