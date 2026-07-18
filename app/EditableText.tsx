import { useState, useEffect } from "react";
import { Edit2 } from "lucide-react";

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
    <div className="space-y-1.5 mt-2 bg-amber-50/60 p-3 rounded-xl border border-amber-100/50 inline-block text-center max-w-full">
      <div className="flex items-center justify-center gap-2 group text-xs md:text-sm font-medium text-amber-900/85">
        <span>{line1}</span>
        <button
          className="p-1 rounded-md hover:bg-amber-100 text-amber-700/60 hover:text-amber-800 transition-colors"
          onClick={() => handleEdit("Line 1", setLine1)}
          title="Edit Line 1"
        >
          <Edit2 className="h-3 w-3" />
        </button>
      </div>
      <div className="flex items-center justify-center gap-2 group text-xs md:text-sm font-medium text-amber-900/80">
        <span>{line2}</span>
        <button
          className="p-1 rounded-md hover:bg-amber-100 text-amber-700/60 hover:text-amber-800 transition-colors"
          onClick={() => handleEdit("Line 2", setLine2)}
          title="Edit Line 2"
        >
          <Edit2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
