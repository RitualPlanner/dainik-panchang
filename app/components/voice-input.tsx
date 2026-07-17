"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2 } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

interface VoiceInputProps {
  onTranscript: (text: string) => void
  language: string
}

export function VoiceInput({ onTranscript, language }: VoiceInputProps) {
  const { t } = useLanguage()
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [recognition, setRecognition] = useState<any>(null)
  const [isSupported, setIsSupported] = useState(true)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if browser supports speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = true
        recognitionInstance.interimResults = true

        // Set language based on prop
        recognitionInstance.lang = language === "gu" ? "gu-IN" : language === "hi" ? "hi-IN" : "en-US"

        recognitionInstance.onresult = (event: any) => {
          const current = event.resultIndex
          const transcriptText = event.results[current][0].transcript
          setTranscript(transcriptText)
        }

        recognitionInstance.onend = () => {
          setIsListening(false)
        }

        setRecognition(recognitionInstance)
      } else {
        setIsSupported(false)
      }
    }

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [language])

  // Update recognition language when language changes
  useEffect(() => {
    if (recognition) {
      recognition.lang = language === "gu" ? "gu-IN" : language === "hi" ? "hi-IN" : "en-US"
    }
  }, [language, recognition])

  const toggleListening = () => {
    if (!recognition) return

    if (isListening) {
      recognition.stop()
      setIsListening(false)

      // Send final transcript to parent component
      if (transcript) {
        onTranscript(transcript)
        setTranscript("")
      }
    } else {
      setTranscript("")
      recognition.start()
      setIsListening(true)
    }
  }

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "gu" ? "gu-IN" : language === "hi" ? "hi-IN" : "en-US"
      window.speechSynthesis.speak(utterance)
    }
  }

  if (!isSupported) {
    return (
      <Button variant="outline" disabled className="w-full">
        <MicOff className="h-4 w-4 mr-2" />
        {language === "gu"
          ? "વૉઇસ ઇનપુટ સપોર્ટેડ નથી"
          : language === "hi"
            ? "वॉइस इनपुट सपोर्टेड नहीं है"
            : "Voice input not supported"}
      </Button>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button
          variant={isListening ? "default" : "outline"}
          onClick={toggleListening}
          className={`flex-1 ${isListening ? "bg-red-500 hover:bg-red-600" : ""}`}
        >
          {isListening ? (
            <>
              <MicOff className="h-4 w-4 mr-2 animate-pulse" />
              {language === "gu" ? "બંધ કરો" : language === "hi" ? "बंद करें" : "Stop"}
            </>
          ) : (
            <>
              <Mic className="h-4 w-4 mr-2" />
              {t("voice")}
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => speakText(transcript || t("panchangHeader"))}
          title={language === "gu" ? "વાંચો" : language === "hi" ? "पढ़ें" : "Read"}
        >
          <Volume2 className="h-4 w-4" />
        </Button>
      </div>

      {isListening && transcript && (
        <div className="p-2 border rounded-md bg-muted">
          <p className="text-sm">{transcript}</p>
        </div>
      )}
    </div>
  )
}
