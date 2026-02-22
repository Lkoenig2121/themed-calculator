"use client";

import Calculator from "@/components/Calculator";
import ThemeSelector from "@/components/ThemeSelector";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className={`text-2xl font-bold ${theme.displayText}`}>
          Themed Calculator
        </h1>
        <ThemeSelector />
      </div>
      <Calculator />
      <p className={`text-center text-sm ${theme.displayText} opacity-70`}>
        PEMDAS order of operations • Supports ^ for exponents
      </p>
    </div>
  );
}
