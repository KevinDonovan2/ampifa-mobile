import { Platform } from 'react-native';

const primaryLight = '#6C4AB6';
const primaryDark = '#A98BE8';

export const Colors = {
  light: {
    text: '#1C1B1F',
    background: '#FFFFFF',

    tint: primaryLight,

    icon: '#6B6870',
    tabIconDefault: '#6B6870',
    tabIconSelected: primaryLight,

    card: '#F6F3FA',
    cardSecondary: '#EEE9F5',

    border: '#E4DFEA',

    input: '#F3F0F6',

    secondaryText: '#706B75',

    favorite: '#E25563',
  },

  dark: {
    text: '#F4EFF7',
    background: '#151218',

    tint: primaryDark,

    icon: '#AAA3AE',
    tabIconDefault: '#AAA3AE',
    tabIconSelected: primaryDark,

    card: '#211C24',
    cardSecondary: '#2A2430',

    border: '#39333D',

    input: '#28232B',

    secondaryText: '#B8B1BC',

    favorite: '#FF7A86',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
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
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});