import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { useFetcher } from "@remix-run/react";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type PrefferedTheme = "light" | "dark" | "system";
type ThemeContextType = {
  theme: Theme;
  preferredTheme: PrefferedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode, preferredTheme: PrefferedTheme }> = ({ children, preferredTheme: initialPreferredTheme }) => {
  const [preferredTheme, setPreferredTheme] = useState<PrefferedTheme>(initialPreferredTheme);
  const [theme, setThemeState] = useState<Theme>("light");
  const fetcher = useFetcher();
  const isDarkModeInTheBrowser = useMediaQuery('(prefers-color-scheme: dark)');

  const setTheme = (newTheme: Theme) => {
    setPreferredTheme(newTheme);
    fetcher.submit(
      { theme: newTheme },
      { method: "post", action: "/theme" }
    );
  };

  useEffect(() => {
    if (preferredTheme === "system") {
      setThemeState(isDarkModeInTheBrowser ? "dark" : "light")
    } else {
      setThemeState(preferredTheme)
    }
  }, [preferredTheme, isDarkModeInTheBrowser])

  useEffect(() => {
    setPreferredTheme(initialPreferredTheme);
  }, [initialPreferredTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, preferredTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
