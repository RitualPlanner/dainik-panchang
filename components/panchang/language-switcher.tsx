"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLanguage } from "@/app/contexts/language-context";
import type { Language } from "@/types/language";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "gu", name: "ગુજરાતી" },
    { code: "hi", name: "हिंदी" },
    { code: "en", name: "English" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm font-medium border-border/80"
        >
          <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2 shrink-0 text-muted-foreground" />
          <span className="hidden sm:inline">
            {language === "gu"
              ? "ગુજરાતી"
              : language === "hi"
                ? "हिंदी"
                : "English"}
          </span>
          <span className="inline sm:hidden font-semibold uppercase text-xs">
            {language}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as Language)}
            className={language === lang.code ? "bg-muted" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
