"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type ThemeId =
  | "regular"
  | "space"
  | "neon"
  | "forest"
  | "sunset"
  | "ocean"
  | "retro"
  | "candy"
  | "midnight"
  | "arctic";

export interface Theme {
  id: ThemeId;
  name: string;
  bg: string;
  displayBg: string;
  displayText: string;
  buttonBg: string;
  buttonText: string;
  buttonHover: string;
  operatorBg: string;
  operatorHover: string;
  accentBg: string;
  accentHover: string;
  borderColor: string;
}

const themes: Record<ThemeId, Theme> = {
  regular: {
    id: "regular",
    name: "Regular",
    bg: "bg-slate-100",
    displayBg: "bg-white",
    displayText: "text-slate-900",
    buttonBg: "bg-slate-200",
    buttonText: "text-slate-900",
    buttonHover: "hover:bg-slate-300",
    operatorBg: "bg-slate-300",
    operatorHover: "hover:bg-slate-400",
    accentBg: "bg-blue-500",
    accentHover: "hover:bg-blue-600",
    borderColor: "border-slate-300",
  },
  space: {
    id: "space",
    name: "Space",
    bg: "bg-[#0f0c29]",
    displayBg: "bg-[#1a1333]",
    displayText: "text-cyan-100",
    buttonBg: "bg-[#2d2654]",
    buttonText: "text-cyan-50",
    buttonHover: "hover:bg-[#3d3564]",
    operatorBg: "bg-[#6b5b95]",
    operatorHover: "hover:bg-[#7d6ba8]",
    accentBg: "bg-cyan-500",
    accentHover: "hover:bg-cyan-400",
    borderColor: "border-purple-800/50",
  },
  neon: {
    id: "neon",
    name: "Neon",
    bg: "bg-black",
    displayBg: "bg-[#0d0d0d]",
    displayText: "text-cyan-300",
    buttonBg: "bg-[#1a1a2e]",
    buttonText: "text-pink-300",
    buttonHover: "hover:bg-[#252538]",
    operatorBg: "bg-[#16213e]",
    operatorHover: "hover:bg-[#1f3460]",
    accentBg: "bg-pink-500",
    accentHover: "hover:bg-pink-400",
    borderColor: "border-cyan-500/30",
  },
  forest: {
    id: "forest",
    name: "Forest",
    bg: "bg-[#1a2f1a]",
    displayBg: "bg-[#243d24]",
    displayText: "text-emerald-100",
    buttonBg: "bg-[#2d4a2d]",
    buttonText: "text-lime-100",
    buttonHover: "hover:bg-[#3a5c3a]",
    operatorBg: "bg-[#3d6b3d]",
    operatorHover: "hover:bg-[#4a7a4a]",
    accentBg: "bg-emerald-600",
    accentHover: "hover:bg-emerald-500",
    borderColor: "border-emerald-800/60",
  },
  sunset: {
    id: "sunset",
    name: "Sunset",
    bg: "bg-[#2d1a1a]",
    displayBg: "bg-[#3d2525]",
    displayText: "text-orange-100",
    buttonBg: "bg-[#4a2d2d]",
    buttonText: "text-amber-100",
    buttonHover: "hover:bg-[#5c3a3a]",
    operatorBg: "bg-[#6b3d3d]",
    operatorHover: "hover:bg-[#7a4a4a]",
    accentBg: "bg-orange-500",
    accentHover: "hover:bg-orange-400",
    borderColor: "border-amber-800/50",
  },
  ocean: {
    id: "ocean",
    name: "Ocean",
    bg: "bg-[#0a1929]",
    displayBg: "bg-[#132f4c]",
    displayText: "text-sky-100",
    buttonBg: "bg-[#1e3a5f]",
    buttonText: "text-cyan-50",
    buttonHover: "hover:bg-[#2a4a6f]",
    operatorBg: "bg-[#2563eb]",
    operatorHover: "hover:bg-[#3b82f6]",
    accentBg: "bg-sky-500",
    accentHover: "hover:bg-sky-400",
    borderColor: "border-sky-600/50",
  },
  retro: {
    id: "retro",
    name: "Retro",
    bg: "bg-[#3d3522]",
    displayBg: "bg-[#4a4028]",
    displayText: "text-amber-200",
    buttonBg: "bg-[#5c5030]",
    buttonText: "text-amber-100",
    buttonHover: "hover:bg-[#6b5d38]",
    operatorBg: "bg-[#7a6b40]",
    operatorHover: "hover:bg-[#8a7a48]",
    accentBg: "bg-amber-600",
    accentHover: "hover:bg-amber-500",
    borderColor: "border-amber-800/60",
  },
  candy: {
    id: "candy",
    name: "Candy",
    bg: "bg-[#2d1a2d]",
    displayBg: "bg-[#3d243d]",
    displayText: "text-pink-100",
    buttonBg: "bg-[#4a2d4a]",
    buttonText: "text-fuchsia-100",
    buttonHover: "hover:bg-[#5c3a5c]",
    operatorBg: "bg-[#6b3d6b]",
    operatorHover: "hover:bg-[#7a4a7a]",
    accentBg: "bg-fuchsia-500",
    accentHover: "hover:bg-fuchsia-400",
    borderColor: "border-fuchsia-600/50",
  },
  midnight: {
    id: "midnight",
    name: "Midnight",
    bg: "bg-[#0f0a1a]",
    displayBg: "bg-[#1a1230]",
    displayText: "text-violet-200",
    buttonBg: "bg-[#252040]",
    buttonText: "text-violet-100",
    buttonHover: "hover:bg-[#352d55]",
    operatorBg: "bg-[#4c3d7a]",
    operatorHover: "hover:bg-[#5d4d8a]",
    accentBg: "bg-violet-500",
    accentHover: "hover:bg-violet-400",
    borderColor: "border-violet-700/50",
  },
  arctic: {
    id: "arctic",
    name: "Arctic",
    bg: "bg-[#e8f4f8]",
    displayBg: "bg-white",
    displayText: "text-slate-800",
    buttonBg: "bg-[#c5e3ed]",
    buttonText: "text-slate-700",
    buttonHover: "hover:bg-[#b0dae6]",
    operatorBg: "bg-[#9dd1df]",
    operatorHover: "hover:bg-[#8ac8d9]",
    accentBg: "bg-cyan-600",
    accentHover: "hover:bg-cyan-500",
    borderColor: "border-cyan-300",
  },
};

interface ThemeContextValue {
  theme: Theme;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>("regular");
  const setTheme = useCallback((id: ThemeId) => setThemeId(id), []);
  const theme = themes[themeId];

  return (
    <ThemeContext.Provider value={{ theme, themeId, setTheme }}>
      <div
        data-theme={themeId}
        className={`min-h-screen transition-colors ${theme.bg}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export { themes };
