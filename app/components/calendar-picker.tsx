"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon } from "lucide-react"
import { convertToGujaratiNumerals, parseGujaratiDate } from "../utils/date-utils"

interface CalendarPickerProps {
  value: string
  onChange: (value: string) => void
}

export function CalendarPicker({ value, onChange }: CalendarPickerProps) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  // Sync date selection state when picker is opened or value is changed externally
  useEffect(() => {
    if (value) {
      const parsed = parseGujaratiDate(value)
      if (parsed) {
        setDate(parsed)
      }
    }
  }, [value, open])

  const handleSelect = (date: Date | undefined) => {
    if (!date) return

    // Format the date as DD/MM/YYYY
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()

    const formattedDate = `${day}/${month}/${year}`
    const gujaratiDate = convertToGujaratiNumerals(formattedDate)

    onChange(gujaratiDate)
    setDate(date)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full flex justify-between items-center rounded-xl border-amber-200/70 focus-visible:ring-orange-500/50 bg-amber-50/20 hover:bg-amber-50/40 font-medium text-amber-900/90 shadow-none">
          <span>{value || "તારીખ પસંદ કરો"}</span>
          <CalendarIcon className="h-4 w-4 text-orange-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl border border-amber-100 bg-white">
        <DialogHeader>
          <DialogTitle className="text-amber-900 font-bold">તારીખ પસંદ કરો</DialogTitle>
        </DialogHeader>
        <Calendar mode="single" selected={date} onSelect={handleSelect} className="rounded-xl border border-amber-100 p-3 mx-auto" />
      </DialogContent>
    </Dialog>
  )
}
