"use client";

import { useTheme } from "@/contexts/ThemeContext";
import type { ThemeId } from "@/contexts/ThemeContext";

const themeOptions: { id: ThemeId; label: string; emoji: string }[] = [
  { id: "regular", label: "Regular", emoji: "📱" },
  { id: "space", label: "Space", emoji: "🚀" },
  { id: "neon", label: "Neon", emoji: "✨" },
  { id: "forest", label: "Forest", emoji: "🌲" },
  { id: "sunset", label: "Sunset", emoji: "🌅" },
  { id: "ocean", label: "Ocean", emoji: "🌊" },
  { id: "retro", label: "Retro", emoji: "📟" },
  { id: "candy", label: "Candy", emoji: "🍬" },
  { id: "midnight", label: "Midnight", emoji: "🌙" },
  { id: "arctic", label: "Arctic", emoji: "❄️" },
];

export default function ThemeSelector() {
  const { theme, themeId, setTheme } = useTheme();

  return (
    <select
      value={themeId}
      onChange={(e) => setTheme(e.target.value as ThemeId)}
      className={`cursor-pointer rounded-lg border px-4 py-2 pr-10 text-sm font-medium transition-all appearance-none bg-no-repeat ${theme.borderColor} ${theme.buttonBg} ${theme.buttonText} ${theme.buttonHover}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: "right 0.5rem center",
        backgroundSize: "1.5em 1.5em",
      }}
    >
      {themeOptions.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.emoji} {opt.label}
        </option>
      ))}
    </select>
  );
}
