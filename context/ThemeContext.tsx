import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export type ThemeContextType = {
  isSystemTheme: boolean;
  currentTheme: string;
  toggleTheme: (newTheme: string) => void;
  setSystemTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isSystemTheme: false,
  currentTheme: 'light',
  toggleTheme: () => { },
  setSystemTheme: () => { }
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<string>('light');
  const [systemThemeState, setSystemThemeState] = useState<boolean>(false);

  useEffect(() => {
    const getTheme = async () => {
      try {
        const savedThemeObject = await AsyncStorage.getItem('theme');
        const savedThemeObjectData = JSON.parse(savedThemeObject!);

        if (savedThemeObjectData) {
          setTheme(savedThemeObjectData.mode);
          setSystemThemeState(savedThemeObjectData.system);
        }
      } catch (error) {
        console.error("Error fetching theme from AsyncStorage:", error);
      }
    }

    getTheme();
  }, []);

  useEffect(() => {
    if (colorScheme && systemThemeState) {
      const themeObject = {
        mode: colorScheme,
        system: true
      }
      setTheme(colorScheme);
      AsyncStorage.setItem('theme', JSON.stringify(themeObject));
      setSystemThemeState(true);
    }
  }, [colorScheme]);

  const toggleTheme = (newTheme: string) => {
    const themeObject = {
      mode: newTheme,
      system: false
    }
    setTheme(newTheme);
    AsyncStorage.setItem('theme', JSON.stringify(themeObject));
    setSystemThemeState(false);
  };

  const setSystemTheme = () => {
    if (colorScheme) {
      const themeObject = {
        mode: colorScheme,
        system: true
      }
      setTheme(colorScheme);
      AsyncStorage.setItem('theme', JSON.stringify(themeObject));
      setSystemThemeState(!systemThemeState);
    }
  }

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, toggleTheme, setSystemTheme, isSystemTheme: systemThemeState }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;