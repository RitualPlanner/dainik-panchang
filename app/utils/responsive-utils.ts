"use client"

import { useEffect, useState } from "react"

// Hook to detect screen size
export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      const width = window.innerWidth
      setScreenSize({
        width,
        height: window.innerHeight,
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      })
    }

    // Set initial size
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return screenSize
}

// Function to get appropriate grid columns based on screen size
export function getResponsiveGridCols(screenWidth: number): string {
  if (screenWidth < 640) return "grid-cols-1" // Mobile
  if (screenWidth < 1024) return "grid-cols-2" // Tablet
  return "grid-cols-3" // Desktop
}

// Function to get appropriate font size based on screen size
export function getResponsiveFontSize(screenWidth: number, baseSize: number): string {
  if (screenWidth < 640) return `text-${Math.max(baseSize - 2, 1)}xl` // Mobile
  if (screenWidth < 1024) return `text-${Math.max(baseSize - 1, 1)}xl` // Tablet
  return `text-${baseSize}xl` // Desktop
}
