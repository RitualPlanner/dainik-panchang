"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Bell, Share2, Repeat, Trash2 } from "lucide-react";
import { useLanguage } from "@/app/contexts/language-context";
import { useScreenSize } from "@/app/utils/responsive-utils";

type ScheduleFrequency = "once" | "daily" | "weekly" | "monthly";
type ScheduleAction = "generate" | "share" | "notify";

interface ScheduleItem {
  id: string;
  name: string;
  frequency: ScheduleFrequency;
  action: ScheduleAction;
  startDate: Date;
  time: string;
  recipients?: string[];
  isActive: boolean;
  lastRun?: Date;
}

export function ScheduleAutomation() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"schedules" | "create">(
    "schedules"
  );
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    {
      id: "s1",
      name: "Daily Morning Panchang",
      frequency: "daily",
      action: "generate",
      startDate: new Date(),
      time: "06:00",
      isActive: true,
      lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      id: "s2",
      name: "Weekly Family Share",
      frequency: "weekly",
      action: "share",
      startDate: new Date(),
      time: "08:00",
      recipients: ["family@example.com"],
      isActive: true,
      lastRun: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  ]);

  const [newSchedule, setNewSchedule] = useState<
    Omit<ScheduleItem, "id" | "lastRun">
  >({
    name: "",
    frequency: "daily",
    action: "generate",
    startDate: new Date(),
    time: "08:00",
    recipients: [],
    isActive: true,
  });

  const screenSize = useScreenSize();

  const handleCreateSchedule = () => {
    const id = `s${schedules.length + 1}`;
    setSchedules([...schedules, { ...newSchedule, id }]);

    setNewSchedule({
      name: "",
      frequency: "daily",
      action: "generate",
      startDate: new Date(),
      time: "08:00",
      recipients: [],
      isActive: true,
    });

    setActiveTab("schedules");
  };

  const handleToggleSchedule = (id: string) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === id
          ? { ...schedule, isActive: !schedule.isActive }
          : schedule
      )
    );
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const getFrequencyText = (frequency: ScheduleFrequency): string => {
    switch (frequency) {
      case "once":
        return language === "gu"
          ? "એક વખત"
          : language === "hi"
            ? "एक बार"
            : "Once";
      case "daily":
        return language === "gu"
          ? "દરરોજ"
          : language === "hi"
            ? "दैनिक"
            : "Daily";
      case "weekly":
        return language === "gu"
          ? "સાપ્તાહિક"
          : language === "hi"
            ? "साप्ताहिक"
            : "Weekly";
      case "monthly":
        return language === "gu"
          ? "માસિક"
          : language === "hi"
            ? "मासिक"
            : "Monthly";
      default:
        return frequency;
    }
  };

  const getActionText = (action: ScheduleAction): string => {
    switch (action) {
      case "generate":
        return language === "gu"
          ? "જનરેટ"
          : language === "hi"
            ? "जनरेट"
            : "Generate";
      case "share":
        return language === "gu" ? "શેર" : language === "hi" ? "શેર" : "Share";
      case "notify":
        return language === "gu"
          ? "નોટિફાય"
          : language === "hi"
            ? "नोटिफाई"
            : "Notify";
      default:
        return action;
    }
  };

  const getActionIcon = (action: ScheduleAction) => {
    switch (action) {
      case "generate":
        return <Clock className="h-4 w-4" />;
      case "share":
        return <Share2 className="h-4 w-4" />;
      case "notify":
        return <Bell className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Repeat className="h-4 w-4 mr-2" />
          {language === "gu"
            ? "શેડ્યૂલ અને ઓટોમેશન"
            : language === "hi"
              ? "शेड्यूल और ऑटोमेशन"
              : "Schedule & Automation"}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`${screenSize.isMobile ? "max-w-[95vw]" : "sm:max-w-[600px]"} max-h-[80vh] overflow-y-auto`}
      >
        <DialogHeader>
          <DialogTitle>
            {language === "gu"
              ? "શેડ્યૂલ અને ઓટોમેશન"
              : language === "hi"
                ? "शेड्यूल और ऑटोमेशन"
                : "Schedule & Automation"}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
        >
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="schedules">
              {language === "gu"
                ? "મારા શેડ્યૂલ"
                : language === "hi"
                  ? "मेरे शेड्यूल"
                  : "My Schedules"}
            </TabsTrigger>
            <TabsTrigger value="create">
              {language === "gu"
                ? "નવું શેડ્યૂલ"
                : language === "hi"
                  ? "नया शेड्यूल"
                  : "New Schedule"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedules" className="space-y-4">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="flex items-center justify-between p-4 border rounded-xl"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getActionIcon(schedule.action)}
                    <span className="font-semibold">{schedule.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {getFrequencyText(schedule.frequency)} • {schedule.time}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={schedule.isActive}
                    onCheckedChange={() => handleToggleSchedule(schedule.id)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteSchedule(schedule.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <div className="space-y-2">
              <Label>
                {language === "gu" ? "નામ" : language === "hi" ? "नाम" : "Name"}
              </Label>
              <Input
                value={newSchedule.name}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, name: e.target.value })
                }
                placeholder="Ex: Morning Panchang"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleCreateSchedule}>
                {language === "gu"
                  ? "શેડ્યૂલ સાચવો"
                  : language === "hi"
                    ? "शेड्यूल सुरक्षित करें"
                    : "Save Schedule"}
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
