import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LightTheme, DarkTheme } from "../constants/theme";

export const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
  theme: LightTheme,
});

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const value = await AsyncStorage.getItem("theme");

      if (value !== null) {
        setDarkMode(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newValue = !darkMode;

      setDarkMode(newValue);

      await AsyncStorage.setItem(
        "theme",
        JSON.stringify(newValue)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
        theme: darkMode ? DarkTheme : LightTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}