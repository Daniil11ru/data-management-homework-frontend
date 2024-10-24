import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

interface ThemeContextType {
  toggleTheme: () => void;
  themeMode: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Извлечение темы из localStorage или по умолчанию 'light'
  const getInitialTheme = (): "light" | "dark" => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? "dark" : "light";
  };

  const [themeMode, setThemeMode] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    // Сохранение темы в localStorage при её изменении
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const lightTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
        },
      }),
    []
  );

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "input[type='date']::-webkit-calendar-picker-indicator": {
            filter: "invert(1)",
          },
          "*::-webkit-scrollbar": {
            width: "8px",
            backgroundColor: "#2e2e2e",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#6b6b6b",
            borderRadius: "8px",
          },
        },
      },
    },
  });

  const theme = themeMode === "light" ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, themeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
