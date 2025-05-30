import { ThemeContext, ThemeContextType } from '@/context/ThemeContext'; // Assuming ThemeContextType is exported from your context
import { AppThemeColors, darkThemeColors, lightThemeColors } from '@/styles/theme';
import { useContext } from 'react';

export const useAppThemeColors = (): AppThemeColors => {
  const context = useContext(ThemeContext);

  // Ensure context is available
  if (!context) {
    // This should ideally not happen if your app is correctly wrapped in ThemeProvider
    // console.warn('ThemeContext not found, defaulting to dark theme colors.');
    return darkThemeColors; // Fallback to dark theme
  }

  const { currentTheme } = context as ThemeContextType; // Cast if context type is generic

  if (currentTheme === 'light') {
    return lightThemeColors;
  }
  // Add more theme conditions here if you have more themes
  // else if (currentTheme === 'blue') {
  //   return blueThemeColors;
  // }

  // Default to dark theme
  return darkThemeColors;
};