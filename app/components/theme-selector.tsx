"use client"

import { useState, useEffect } from "react"
import { Check, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type ThemeOption = {
  id: string
  name: string
  background: string
  textColor: string
  borderColor: string
}

const themes: ThemeOption[] = [
  {
    id: "default",
    name: "મૂળભૂત",
    background: "#1a2e3b",
    textColor: "white",
    borderColor: "#ffffff",
  },
  {
    id: "festival",
    name: "ઉત્સવ",
    background: "#8b0000",
    textColor: "gold",
    borderColor: "#ffd700",
  },
  {
    id: "spiritual",
    name: "આધ્યાત્મિક",
    background: "#2c3e50",
    textColor: "#e0e0e0",
    borderColor: "#9b59b6",
  },
  {
    id: "nature",
    name: "પ્રકૃતિ",
    background: "#1b5e20",
    textColor: "#f1f8e9",
    borderColor: "#aed581",
  },
  {
    id: "elegant",
    name: "સુંદર",
    background: "#212121",
    textColor: "#f5f5f5",
    borderColor: "#9e9e9e",
  },
]

interface ThemeSelectorProps {
  onChange: (theme: ThemeOption) => void
}

export function ThemeSelector({ onChange }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(themes[0])

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem("panchang_theme")
    if (savedThemeId) {
      const theme = themes.find((t) => t.id === savedThemeId)
      if (theme) {
        setSelectedTheme(theme)
        onChange(theme)
      }
    }
  }, [onChange])

  const handleSelectTheme = (theme: ThemeOption) => {
    setSelectedTheme(theme)
    onChange(theme)
    localStorage.setItem("panchang_theme", theme.id)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          <Palette className="mr-2 h-4 w-4" />
          <span>થીમ: {selectedTheme.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => handleSelectTheme(theme)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: theme.background }} />
              <span>{theme.name}</span>
            </div>
            {selectedTheme.id === theme.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
