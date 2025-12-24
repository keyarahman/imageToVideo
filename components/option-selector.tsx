import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type OptionSelectorProps = {
  value: string;
  options: string[];
  title: string;
  shape?: 'left' | 'middle' | 'right';
  style?: ViewStyle;
  onChange: (value: string) => void;
};

export function OptionSelector({
  value,
  options,
  title,
  shape = 'middle',
  style,
  onChange,
}: OptionSelectorProps) {
  const [visible, setVisible] = useState(false);

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  const handleSelect = (option: string) => (e: GestureResponderEvent) => {
    e.stopPropagation();
    onChange(option);
    close();
  };

  const chipShapeStyle =
    shape === 'left'
      ? styles.chipLeft
      : shape === 'right'
        ? styles.chipRight
        : styles.chipMiddle;

  return (
    <>
      <Pressable style={[styles.chip, chipShapeStyle, style]} onPress={open}>
        <Text style={styles.chipLabel}>{value}</Text>
        <Ionicons name="chevron-down" size={14} color="#ffffff" />
      </Pressable>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={close}>
        <Pressable style={styles.backdrop} onPress={close}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.sheetTitle}>{title}</Text>
            {options.map((option) => {
              const selected = option === value;
              return (
                <Pressable
                  key={option}
                  style={[styles.optionRow, selected && styles.optionRowSelected]}
                  onPress={handleSelect(option)}>
                  <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
                    {option}
                  </Text>
                  {selected && (
                    <Ionicons name="checkmark" size={18} color="#ffffff" style={styles.checkIcon} />
                  )}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  chip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#141623',
    borderColor: '#2c3042',
    borderWidth: 1,
  },
  chipLeft: {
    borderTopLeftRadius: 999,
    borderBottomLeftRadius: 999,
    marginRight: 8,
  },
  chipMiddle: {},
  chipRight: {
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
    marginLeft: 8,
  },
  chipLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    marginHorizontal: 16,
    marginBottom: 40,
    borderRadius: 32,
    backgroundColor: 'rgba(13, 16, 28, 0.98)',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#b0b3c8',
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  optionRowSelected: {},
  optionLabel: {
    fontSize: 18,
    color: '#e5e7f3',
  },
  optionLabelSelected: {
    fontWeight: '700',
  },
  checkIcon: {
    marginLeft: 12,
  },
});


