"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Bell, Share2, Repeat, Trash2 } from "lucide-react"
import { useLanguage } from "../contexts/language-context"
import { useScreenSize } from "../utils/responsive-utils"

// Define schedule types
type ScheduleFrequency = "once" | "daily" | "weekly" | "monthly"
type ScheduleAction = "generate" | "share" | "notify"

interface Schedule {
  id: string
  name: string
  frequency: ScheduleFrequency
  action: ScheduleAction
  startDate: Date
  time: string
  recipients?: string[]
  isActive: boolean
  lastRun?: Date
}

export function ScheduleAutomation() {
  const { language, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"schedules" | "create">("schedules")
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: "s1",
      name: "Daily Morning Panchang",
      frequency: "daily",
      action: "generate",
      startDate: new Date(),
      time: "06:00",
      isActive: true,
      lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
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
      lastRun: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last week
    },
  ])

  // New schedule form state
  const [newSchedule, setNewSchedule] = useState<Omit<Schedule, "id" | "lastRun">>({
    name: "",
    frequency: "daily",
    action: "generate",
    startDate: new Date(),
    time: "08:00",
    recipients: [],
    isActive: true,
  })

  const screenSize = useScreenSize()

  const handleCreateSchedule = () => {
    const id = `s${schedules.length + 1}`
    setSchedules([...schedules, { ...newSchedule, id }])

    // Reset form
    setNewSchedule({
      name: "",
      frequency: "daily",
      action: "generate",
      startDate: new Date(),
      time: "08:00",
      recipients: [],
      isActive: true,
    })

    setActiveTab("schedules")
  }

  const handleToggleSchedule = (id: string) => {
    setSchedules(
      schedules.map((schedule) => (schedule.id === id ? { ...schedule, isActive: !schedule.isActive } : schedule)),
    )
  }

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id))
  }

  const getFrequencyText = (frequency: ScheduleFrequency): string => {
    switch (frequency) {
      case "once":
        return language === "gu" ? "એક વખત" : language === "hi" ? "एक बार" : "Once"
      case "daily":
        return language === "gu" ? "દરરોજ" : language === "hi" ? "दैनिक" : "Daily"
      case "weekly":
        return language === "gu" ? "સાપ્તાહિક" : language === "hi" ? "साप्ताहिक" : "Weekly"
      case "monthly":
        return language === "gu" ? "માસિક" : language === "hi" ? "मासिक" : "Monthly"
      default:
        return frequency
    }
  }

  const getActionText = (action: ScheduleAction): string => {
    switch (action) {
      case "generate":
        return language === "gu" ? "જનરેટ" : language === "hi" ? "जनरेट" : "Generate"
      case "share":
        return language === "gu" ? "શેર" : language === "hi" ? "शेयर" : "Share"
      case "notify":
        return language === "gu" ? "નોટિફાય" : language === "hi" ? "नोटिफाई" : "Notify"
      default:
        return action
    }
  }

  const getActionIcon = (action: ScheduleAction) => {
    switch (action) {
      case "generate":
        return <Clock className="h-4 w-4" />
      case "share":
        return <Share2 className="h-4 w-4" />
      case "notify":
        return <Bell className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Repeat className="h-4 w-4 mr-2" />
          {language === "gu" ? "શેડ્યૂલ અને ઓટોમેશન" : language === "hi" ? "शेड्यूल और ऑटोमेशन" : "Schedule & Automation"}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`${screenSize.isMobile ? "max-w-[95vw]" : "sm:max-w-[600px]"} max-h-[80vh] overflow-y-auto`}
      >
        <DialogHeader>
          <DialogTitle>
            {language === "gu" ? "શેડ્યૂલ અને ઓટોમેશન" : language === "hi" ? "शेड्यूल और ऑटोमेशन" : "Schedule & Automation"}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="schedules">
              <Clock className="h-4 w-4 mr-2" />
              {language === "gu" ? "મારા શેડ્યૂલ" : language === "hi" ? "मेरे शेड्यूल" : "My Schedules"}
            </TabsTrigger>
            <TabsTrigger value="create">
              <Plus className="h-4 w-4 mr-2" />
              {language === "gu" ? "નવું બનાવો" : language === "hi" ? "नया बनाएं" : "Create New"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedules" className="space-y-4">
            {schedules.length > 0 ? (
              schedules.map((schedule) => (
                <div key={schedule.id} className={`border rounded-lg p-4 ${!schedule.isActive ? "opacity-60" : ""}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{schedule.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Repeat className="h-3 w-3 mr-1" />
                        {getFrequencyText(schedule.frequency)}
                        <span className="mx-1">•</span>
                        {getActionIcon(schedule.action)}
                        <span className="ml-1">{getActionText(schedule.action)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={schedule.isActive} onCheckedChange={() => handleToggleSchedule(schedule.id)} />
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteSchedule(schedule.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        {language === "gu" ? "સમય:" : language === "hi" ? "समय:" : "Time:"}
                      </span>
                      <span className="ml-1 font-medium">{schedule.time}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        {language === "gu" ? "શરૂઆત:" : language === "hi" ? "शुरुआत:" : "Start:"}
                      </span>
                      <span className="ml-1 font-medium">{schedule.startDate.toLocaleDateString()}</span>
                    </div>
                  </div>

                  {schedule.lastRun && (
                    <div className="text-xs text-muted-foreground mt-2">
                      {language === "gu"
                        ? `છેલ્લે ચલાવ્યું: ${schedule.lastRun.toLocaleString()}`
                        : language === "hi"
                          ? `आखिरी बार चलाया गया: ${schedule.lastRun.toLocaleString()}`
                          : `Last run: ${schedule.lastRun.toLocaleString()}`}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {language === "gu"
                  ? "તમારી પાસે હજી સુધી કોઈ શેડ્યૂલ નથી."
                  : language === "hi"
                    ? "आपके पास अभी तक कोई शेड्यूल नहीं है।"
                    : "You don't have any schedules yet."}
              </div>
            )}

            {schedules.length > 0 && (
              <div className="text-xs text-muted-foreground mt-4">
                <p>
                  {language === "gu"
                    ? "નોંધ: શેડ્યૂલ ચલાવવા માટે તમારે લૉગ ઇન હોવું જરૂરી છે અને તમારું બ્રાઉઝર ખુલ્લું હોવું જોઈએ."
                    : language === "hi"
                      ? "नोट: शेड्यूल चलाने के लिए आपको लॉग इन होना चाहिए और आपका ब्राउज़र खुला होना चाहिए।"
                      : "Note: You need to be logged in and have your browser open for schedules to run."}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schedule-name">
                {language === "gu" ? "શેડ્યૂલનું નામ" : language === "hi" ? "शेड्यूल का नाम" : "Schedule Name"}
              </Label>
              <Input
                id="schedule-name"
                value={newSchedule.name}
                onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
                placeholder={
                  language === "gu"
                    ? "દૈનિક સવારનું પંચાંગ"
                    : language === "hi"
                      ? "दैनिक सुबह का पंचांग"
                      : "Daily Morning Panchang"
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frequency">
                  {language === "gu" ? "આવૃત્તિ" : language === "hi" ? "आवृत्ति" : "Frequency"}
                </Label>
                <select
                  id="frequency"
                  className="w-full p-2 border rounded-md"
                  value={newSchedule.frequency}
                  onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      frequency: e.target.value as ScheduleFrequency,
                    })
                  }
                >
                  <option value="once">{language === "gu" ? "એક વખત" : language === "hi" ? "एक बार" : "Once"}</option>
                  <option value="daily">{language === "gu" ? "દરરોજ" : language === "hi" ? "दैनिक" : "Daily"}</option>
                  <option value="weekly">
                    {language === "gu" ? "સાપ્તાહિક" : language === "hi" ? "साप्ताहिक" : "Weekly"}
                  </option>
                  <option value="monthly">
                    {language === "gu" ? "માસિક" : language === "hi" ? "मासिक" : "Monthly"}
                  </option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="action">{language === "gu" ? "ક્રિયા" : language === "hi" ? "क्रिया" : "Action"}</Label>
                <select
                  id="action"
                  className="w-full p-2 border rounded-md"
                  value={newSchedule.action}
                  onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      action: e.target.value as ScheduleAction,
                    })
                  }
                >
                  <option value="generate">
                    {language === "gu" ? "પંચાંગ જનરેટ કરો" : language === "hi" ? "पंचांग जनरेट करें" : "Generate Panchang"}
                  </option>
                  <option value="share">
                    {language === "gu" ? "પંચાંગ શેર કરો" : language === "hi" ? "पंचांग शेयर करें" : "Share Panchang"}
                  </option>
                  <option value="notify">
                    {language === "gu" ? "નોટિફિકેશન મોકલો" : language === "hi" ? "नोटिफिकेशन भेजें" : "Send Notification"}
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{language === "gu" ? "શરૂઆત તારીખ" : language === "hi" ? "शुरुआत तारीख" : "Start Date"}</Label>
                <div className="border rounded-md p-2">
                  <Calendar
                    mode="single"
                    selected={newSchedule.startDate}
                    onSelect={(date) => date && setNewSchedule({ ...newSchedule, startDate: date })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">{language === "gu" ? "સમય" : language === "hi" ? "समय" : "Time"}</Label>
                <Input
                  id="time"
                  type="time"
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                />

                {newSchedule.action === "share" && (
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="recipients">
                      {language === "gu" ? "પ્રાપ્તકર્તાઓ" : language === "hi" ? "प्राप्तकर्ता" : "Recipients"}
                    </Label>
                    <Input
                      id="recipients"
                      placeholder="email@example.com"
                      value={newSchedule.recipients?.join(", ") || ""}
                      onChange={(e) =>
                        setNewSchedule({
                          ...newSchedule,
                          recipients: e.target.value.split(",").map((email) => email.trim()),
                        })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      {language === "gu"
                        ? "અલગ કરવા માટે અલ્પવિરામનો ઉપયોગ કરો"
                        : language === "hi"
                          ? "अलग करने के लिए कॉमा का उपयोग करें"
                          : "Use commas to separate multiple emails"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="is-active"
                checked={newSchedule.isActive}
                onCheckedChange={(checked) => setNewSchedule({ ...newSchedule, isActive: checked })}
              />
              <Label htmlFor="is-active">
                {language === "gu" ? "શેડ્યૂલ સક્રિય કરો" : language === "hi" ? "शेड्यूल सक्रिय करें" : "Enable Schedule"}
              </Label>
            </div>

            <DialogFooter className="mt-4">
              <Button onClick={handleCreateSchedule} disabled={!newSchedule.name}>
                {language === "gu" ? "શેડ્યૂલ બનાવો" : language === "hi" ? "शेड्यूल बनाएं" : "Create Schedule"}
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

// Import the Plus icon
import { Plus } from "lucide-react"
