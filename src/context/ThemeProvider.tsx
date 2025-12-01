
import React, { createContext, useContext } from "react";
import { useTheme } from "../hooks/useTheme";
import type { Theme } from "../hooks/useTheme";

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, setTheme, toggle, isDark } = useTheme();
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeContext must be used within ThemeProvider");
  return context;
};
