import { useState, useEffect } from "react";

// Helper function to safely access localStorage
const getLocalStorage = (key, defaultValue) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) || defaultValue;
  }
  return defaultValue;
};

// Helper function to safely set localStorage
const setLocalStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

export default function VikramSamvat() {
  // Default values
  const defaultLine1 = "વિક્રમ સંવત ૨૦૮૧ , ઉત્તરાયણ , વસંત ઋતુ , શાલિવાહન શકે ૧૯૪૬";
  const defaultLine2 = "ક્રોધીનામ - અનલ નામ સંવત્સર";

  // Retrieve stored values from localStorage or use defaults
  const [line1, setLine1] = useState(defaultLine1);
  const [line2, setLine2] = useState(defaultLine2);

  // Initialize state with localStorage values once the component mounts
  useEffect(() => {
    setLine1(getLocalStorage("vikramSamvatLine1", defaultLine1));
    setLine2(getLocalStorage("vikramSamvatLine2", defaultLine2));
  }, []);

  // Update localStorage whenever values change
  useEffect(() => {
    setLocalStorage("vikramSamvatLine1", line1);
  }, [line1]);

  useEffect(() => {
    setLocalStorage("vikramSamvatLine2", line2);
  }, [line2]);

  const handleEdit = (lineKey, setter) => {
    const newValue = prompt(`Edit ${lineKey}:`, lineKey === "Line 1" ? line1 : line2);
    if (newValue !== null) {
      setter(newValue);
    }
  };

  return (
    <div>
      <p className="text-sm">
        {line1}{" "}
        <span
          className="cursor-pointer text-blue-500"
          onClick={() => handleEdit("Line 1", setLine1)}
        >
          ✏️
        </span>
      </p>
      <p className="text-sm">
        {line2}{" "}
        <span
          className="cursor-pointer text-blue-500"
          onClick={() => handleEdit("Line 2", setLine2)}
        >
          ✏️
        </span>
      </p>
    </div>
  );
}
