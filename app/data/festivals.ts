export type Festival = {
  date: string // Format: DD/MM
  name: string
  description: string
  type: "major" | "minor"
}

// This is a simplified list of Hindu festivals for 2025
// In a production app, you would have a more comprehensive database
export const festivals: Festival[] = [
  {
    date: "14/01",
    name: "મકર સંક્રાંતિ",
    description: "સૂર્ય મકર રાશિમાં પ્રવેશ કરે છે",
    type: "major",
  },
  {
    date: "23/01",
    name: "વસંત પંચમી",
    description: "સરસ્વતી દેવીની પૂજા",
    type: "major",
  },
  {
    date: "28/02",
    name: "મહા શિવરાત્રિ",
    description: "ભગવાન શિવની આરાધના",
    type: "major",
  },
  {
    date: "14/03",
    name: "હોળી",
    description: "રંગોનો તહેવાર",
    type: "major",
  },
  {
    date: "14/04",
    name: "ગુડી પડવો",
    description: "હિન્દુ નવું વર્ષ",
    type: "major",
  },
  {
    date: "21/04",
    name: "રામ નવમી",
    description: "ભગવાન રામનો જન્મદિવસ",
    type: "major",
  },
  {
    date: "12/06",
    name: "રથ યાત્રા",
    description: "ભગવાન જગન્નાથની રથ યાત્રા",
    type: "major",
  },
  {
    date: "12/07",
    name: "ગુરુ પૂર્ણિમા",
    description: "ગુરુની પૂજા",
    type: "minor",
  },
  {
    date: "15/08",
    name: "રક્ષાબંધન",
    description: "ભાઈ-બહેનનો પ્રેમ",
    type: "major",
  },
  {
    date: "29/08",
    name: "જન્માષ્ટમી",
    description: "ભગવાન કૃષ્ણનો જન્મદિવસ",
    type: "major",
  },
  {
    date: "08/09",
    name: "ગણેશ ચતુર્થી",
    description: "ભગવાન ગણેશની પૂજા",
    type: "major",
  },
  {
    date: "22/09",
    name: "નવરાત્રિ શરૂ",
    description: "માં દુર્ગાની આરાધના",
    type: "major",
  },
  {
    date: "02/10",
    name: "દશેરા",
    description: "રાવણ વધ",
    type: "major",
  },
  {
    date: "20/10",
    name: "કરવા ચોથ",
    description: "પતિના લાંબા આયુષ્ય માટે ઉપવાસ",
    type: "minor",
  },
  {
    date: "01/11",
    name: "દિવાળી",
    description: "પ્રકાશનો તહેવાર",
    type: "major",
  },
  {
    date: "03/11",
    name: "નૂતન વર્ષ",
    description: "ગુજરાતી નવું વર્ષ",
    type: "major",
  },
  {
    date: "15/11",
    name: "તુલસી વિવાહ",
    description: "તુલસી અને શાલિગ્રામનો વિવાહ",
    type: "minor",
  },
  {
    date: "14/12",
    name: "ધનુ સંક્રાંતિ",
    description: "સૂર્ય ધનુ રાશિમાં પ્રવેશ કરે છે",
    type: "minor",
  },
]

export function getTodaysFestival(): Festival | null {
  const today = new Date()
  const day = String(today.getDate()).padStart(2, "0")
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const todayFormatted = `${day}/${month}`

  return festivals.find((festival) => festival.date === todayFormatted) || null
}

export function getUpcomingFestivals(count = 3): Festival[] {
  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth() + 1

  // Sort festivals by how soon they will occur
  return festivals
    .map((festival) => {
      const [day, month] = festival.date.split("/").map(Number)
      let daysUntil = 0

      // Calculate days until festival
      if (month > currentMonth || (month === currentMonth && day > currentDay)) {
        // Festival is later this year
        const festivalDate = new Date(today.getFullYear(), month - 1, day)
        daysUntil = Math.ceil((festivalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      } else {
        // Festival is next year
        const festivalDate = new Date(today.getFullYear() + 1, month - 1, day)
        daysUntil = Math.ceil((festivalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      }

      return { ...festival, daysUntil }
    })
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, count)
}
