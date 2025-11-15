import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ContextIQ Mobile</Text>
      <Link href="/settings" style={styles.link}>Go to Settings</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b1220' },
  title: { fontSize: 24, color: 'white', marginBottom: 12 },
  link: { color: '#818cf8', fontSize: 16 }
});
