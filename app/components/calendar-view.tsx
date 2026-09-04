"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { useLanguage } from "../contexts/language-context";
import { convertToGujaratiNumerals } from "../utils/date-utils";
import { festivals } from "../data/festivals";
import { fetchPanchangData } from "../services/panchang-api";
import { useScreenSize } from "../utils/responsive-utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define calendar day type
interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasFestival: boolean;
  festivalName?: string;
  festivalType?: "major" | "minor";
  panchangData?: any;
}

export function CalendarView() {
  const { language, t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDayData, setSelectedDayData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const screenSize = useScreenSize();

  // Month names in different languages
  const monthNames = {
    gu: [
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
    ],
    hi: [
      "जनवरी",
      "फरवरी",
      "मार्च",
      "अप्रैल",
      "मई",
      "जून",
      "जुलाई",
      "अगस्त",
      "सितंबर",
      "अक्टूबर",
      "नवंबर",
      "दिसंबर",
    ],
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };

  // Day names in different languages
  const dayNames = {
    gu: ["રવિ", "સોમ", "મંગળ", "બુધ", "ગુરુ", "શુક્ર", "શનિ"],
    hi: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  };

  // Generate calendar days for the current month
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of the month
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay();

    // Get last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Get days from previous month to fill the first week
    const daysFromPrevMonth = firstDayOfWeek;

    // Get days from next month to fill the last week
    const daysInLastWeek = 7 - ((daysFromPrevMonth + daysInMonth) % 7);
    const daysFromNextMonth = daysInLastWeek === 7 ? 0 : daysInLastWeek;

    // Generate calendar days
    const days: CalendarDay[] = [];

    // Add days from previous month
    const prevMonth = new Date(year, month - 1, 1);
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    for (
      let i = daysInPrevMonth - daysFromPrevMonth + 1;
      i <= daysInPrevMonth;
      i++
    ) {
      const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
        hasFestival: hasFestivalOnDate(date),
        ...getFestivalInfo(date),
      });
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isSameDay(date, new Date()),
        hasFestival: hasFestivalOnDate(date),
        ...getFestivalInfo(date),
      });
    }

    // Add days from next month
    const nextMonth = new Date(year, month + 1, 1);

    for (let i = 1; i <= daysFromNextMonth; i++) {
      const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
        hasFestival: hasFestivalOnDate(date),
        ...getFestivalInfo(date),
      });
    }

    setCalendarDays(days);
  }, [currentDate]);

  // Check if a date has a festival
  function hasFestivalOnDate(date: Date): boolean {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const dateString = `${day}/${month}`;

    return festivals.some((festival) => festival.date === dateString);
  }

  // Get festival info for a date
  function getFestivalInfo(date: Date): {
    festivalName?: string;
    festivalType?: "major" | "minor";
  } {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const dateString = `${day}/${month}`;

    const festival = festivals.find((f) => f.date === dateString);

    if (festival) {
      return {
        festivalName: festival.name,
        festivalType: festival.type,
      };
    }

    return {};
  }

  // Check if two dates are the same day
  function isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  // Navigate to previous month
  const goToPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Handle day selection
  const handleSelectDay = async (day: CalendarDay) => {
    setSelectedDate(day.date);
    setIsLoading(true);

    try {
      // Fetch panchang data for the selected date
      const data = await fetchPanchangData(day.date);
      setSelectedDayData({
        ...data,
        date: day.date,
        festival: day.hasFestival
          ? {
              name: day.festivalName,
              type: day.festivalType,
            }
          : null,
      });
    } catch (error) {
      console.error("Error fetching data for selected date:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date based on language
  const formatDate = (date: Date): string => {
    if (language === "gu") {
      return `${convertToGujaratiNumerals(date.getDate().toString())} ${monthNames.gu[date.getMonth()]}, ${convertToGujaratiNumerals(date.getFullYear().toString())}`;
    } else if (language === "hi") {
      return `${date.getDate()} ${monthNames.hi[date.getMonth()]}, ${date.getFullYear()}`;
    } else {
      return `${date.getDate()} ${monthNames.en[date.getMonth()]}, ${date.getFullYear()}`;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={goToPrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle>
              {
                monthNames[language as keyof typeof monthNames][
                  currentDate.getMonth()
                ]
              }{" "}
              {language === "gu"
                ? convertToGujaratiNumerals(
                    currentDate.getFullYear().toString()
                  )
                : currentDate.getFullYear()}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day names */}
          <div className="grid grid-cols-7 mb-2">
            {dayNames[language as keyof typeof dayNames].map((day, index) => (
              <div key={index} className="text-center text-sm font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`
                  aspect-square p-1 relative rounded-md cursor-pointer
                  ${day.isCurrentMonth ? "bg-card" : "bg-muted text-muted-foreground"}
                  ${day.isToday ? "border-2 border-primary" : ""}
                  ${selectedDate && isSameDay(day.date, selectedDate) ? "bg-primary/20" : ""}
                  hover:bg-primary/10 transition-colors
                `}
                onClick={() => handleSelectDay(day)}
              >
                <div className="text-center">
                  {language === "gu"
                    ? convertToGujaratiNumerals(day.date.getDate().toString())
                    : day.date.getDate()}
                </div>

                {day.hasFestival && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`
                          absolute bottom-1 right-1 w-2 h-2 rounded-full
                          ${day.festivalType === "major" ? "bg-primary" : "bg-secondary"}
                        `}
                        ></div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{day.festivalName}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected day details */}
      {selectedDate && selectedDayData && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <CalendarIcon className="h-5 w-5 mr-2" />
              {formatDate(selectedDate)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {selectedDayData.festival && (
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">
                    {language === "gu"
                      ? "તહેવાર:"
                      : language === "hi"
                        ? "त्योहार:"
                        : "Festival:"}
                  </h3>
                  <p>{selectedDayData.festival.name}</p>
                </div>
                <Badge
                  variant={
                    selectedDayData.festival.type === "major"
                      ? "default"
                      : "outline"
                  }
                >
                  {selectedDayData.festival.type === "major"
                    ? language === "gu"
                      ? "મુખ્ય"
                      : language === "hi"
                        ? "प्रमुख"
                        : "Major"
                    : language === "gu"
                      ? "નાનો"
                      : language === "hi"
                        ? "छोटा"
                        : "Minor"}
                </Badge>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <h3 className="text-sm font-medium">{t("tithi")}</h3>
                <p>{selectedDayData.tithi}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">{t("nakshatra")}</h3>
                <p>{selectedDayData.nakshatra}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">{t("yog")}</h3>
                <p>{selectedDayData.yog}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">{t("karan")}</h3>
                <p>{selectedDayData.karan}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">{t("suryoday")}</h3>
                <p>{selectedDayData.suryoday}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">{t("suryasta")}</h3>
                <p>{selectedDayData.suryasta}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium">{t("aajNiRashi")}</h3>
              <p>{selectedDayData.aajNiRashi}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium">{t("dinMahima")}</h3>
              <ul className="list-disc pl-5 space-y-1">
                {selectedDayData.dinMahima.map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>

            <div className="flex justify-end mt-4">
              <Button size="sm">
                {language === "gu"
                  ? "આ તારીખ માટે પંચાંગ જનરેટ કરો"
                  : language === "hi"
                    ? "इस तारीख के लिए पंचांग जनरेट करें"
                    : "Generate Panchang for this date"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
