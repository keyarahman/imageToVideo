import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type PrimaryButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
};

export function PrimaryButton({ onPress, children, style }: PrimaryButtonProps) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <LinearGradient
        colors={['#FF7A1A', '#F373FB']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}>
        {children}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    shadowColor: '#F373FB',
    shadowOpacity: 0.5,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  gradient: {
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
});


