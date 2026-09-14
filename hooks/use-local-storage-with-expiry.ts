"use client";

import { useState, useEffect } from "react";

type StorageItem<T> = {
  value: T;
  expiry: number;
};

export function useLocalStorageWithExpiry<T>(
  key: string,
  defaultValue: T,
  expiryInMinutes = 30
): [T, (value: T) => void] {
  const getStoredValue = (): T => {
    if (typeof window === "undefined") {
      return defaultValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      if (!item) {
        return defaultValue;
      }

      const storedItem: StorageItem<T> = JSON.parse(item);
      const now = new Date().getTime();

      if (now > storedItem.expiry) {
        window.localStorage.removeItem(key);
        return defaultValue;
      }

      return storedItem.value;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return defaultValue;
    }
  };

  const [value, setValue] = useState<T>(getStoredValue);

  const setStoredValue = (newValue: T): void => {
    setValue(newValue);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = setTimeout(() => {
      try {
        const now = new Date().getTime();
        const expiryTime = now + expiryInMinutes * 60 * 1000;

        const item: StorageItem<T> = {
          value: value,
          expiry: expiryTime,
        };

        window.localStorage.setItem(key, JSON.stringify(item));
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value, key, expiryInMinutes]);

  useEffect(() => {
    const checkExpiry = () => {
      if (typeof window === "undefined") return;
      try {
        const item = window.localStorage.getItem(key);
        if (!item) {
          setValue(defaultValue);
          return;
        }
        const storedItem: StorageItem<T> = JSON.parse(item);
        const now = new Date().getTime();
        if (now > storedItem.expiry) {
          window.localStorage.removeItem(key);
          setValue(defaultValue);
        } else {
          setValue(storedItem.value);
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error);
        setValue(defaultValue);
      }
    };

    checkExpiry();

    const interval = setInterval(checkExpiry, 60 * 1000);

    return () => clearInterval(interval);
  }, [key, defaultValue]);

  return [value, setStoredValue];
}
