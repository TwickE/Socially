export const darkThemeColors = {
  primary: '#2155ce',
  primary25: 'rgba(33, 85, 206, 0.25)',
  secondary: '#5686f6',
  background: '#000000',
  surface: '#1a1a1a',
  surfaceLight: '#2a2a2a',
  text: '#ffffff',
  grey: '#9ca3af',
  red: '#ff0000',
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export const lightThemeColors = {
  primary: '#2155ce',
  primary25: 'rgba(33, 85, 206, 0.25)',
  secondary: '#5686f6',
  background: '#ffffff',
  surface: '#f1f1f1',
  surfaceLight: '#d6d6d6',
  text: '#000000',
  grey: '#6e737a',
  red: '#ff0000',
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export type AppThemeColors = typeof darkThemeColors | typeof lightThemeColors;