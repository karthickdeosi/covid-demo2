/**
 * Modern Health App Theme
 * Inspired by contemporary healthcare UI design
 */

import { Platform } from 'react-native';

// Primary colors
export const AppColors = {
  // Main accent colors
  primary: '#2DD4BF', // Teal/Cyan
  primaryDark: '#14B8A6',
  primaryLight: '#5EEAD4',
  
  // Secondary accent
  secondary: '#8B5CF6', // Purple
  secondaryDark: '#7C3AED',
  secondaryLight: '#A78BFA',
  
  // Card gradient colors
  cardPurple: '#8B5CF6',
  cardPurpleLight: '#C4B5FD',
  cardTeal: '#14B8A6',
  cardTealLight: '#5EEAD4',
  cardBlue: '#3B82F6',
  cardBlueLight: '#93C5FD',
  cardPink: '#EC4899',
  cardPinkLight: '#F9A8D4',
  
  // Background colors
  background: '#F0FDFA',
  backgroundDark: '#0D1B2A',
  cardBackground: '#FFFFFF',
  
  // Text colors
  textPrimary: '#1E3A5F',
  textSecondary: '#64748B',
  textLight: '#FFFFFF',
  textMuted: '#94A3B8',
  
  // Status colors
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Border and shadows
  border: '#E2E8F0',
  shadow: 'rgba(0, 0, 0, 0.1)',
  
  // Gradient stops
  gradientStart: '#E0F7FA',
  gradientEnd: '#B2DFDB',
};

const tintColorLight = AppColors.primary;
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: AppColors.textPrimary,
    background: AppColors.background,
    tint: tintColorLight,
    icon: AppColors.textSecondary,
    tabIconDefault: AppColors.textMuted,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: AppColors.backgroundDark,
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Spacing system
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Shadow presets
export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};
