import { useEffect, useMemo, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setThemeStorage] = useLocalStorage<Theme>("theme", "system");

  const applyTheme = useCallback((t: Theme) => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    root.classList.remove("dark");
    if (t === "dark" || (t === "system" && prefersDark)) {
      root.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyTheme("system");
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme, applyTheme]);

  const setTheme = useCallback((t: Theme) => setThemeStorage(t), [setThemeStorage]);
  const toggle = useCallback(() => {
    setThemeStorage(prev => (prev === "dark" ? "light" : "dark"));
  }, [setThemeStorage]);

  const isDark = useMemo(() => {
    if (typeof window === "undefined") return theme === "dark";
    if (theme === "dark") return true;
    if (theme === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }, [theme]);

  return { theme, setTheme, toggle, isDark } as const;
}