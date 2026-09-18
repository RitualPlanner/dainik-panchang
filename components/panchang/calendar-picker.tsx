"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import {
  convertToGujaratiNumerals,
  parseGujaratiDate,
} from "@/app/utils/date-utils";

interface CalendarPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function CalendarPicker({ value, onChange }: CalendarPickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (value) {
      const parsed = parseGujaratiDate(value);
      if (parsed) {
        setDate(parsed);
      }
    }
  }, [value, open]);

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    const day = String(selectedDate.getDate()).padStart(2, "0");
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const year = selectedDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    const gujaratiDate = convertToGujaratiNumerals(formattedDate);

    onChange(gujaratiDate);
    setDate(selectedDate);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex justify-between items-center rounded-xl border border-border bg-background hover:bg-accent font-medium text-foreground shadow-xs transition-all"
        >
          <span>{value || "તારીખ પસંદ કરો"}</span>
          <CalendarIcon className="h-4 w-4 text-orange-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl border border-border bg-card text-card-foreground shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-foreground font-bold">
            તારીખ પસંદ કરો
          </DialogTitle>
        </DialogHeader>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          className="rounded-xl border border-border p-3 mx-auto bg-card text-card-foreground"
        />
      </DialogContent>
    </Dialog>
  );
}
