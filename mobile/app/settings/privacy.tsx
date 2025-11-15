import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const SETTINGS_KEY = 'contextiq_settings_v1';

export default function PrivacySecurity() {
  const disconnectAll = async () => {
    const raw = (await AsyncStorage.getItem(SETTINGS_KEY)) || '{}';
    const prev = JSON.parse(raw);
    const next = {
      ...prev,
      connected: { slack: false, teams: false, discord: false, gmail: false },
    };
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  };

  const disableNotifications = async () => {
    const raw = (await AsyncStorage.getItem(SETTINGS_KEY)) || '{}';
    const prev = JSON.parse(raw);
    const next = { ...prev, notifications: false };
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Manage your data and security preferences.</Text>
        <Pressable onPress={disconnectAll} style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>Disconnect all</Text>
        </Pressable>
        <Pressable onPress={disableNotifications} style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>Disable notifications</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0b1220' },
  card: { backgroundColor: 'rgba(30,41,59,0.8)', borderRadius: 16, padding: 16, gap: 12 },
  text: { color: '#cbd5e1', fontSize: 14 },
  buttonOutline: { borderWidth: 1, borderColor: 'rgba(148,163,184,0.3)', borderRadius: 12, paddingVertical: 10, alignItems: 'center' },
  buttonOutlineText: { color: '#cbd5e1', fontWeight: '600' }
});
