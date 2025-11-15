import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';

const STORAGE_KEY = 'contextiq_settings_v1';

type SettingsState = {
  notifications: boolean;
  darkMode: boolean;
  language: string;
  connected: {
    slack: boolean;
    teams: boolean;
    discord: boolean;
    gmail: boolean;
  };
};

const defaultState: SettingsState = {
  notifications: true,
  darkMode: true,
  language: 'English',
  connected: { slack: true, teams: true, discord: false, gmail: false },
};

export default function Settings() {
  const [state, setState] = useState(defaultState);
  const [loading, setLoading] = useState(true as boolean);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setState({ ...defaultState, ...JSON.parse(raw) });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loading) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, loading]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.muted}>Loading…</Text>
      </View>
    );
  }

  const cycleLanguage = () => {
    const langs = ['English', 'Spanish', 'French', 'German', 'Japanese'];
    const i = langs.indexOf(state.language);
    const next = langs[(i + 1) % langs.length];
    setState((s: SettingsState) => ({ ...s, language: next }));
  };

  return (
    <View style={styles.container}>
      {/* Profile */}
      <Text style={styles.sectionLabel}>Profile</Text>
      <View style={styles.card}>
        <Link href="/settings/profile" asChild>
          <Pressable style={styles.row}>
            <Text style={styles.rowTitle}>John Doe</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </Link>
      </View>

      {/* Preferences */}
      <Text style={styles.sectionLabel}>Preferences</Text>
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.rowTitle}>Notifications</Text>
            <Text style={styles.muted}>Push notifications</Text>
          </View>
          <Switch value={state.notifications} onValueChange={(v: boolean) => setState((s: SettingsState) => ({ ...s, notifications: v }))} />
        </View>
        <View style={styles.divider} />
        <Pressable onPress={cycleLanguage} style={styles.rowBetween}>
          <View>
            <Text style={styles.rowTitle}>Language</Text>
            <Text style={styles.muted}>{state.language}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      </View>

      {/* Connected Platforms */}
      <Text style={styles.sectionLabel}>Connected Platforms</Text>
      <View style={styles.card}>
        {(
          [
            { key: 'slack', label: 'Slack' },
            { key: 'teams', label: 'Teams' },
            { key: 'discord', label: 'Discord' },
            { key: 'gmail', label: 'Gmail' },
          ] as const
        ).map(({ key, label }, idx) => (
          <View key={key}>
            {!!idx && <View style={styles.divider} />}
            <View style={styles.rowBetween}>
              <Text style={styles.rowTitle}>{label}</Text>
              <Switch
                value={state.connected[key]}
                onValueChange={(v: boolean) =>
                  setState((s: SettingsState) => ({ ...s, connected: { ...s.connected, [key]: v } }))
                }
              />
            </View>
          </View>
        ))}
      </View>

      {/* Other */}
      <Text style={styles.sectionLabel}>Other</Text>
      <View style={styles.card}>
        <Link href="/settings/privacy" asChild>
          <Pressable style={styles.rowBetween}>
            <Text style={styles.rowTitle}>Privacy & Security</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </Link>
        <View style={styles.divider} />
        <Link href="/settings/help" asChild>
          <Pressable style={styles.rowBetween}>
            <Text style={styles.rowTitle}>Help & Support</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0b1220' },
  center: { alignItems: 'center', justifyContent: 'center' },
  sectionLabel: { color: '#94a3b8', fontSize: 12, marginBottom: 8, marginLeft: 8 },
  card: { backgroundColor: 'rgba(30,41,59,0.8)', borderRadius: 16, padding: 12, marginBottom: 18 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  rowTitle: { color: 'white', fontSize: 14 },
  chevron: { color: '#64748b', fontSize: 20 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(100,116,139,0.2)', marginVertical: 6 },
  muted: { color: '#94a3b8' }
});
