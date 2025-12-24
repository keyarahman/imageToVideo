import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type DescriptionBoxProps = {
  text: string;
  iconName?: keyof typeof Ionicons.glyphMap;
};

export function DescriptionBox({ text, iconName = 'videocam-outline' }: DescriptionBoxProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.iconBubble}>
        <Ionicons name={iconName} size={18} color="#ffffff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 8,
    backgroundColor: '#111021',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#25233a',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  text: {
    flex: 1,
    color: '#d0cde9',
    fontSize: 14,
    lineHeight: 20,
  },
  iconBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#262042',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});


