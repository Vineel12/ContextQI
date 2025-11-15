import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';

export default function HelpSupport() {
  const email = () => Linking.openURL('mailto:support@contextiq.example');
  const docs = () => Linking.openURL('https://example.com/docs');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>FAQs</Text>
        <Text style={styles.text}>How to connect platforms, manage notifications, and view insights.</Text>
        <Pressable onPress={docs} style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>Open docs</Text>
        </Pressable>
        <Text style={[styles.heading, { marginTop: 12 }]}>Contact</Text>
        <Text style={styles.text}>Reach us anytime for help.</Text>
        <Pressable onPress={email} style={styles.button}>
          <Text style={styles.buttonText}>Email Support</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0b1220' },
  card: { backgroundColor: 'rgba(30,41,59,0.8)', borderRadius: 16, padding: 16 },
  heading: { color: 'white', fontSize: 16, fontWeight: '700', marginBottom: 6 },
  text: { color: '#cbd5e1' },
  button: { backgroundColor: '#4f46e5', paddingVertical: 12, borderRadius: 12, marginTop: 12, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '600' },
  buttonOutline: { borderWidth: 1, borderColor: 'rgba(148,163,184,0.3)', borderRadius: 12, paddingVertical: 10, alignItems: 'center', marginTop: 8 },
  buttonOutlineText: { color: '#cbd5e1', fontWeight: '600' }
});
