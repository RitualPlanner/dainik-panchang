"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon } from "lucide-react"
import { convertToGujaratiNumerals } from "../utils/date-utils"

interface CalendarPickerProps {
  value: string
  onChange: (value: string) => void
}

export function CalendarPicker({ value, onChange }: CalendarPickerProps) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

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
        <Button variant="outline" className="w-full flex justify-between items-center">
          <span>{value || "તારીખ પસંદ કરો"}</span>
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>તારીખ પસંદ કરો</DialogTitle>
        </DialogHeader>
        <Calendar mode="single" selected={date} onSelect={handleSelect} className="rounded-md border" />
      </DialogContent>
    </Dialog>
  )
}
