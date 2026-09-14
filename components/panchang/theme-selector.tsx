"use client";

import { Check, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ThemeOption } from "@/types/theme";
import type { ThemeSelectorProps } from "@/types/components";
import { PRESET_THEMES } from "@/constants/theme";

export function ThemeSelector({
  currentTheme,
  onSelectTheme,
}: ThemeSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          <span>{currentTheme.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {PRESET_THEMES.map((theme: ThemeOption) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => onSelectTheme(theme)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full border"
                style={{
                  backgroundColor: theme.background,
                  borderColor: theme.borderColor,
                }}
              />
              <span>{theme.name}</span>
            </div>
            {currentTheme.id === theme.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
