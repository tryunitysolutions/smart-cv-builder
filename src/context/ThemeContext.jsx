import { createContext, useMemo, useState, useEffect } from "react";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => localStorage.getItem("mode") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", mode);  // For CSS selectors
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("mode", next);
      return next;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#2563EB",
          },
          background: {
            default: mode === "dark" ? "#111827" : "#f5f5f5",
            paper: mode === "dark" ? "#1F2937" : "#fff",
          },
        },
        typography: {
          fontFamily: ["Inter", "sans-serif"].join(","),
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};