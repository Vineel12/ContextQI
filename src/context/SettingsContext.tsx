import React, { createContext, useContext, useEffect, useState } from 'react';

export type ConnectedMap = {
  slack: boolean;
  teams: boolean;
  discord: boolean;
  gmail: boolean;
};

export type SettingsState = {
  name: string;
  email: string;
  notifications: boolean;
  darkMode: boolean;
  language: string;
  connected: ConnectedMap;
};

type SettingsActions = {
  setProfile: (name: string, email: string) => void;
  setNotifications: (v: boolean) => void;
  setDarkMode: (v: boolean) => void;
  setLanguage: (lang: string) => void;
  setConnected: (key: keyof ConnectedMap, v: boolean) => void;
  disconnectAll: () => void;
};

const defaultState: SettingsState = {
  name: 'John Doe',
  email: 'john.doe@gmail.com',
  notifications: true,
  darkMode: true,
  language: 'English',
  connected: { slack: true, teams: true, discord: false, gmail: false },
};

// Keep typings minimal to avoid requiring @types/react in this project
const SettingsContext = createContext(null as any);

export function SettingsProvider({ children }: { children: any }) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem('contextiq_web_settings_v1');
      if (raw) return { ...defaultState, ...JSON.parse(raw) } as SettingsState;
    } catch {}
    return defaultState;
  });

  // Persist and apply HTML class for theme
  useEffect(() => {
    try {
      localStorage.setItem('contextiq_web_settings_v1', JSON.stringify(state));
    } catch {}
  }, [state]);

  useEffect(() => {
    const root = document.documentElement;
    if (state.darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [state.darkMode]);

  const actions: SettingsActions = {
    setProfile: (name, email) => setState((s: any) => ({ ...s, name, email })),
    setNotifications: (v) => setState((s: any) => ({ ...s, notifications: v })),
    setDarkMode: (v) => setState((s: any) => ({ ...s, darkMode: v })),
    setLanguage: (language) => setState((s: any) => ({ ...s, language })),
    setConnected: (key, v) =>
      setState((s: any) => ({ ...s, connected: { ...s.connected, [key]: v } })),
    disconnectAll: () =>
      setState((s: any) => ({ ...s, connected: { slack: false, teams: false, discord: false, gmail: false } })),
  };

  return (
    <SettingsContext.Provider value={{ ...state, ...actions }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
