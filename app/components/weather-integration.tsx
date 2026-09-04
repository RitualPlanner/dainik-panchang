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
import { useLanguage } from "../contexts/language-context";
import { convertToGujaratiNumerals } from "../utils/date-utils";

// Define weather data type
interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  sunrise: string;
  sunset: string;
  moonPhase: string;
  forecast: {
    date: string;
    condition: string;
    maxTemp: number;
    minTemp: number;
  }[];
}

export function WeatherIntegration() {
  const { language, t } = useLanguage();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real implementation, this would be an API call
        // For demo purposes, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

        const mockWeatherData: WeatherData = {
          location: "Ahmedabad, Gujarat",
          temperature: 32,
          condition: "Sunny",
          humidity: 65,
          windSpeed: 12,
          sunrise: "06:15",
          sunset: "18:45",
          moonPhase: "Waxing Gibbous",
          forecast: [
            {
              date: "Tomorrow",
              condition: "Partly Cloudy",
              maxTemp: 33,
              minTemp: 24,
            },
            {
              date: "Day After",
              condition: "Rainy",
              maxTemp: 30,
              minTemp: 23,
            },
          ],
        };

        setWeatherData(mockWeatherData);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Failed to fetch weather data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case "cloudy":
      case "partly cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  // Format temperature based on language
  const formatTemperature = (temp: number): string => {
    if (language === "gu") {
      return `${convertToGujaratiNumerals(temp.toString())}°C`;
    } else {
      return `${temp}°C`;
    }
  };

  // Format time based on language
  const formatTime = (time: string): string => {
    if (language === "gu") {
      return convertToGujaratiNumerals(time);
    } else {
      return time;
    }
  };

  // Translate moon phase
  const translateMoonPhase = (phase: string): string => {
    switch (phase) {
      case "New Moon":
        return language === "gu"
          ? "અમાસ"
          : language === "hi"
            ? "अमावस्या"
            : phase;
      case "Waxing Crescent":
        return language === "gu"
          ? "શુક્લ પક્ષ (વધતો ચંદ્ર)"
          : language === "hi"
            ? "शुक्ल पक्ष (बढ़ता चंद्र)"
            : phase;
      case "First Quarter":
        return language === "gu"
          ? "પ્રથમ ચતુર્થાંશ"
          : language === "hi"
            ? "प्रथम चतुर्थांश"
            : phase;
      case "Waxing Gibbous":
        return language === "gu"
          ? "શુક્લ પક્ષ (પૂર્ણિમા તરફ)"
          : language === "hi"
            ? "शुक्ल पक्ष (पूर्णिमा की ओर)"
            : phase;
      case "Full Moon":
        return language === "gu"
          ? "પૂર્ણિમા"
          : language === "hi"
            ? "पूर्णिमा"
            : phase;
      case "Waning Gibbous":
        return language === "gu"
          ? "કૃષ્ણ પક્ષ (ઘટતો ચંદ્ર)"
          : language === "hi"
            ? "कृष्ण पक्ष (घटता चंद्र)"
            : phase;
      case "Last Quarter":
        return language === "gu"
          ? "અંતિમ ચતુર્થાંશ"
          : language === "hi"
            ? "अंतिम चतुर्थांश"
            : phase;
      case "Waning Crescent":
        return language === "gu"
          ? "કૃષ્ણ પક્ષ (અમાસ તરફ)"
          : language === "hi"
            ? "कृष्ण पक्ष (अमावस्या की ओर)"
            : phase;
      default:
        return phase;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sun className="h-5 w-5 mr-2" />
            {language === "gu"
              ? "હવામાન"
              : language === "hi"
                ? "मौसम"
                : "Weather"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weatherData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sun className="h-5 w-5 mr-2" />
            {language === "gu"
              ? "હવામાન"
              : language === "hi"
                ? "मौसम"
                : "Weather"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-4">
          <p className="text-red-500">
            {language === "gu"
              ? "હવામાન માહિતી લાવવામાં ભૂલ"
              : language === "hi"
                ? "मौसम जानकारी लाने में त्रुटि"
                : "Error fetching weather data"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Sun className="h-5 w-5 mr-2" />
            {language === "gu"
              ? "હવામાન"
              : language === "hi"
                ? "मौसम"
                : "Weather"}
          </div>
          <Badge variant="outline">{weatherData.location}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            {getWeatherIcon(weatherData.condition)}
            <div className="ml-2">
              <h3 className="text-2xl font-bold">
                {formatTemperature(weatherData.temperature)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === "gu"
                  ? weatherData.condition === "Sunny"
                    ? "તડકો"
                    : weatherData.condition
                  : language === "hi"
                    ? weatherData.condition === "Sunny"
                      ? "धूप"
                      : weatherData.condition
                    : weatherData.condition}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Thermometer className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-sm">
                {language === "gu"
                  ? `ભેજ: ${convertToGujaratiNumerals(weatherData.humidity.toString())}%`
                  : language === "hi"
                    ? `नमी: ${weatherData.humidity}%`
                    : `Humidity: ${weatherData.humidity}%`}
              </span>
            </div>
            <div className="flex items-center">
              <Wind className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-sm">
                {language === "gu"
                  ? `પવન: ${convertToGujaratiNumerals(weatherData.windSpeed.toString())} km/h`
                  : language === "hi"
                    ? `हवा: ${weatherData.windSpeed} km/h`
                    : `Wind: ${weatherData.windSpeed} km/h`}
              </span>
            </div>
            <div className="flex items-center">
              <Sunrise className="h-4 w-4 mr-2 text-orange-500" />
              <span className="text-sm">
                {language === "gu"
                  ? `સૂર્યોદય: ${formatTime(weatherData.sunrise)}`
                  : language === "hi"
                    ? `सूर्योदय: ${weatherData.sunrise}`
                    : `Sunrise: ${weatherData.sunrise}`}
              </span>
            </div>
            <div className="flex items-center">
              <Sunset className="h-4 w-4 mr-2 text-orange-500" />
              <span className="text-sm">
                {language === "gu"
                  ? `સૂર્યાસ્ત: ${formatTime(weatherData.sunset)}`
                  : language === "hi"
                    ? `सूर्यास्त: ${weatherData.sunset}`
                    : `Sunset: ${weatherData.sunset}`}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center mb-2">
            <Moon className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">
              {language === "gu"
                ? `ચંદ્ર તબક્કો: ${translateMoonPhase(weatherData.moonPhase)}`
                : language === "hi"
                  ? `चंद्र चरण: ${translateMoonPhase(weatherData.moonPhase)}`
                  : `Moon Phase: ${weatherData.moonPhase}`}
            </span>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">
              {language === "gu"
                ? "આગાહી"
                : language === "hi"
                  ? "पूर्वानुमान"
                  : "Forecast"}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="border rounded-md p-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {language === "gu"
                        ? day.date === "Tomorrow"
                          ? "આવતીકાલ"
                          : "પરમ દિવસ"
                        : language === "hi"
                          ? day.date === "Tomorrow"
                            ? "कल"
                            : "परसों"
                          : day.date}
                    </span>
                    {getWeatherIcon(day.condition)}
                  </div>
                  <div className="flex justify-between mt-1 text-xs">
                    <span>
                      {language === "gu"
                        ? `મહત્તમ: ${formatTemperature(day.maxTemp)}`
                        : language === "hi"
                          ? `अधिकतम: ${day.maxTemp}°C`
                          : `Max: ${day.maxTemp}°C`}
                    </span>
                    <span>
                      {language === "gu"
                        ? `ન્યૂનતમ: ${formatTemperature(day.minTemp)}`
                        : language === "hi"
                          ? `न्यूनतम: ${day.minTemp}°C`
                          : `Min: ${day.minTemp}°C`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
