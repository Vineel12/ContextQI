import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';

const STORAGE_KEY = 'contextiq_profile_v1';

export default function Profile() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@gmail.com');

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const { name: n, email: e } = JSON.parse(raw);
          if (n) setName(n);
          if (e) setEmail(e);
        }
      } catch {}
    })();
  }, []);

  const save = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email }));
    Alert.alert('Saved', 'Your profile has been updated.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your name" placeholderTextColor="#64748b" />
        <Text style={[styles.label, { marginTop: 12 }]}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="you@example.com" placeholderTextColor="#64748b" />
        <Pressable onPress={save} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0b1220' },
  card: { backgroundColor: 'rgba(30,41,59,0.8)', borderRadius: 16, padding: 16 },
  label: { color: '#cbd5e1', fontSize: 12, marginBottom: 6 },
  input: { backgroundColor: 'rgba(15,23,42,0.6)', color: 'white', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: 'rgba(148,163,184,0.25)' },
  button: { backgroundColor: '#4f46e5', paddingVertical: 12, borderRadius: 12, marginTop: 16, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '600' }
});
