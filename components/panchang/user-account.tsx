"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogIn, LogOut, Settings, History } from "lucide-react";
import { useLanguage } from "@/app/contexts/language-context";
import type { UserData } from "@/types/panchang";

export function UserAccount() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userData] = useState<UserData>({
    name: "Demo User",
    email: "demo@example.com",
    phone: "+91 9876543210",
    language: "gu",
    theme: "light",
    notifications: true,
    savedTemplates: [],
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <User className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="login">
              {language === "gu"
                ? "લોગિન"
                : language === "hi"
                  ? "लॉगिन"
                  : "Login"}
            </TabsTrigger>
            <TabsTrigger value="profile">
              {language === "gu"
                ? "પ્રોફાઇલ"
                : language === "hi"
                  ? "प्रोफाइल"
                  : "Profile"}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="user@example.com" />
            </div>
            <Button className="w-full" onClick={() => setIsLoggedIn(true)}>
              <LogIn className="h-4 w-4 mr-2" />
              {language === "gu" ? "લોગિન કરો" : "Login"}
            </Button>
          </TabsContent>
          <TabsContent value="profile" className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>DU</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{userData.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {userData.email}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
