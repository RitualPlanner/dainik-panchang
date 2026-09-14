"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Cloud,
  CloudRain,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Wind,
  Thermometer,
} from "lucide-react";
import { useLanguage } from "@/app/contexts/language-context";
import { convertToGujaratiNumerals } from "@/app/utils/date-utils";
import type { WeatherData } from "@/types/panchang";

export function WeatherIntegration() {
  const { language } = useLanguage();
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setWeatherData({
          location: "Ahmedabad, Gujarat",
          temperature: 32,
          condition: "Sunny",
          humidity: 65,
          windSpeed: 12,
          sunrise: "06:15",
          sunset: "19:05",
          moonPhase: "Waxing Gibbous",
        });
      } catch (e) {
        console.error("Failed to load weather", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (isLoading || !weatherData) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Sun className="h-5 w-5 mr-2 text-amber-500" />
          {weatherData.location}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {language === "gu"
                ? convertToGujaratiNumerals(weatherData.temperature.toString())
                : weatherData.temperature}
              °C
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Sunrise className="h-4 w-4 text-amber-500" />
            <span className="text-sm">{weatherData.sunrise}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sunset className="h-4 w-4 text-orange-500" />
            <span className="text-sm">{weatherData.sunset}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-blue-500" />
            <span className="text-sm">{weatherData.windSpeed} km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
