import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../theme/Theme';

export type ThemedButtonProps = {
  title: string;
  variant?: 'primary' | 'outline';
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function ThemedButton({ title, variant = 'primary', onPress, style, textStyle }: ThemedButtonProps) {
  const { colors } = useTheme();
  const base: ViewStyle = {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  };
  const primary: ViewStyle = { backgroundColor: colors.primary };
  const outline: ViewStyle = { borderColor: colors.borderStrong, borderWidth: StyleSheet.hairlineWidth };
  const color = variant === 'primary' ? '#fff' : (colors.muted as string);

  return (
    <Pressable onPress={onPress} style={[base, variant === 'primary' ? primary : outline, style]}>
      <Text style={[styles.text, { color }, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: { fontWeight: '600' },
});
