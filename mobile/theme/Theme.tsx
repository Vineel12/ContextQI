import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type ColorScheme = 'light' | 'dark';

const palettes = {
  dark: {
    background: '#0b1220',
    card: 'rgba(30,41,59,0.8)',
    surface: 'rgba(15,23,42,0.6)',
    text: '#ffffff',
    muted: '#94a3b8',
    border: 'rgba(148,163,184,0.25)',
    borderStrong: 'rgba(148,163,184,0.3)',
    primary: '#4f46e5',
    chevron: '#64748b',
  },
  light: {
    background: '#f8fafc',
    card: '#ffffff',
    surface: '#ffffff',
    text: '#0b1220',
    muted: '#475569',
    border: 'rgba(15,23,42,0.12)',
    borderStrong: 'rgba(15,23,42,0.2)',
    primary: '#4f46e5',
    chevron: '#64748b',
  },
};

type ThemeContextValue = {
  scheme: ColorScheme;
  setScheme: (s: ColorScheme) => void;
  colors: any;
};

const ThemeContext = createContext(undefined as any);
const STORAGE_KEY = 'contextiq_theme_v1';

export function ThemeProvider({ children }: any) {
  const [scheme, setScheme] = useState('dark' as ColorScheme);
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') setScheme(saved);
      } catch {}
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, scheme).catch(() => {});
  }, [scheme]);

  const colors: any = useMemo(() => (palettes as any)[scheme], [scheme]);
  const value: ThemeContextValue = useMemo(() => ({ scheme, setScheme, colors }), [scheme, colors]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
