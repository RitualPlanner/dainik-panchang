"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarDays } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  festivals,
  getTodaysFestival,
  getUpcomingFestivals,
} from "../data/festivals";
import { convertToGujaratiNumerals } from "../utils/date-utils";

export function FestivalCalendar() {
  const [open, setOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const todaysFestival = getTodaysFestival();
  const upcomingFestivals = getUpcomingFestivals(3);

  return (
    <div className="space-y-4">
      {todaysFestival && (
        <Card className="border-2 border-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              આજનો તહેવાર
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{todaysFestival.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {todaysFestival.description}
                </p>
              </div>
              <Badge
                variant={
                  todaysFestival.type === "major" ? "default" : "outline"
                }
              >
                {todaysFestival.type === "major" ? "મુખ્ય" : "નાનો"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center">
        <h3 className="font-medium">આગામી તહેવારો</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <CalendarDays className="h-4 w-4 mr-2" />
              બધા જુઓ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                તહેવાર કેલેન્ડર{" "}
                {convertToGujaratiNumerals(currentYear.toString())}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {festivals.map((festival) => (
                <Card
                  key={festival.date + festival.name}
                  className="overflow-hidden"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-md">{festival.name}</CardTitle>
                      <Badge
                        variant={
                          festival.type === "major" ? "default" : "outline"
                        }
                      >
                        {festival.type === "major" ? "મુખ્ય" : "નાનો"}
                      </Badge>
                    </div>
                    <CardDescription>
                      તારીખ: {convertToGujaratiNumerals(festival.date)}/
                      {convertToGujaratiNumerals(currentYear.toString())}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{festival.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {upcomingFestivals.map((festival) => (
          <Card key={festival.date + festival.name} className="overflow-hidden">
            <CardHeader className="py-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm">{festival.name}</CardTitle>
                <CardDescription className="text-xs">
                  {convertToGujaratiNumerals(festival.date)}/
                  {convertToGujaratiNumerals(currentYear.toString())} (
                  {convertToGujaratiNumerals(festival.daysUntil.toString())}{" "}
                  દિવસ)
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
