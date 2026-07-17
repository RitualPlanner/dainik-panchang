"use client"

import { useState, useEffect } from "react"

type StorageItem<T> = {
  value: T
  expiry: number
}

export function useLocalStorageWithExpiry<T>(
  key: string,
  defaultValue: T,
  expiryInMinutes = 30,
): [T, (value: T) => void] {
  // Function to get stored value with expiry check
  const getStoredValue = (): T => {
    if (typeof window === "undefined") {
      return defaultValue
    }

    try {
      const item = window.localStorage.getItem(key)

      // If no item exists, return default
      if (!item) {
        return defaultValue
      }

      const storedItem: StorageItem<T> = JSON.parse(item)
      const now = new Date().getTime()

      // Check if the item has expired
      if (now > storedItem.expiry) {
        // Item expired, remove it and return default
        window.localStorage.removeItem(key)
        return defaultValue
      }

      // Item still valid, return its value
      return storedItem.value
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return defaultValue
    }
  }

  // Initialize state with stored value or default
  const [value, setValue] = useState<T>(getStoredValue)

  // Update localStorage when value changes
  const setStoredValue = (newValue: T): void => {
    try {
      // Save to state
      setValue(newValue)

      // Save to localStorage with expiry
      if (typeof window !== "undefined") {
        const now = new Date().getTime()
        const expiryTime = now + expiryInMinutes * 60 * 1000

        const item: StorageItem<T> = {
          value: newValue,
          expiry: expiryTime,
        }

        window.localStorage.setItem(key, JSON.stringify(item))
      }
    } catch (error) {
      console.error("Error writing to localStorage:", error)
    }
  }

  // Check for expiry on mount and set up interval to check periodically
  useEffect(() => {
    const checkExpiry = () => {
      const storedValue = getStoredValue()
      setValue(storedValue)
    }

    // Check expiry on mount
    checkExpiry()

    // Set up interval to check expiry every minute
    const interval = setInterval(checkExpiry, 60 * 1000)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [key])

  return [value, setStoredValue]
}
