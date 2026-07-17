"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogIn, LogOut, Settings, History, Save } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

// Mock user data
interface UserData {
  id: string
  name: string
  email: string
  avatar?: string
  preferences: {
    defaultLanguage: string
    defaultTheme: string
    saveHistory: boolean
    autoFetch: boolean
  }
  savedPanchangs: {
    id: string
    date: string
    title: string
    createdAt: string
  }[]
}

export function UserAccount() {
  const { language, t, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Mock user data
  const [userData, setUserData] = useState<UserData>({
    id: "user123",
    name: "Demo User",
    email: "demo@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=DU",
    preferences: {
      defaultLanguage: language,
      defaultTheme: "default",
      saveHistory: true,
      autoFetch: false,
    },
    savedPanchangs: [
      {
        id: "p1",
        date: "15/04/2024",
        title: "Daily Panchang",
        createdAt: "2024-04-15T10:30:00Z",
      },
      {
        id: "p2",
        date: "16/04/2024",
        title: "Festival Panchang",
        createdAt: "2024-04-16T09:15:00Z",
      },
    ],
  })

  const handleLogin = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoggedIn(true)
      setIsLoading(false)
      setActiveTab("profile")
    }, 1000)
  }

  const handleRegister = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoggedIn(true)
      setUserData({
        ...userData,
        name: registerName,
        email: registerEmail,
      })
      setIsLoading(false)
      setActiveTab("profile")
    }, 1000)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveTab("login")
    setIsOpen(false)
  }

  const handleSavePreferences = () => {
    // Simulate saving preferences
    setLanguage(userData.preferences.defaultLanguage as any)
    alert(language === "gu" ? "પસંદગીઓ સાચવી" : language === "hi" ? "प्राथमिकताएँ सहेजी गईं" : "Preferences saved")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          {isLoggedIn ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          ) : (
            <User className="h-5 w-5" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {!isLoggedIn ? (
            <>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">
                  {language === "gu" ? "લોગિન" : language === "hi" ? "लॉगिन" : "Login"}
                </TabsTrigger>
                <TabsTrigger value="register">
                  {language === "gu" ? "રજિસ્ટર" : language === "hi" ? "रजिस्टर" : "Register"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{language === "gu" ? "ઈમેલ" : language === "hi" ? "ईमेल" : "Email"}</Label>
                  <Input id="email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {language === "gu" ? "પાસવર્ડ" : language === "hi" ? "पासवर्ड" : "Password"}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {language === "gu" ? "લોડિંગ..." : language === "hi" ? "लोड हो रहा है..." : "Loading..."}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <LogIn className="mr-2 h-4 w-4" />
                      {language === "gu" ? "લોગિન" : language === "hi" ? "लॉगिन" : "Login"}
                    </span>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{language === "gu" ? "નામ" : language === "hi" ? "नाम" : "Name"}</Label>
                  <Input id="name" value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">
                    {language === "gu" ? "ઈમેલ" : language === "hi" ? "ईमेल" : "Email"}
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">
                    {language === "gu" ? "પાસવર્ડ" : language === "hi" ? "पासवर्ड" : "Password"}
                  </Label>
                  <Input
                    id="register-password"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                </div>
                <Button onClick={handleRegister} className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {language === "gu" ? "લોડિંગ..." : language === "hi" ? "लोड हो रहा है..." : "Loading..."}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      {language === "gu" ? "રજિસ્ટર" : language === "hi" ? "रजिस्टर" : "Register"}
                    </span>
                  )}
                </Button>
              </TabsContent>
            </>
          ) : (
            <>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">
                  <User className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden md:inline">
                    {language === "gu" ? "પ્રોફાઇલ" : language === "hi" ? "प्रोफाइल" : "Profile"}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="history">
                  <History className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden md:inline">
                    {language === "gu" ? "ઇતિહાસ" : language === "hi" ? "इतिहास" : "History"}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden md:inline">
                    {language === "gu" ? "સેટિંગ્સ" : language === "hi" ? "सेटिंग्स" : "Settings"}
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4 py-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-lg">{userData.name}</h3>
                    <p className="text-sm text-muted-foreground">{userData.email}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={handleLogout} variant="outline" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    {language === "gu" ? "લોગઆઉટ" : language === "hi" ? "लॉगआउट" : "Logout"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4 py-4">
                <h3 className="font-medium">
                  {language === "gu" ? "સાચવેલા પંચાંગ" : language === "hi" ? "सहेजे गए पंचांग" : "Saved Panchangs"}
                </h3>

                {userData.savedPanchangs.length > 0 ? (
                  <div className="space-y-2">
                    {userData.savedPanchangs.map((panchang) => (
                      <div
                        key={panchang.id}
                        className="flex justify-between items-center p-2 border rounded-md hover:bg-muted cursor-pointer"
                      >
                        <div>
                          <h4 className="font-medium">{panchang.title}</h4>
                          <p className="text-sm text-muted-foreground">{panchang.date}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          {language === "gu" ? "જુઓ" : language === "hi" ? "देखें" : "View"}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    {language === "gu"
                      ? "તમારી પાસે હજી સુધી કોઈ સાચવેલા પંચાંગ નથી."
                      : language === "hi"
                        ? "आपके पास अभी तक कोई सहेजा गया पंचांग नहीं है।"
                        : "You don't have any saved panchangs yet."}
                  </p>
                )}
              </TabsContent>

              <TabsContent value="settings" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="default-language">
                    {language === "gu" ? "ડિફૉલ્ટ ભાષા" : language === "hi" ? "डिफ़ॉल्ट भाषा" : "Default Language"}
                  </Label>
                  <select
                    id="default-language"
                    className="w-full p-2 border rounded-md"
                    value={userData.preferences.defaultLanguage}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        preferences: {
                          ...userData.preferences,
                          defaultLanguage: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="gu">ગુજરાતી</option>
                    <option value="hi">हिंदी</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-theme">
                    {language === "gu" ? "ડિફૉલ્ટ થીમ" : language === "hi" ? "डिफ़ॉल्ट थीम" : "Default Theme"}
                  </Label>
                  <select
                    id="default-theme"
                    className="w-full p-2 border rounded-md"
                    value={userData.preferences.defaultTheme}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        preferences: {
                          ...userData.preferences,
                          defaultTheme: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="default">Default</option>
                    <option value="festival">Festival</option>
                    <option value="spiritual">Spiritual</option>
                    <option value="nature">Nature</option>
                    <option value="elegant">Elegant</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="save-history"
                    checked={userData.preferences.saveHistory}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        preferences: {
                          ...userData.preferences,
                          saveHistory: e.target.checked,
                        },
                      })
                    }
                  />
                  <Label htmlFor="save-history">
                    {language === "gu"
                      ? "પંચાંગ ઇતિહાસ સાચવો"
                      : language === "hi"
                        ? "पंचांग इतिहास सहेजें"
                        : "Save panchang history"}
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="auto-fetch"
                    checked={userData.preferences.autoFetch}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        preferences: {
                          ...userData.preferences,
                          autoFetch: e.target.checked,
                        },
                      })
                    }
                  />
                  <Label htmlFor="auto-fetch">
                    {language === "gu"
                      ? "આજનું પંચાંગ ઑટોમેટિક લોડ કરો"
                      : language === "hi"
                        ? "आज का पंचांग स्वचालित रूप से लोड करें"
                        : "Auto-load today's panchang"}
                  </Label>
                </div>

                <Button onClick={handleSavePreferences} className="w-full mt-4">
                  <Save className="mr-2 h-4 w-4" />
                  {language === "gu" ? "પસંદગીઓ સાચવો" : language === "hi" ? "प्राथमिकताएँ सहेजें" : "Save Preferences"}
                </Button>
              </TabsContent>
            </>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
