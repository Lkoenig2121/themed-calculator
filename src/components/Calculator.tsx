"use client";

import { useState, useCallback, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { evaluate } from "@/lib/calculator";

type ButtonKind = "number" | "operator" | "function" | "equals";

export default function Calculator() {
  const { theme } = useTheme();
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleInput = useCallback((value: string) => {
    setResult(null);
    setExpression((prev) => prev + value);
  }, []);

  const handleClear = useCallback(() => {
    setExpression("");
    setResult(null);
  }, []);

  const handleBackspace = useCallback(() => {
    setResult(null);
    setExpression((prev) => prev.slice(0, -1));
  }, []);

  const handleEquals = useCallback(() => {
    const res = evaluate(expression);
    setResult(res);
  }, [expression]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEquals();
        return;
      }
      if (e.key === "Escape" || e.key === "c" || e.key === "C") {
        e.preventDefault();
        handleClear();
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
        return;
      }

      const char = e.key;
      if (/[0-9.+\-*/()^]/.test(char)) {
        e.preventDefault();
        handleInput(char);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleEquals, handleClear, handleBackspace, handleInput]);

  const btn = (value: string, kind: ButtonKind = "number") => {
    const base =
      "flex items-center justify-center rounded-xl font-semibold transition-all active:scale-95 min-h-[56px]";
    const kindStyles =
      kind === "operator"
        ? `${theme.operatorBg} ${theme.operatorHover} ${theme.buttonText}`
        : kind === "equals"
          ? `${theme.accentBg} ${theme.accentHover} text-white`
          : kind === "function"
            ? `${theme.buttonBg} ${theme.buttonHover} ${theme.buttonText}`
            : `${theme.buttonBg} ${theme.buttonHover} ${theme.buttonText}`;

    return (
      <button
        key={value}
        onClick={() =>
          value === "="
            ? handleEquals()
            : value === "C"
              ? handleClear()
              : value === "⌫"
                ? handleBackspace()
                : handleInput(value)
        }
        className={`${base} ${kindStyles}`}
      >
        {value}
      </button>
    );
  };

  return (
    <div
      className={`flex w-full min-w-[400px] max-w-lg flex-col gap-6 rounded-2xl border ${theme.borderColor} p-6 shadow-xl ${theme.bg}`}
    >
      <div
        className={`flex flex-col gap-2 rounded-xl border ${theme.borderColor} p-4 ${theme.displayBg}`}
      >
        <div
          className={`min-h-[24px] text-right font-mono text-lg ${theme.displayText} opacity-70`}
        >
          {expression || "0"}
        </div>
        <div
          className={`min-h-[40px] text-right font-mono text-2xl font-bold ${theme.displayText}`}
        >
          {result ?? ""}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {btn("C", "function")}
        {btn("(", "function")}
        {btn(")", "function")}
        {btn("^", "operator")}
        {btn("7")}
        {btn("8")}
        {btn("9")}
        {btn("/", "operator")}
        {btn("4")}
        {btn("5")}
        {btn("6")}
        {btn("*", "operator")}
        {btn("1")}
        {btn("2")}
        {btn("3")}
        {btn("-", "operator")}
        {btn("0")}
        {btn(".")}
        {btn("⌫", "function")}
        {btn("+", "operator")}
        <div className="col-span-4">
          <button
            onClick={handleEquals}
            className={`flex min-h-[72px] w-full items-center justify-center rounded-xl text-xl font-semibold transition-all active:scale-95 ${theme.accentBg} ${theme.accentHover} text-white`}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
