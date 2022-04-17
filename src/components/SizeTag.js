import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, text} from '../styles';

export default function SizeTag({selected, style, size}) {
  const [isSelected, setSelected] = React.useState(selected);

  return (
    <TouchableOpacity
      style={[styles.container(isSelected), {...style}]}
      onPress={() => setSelected(!isSelected)}>
      <Text style={styles.text(isSelected)}>{size}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: selected => ({
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48 / 2,
    marginRight: 16,
    borderColor: selected ? colors.primary : colors.ghost,
    borderWidth: selected ? 1.5 : 1,
    backgroundColor: selected ? colors.primary : 'transparent',
  }),
  text: selected => ({
    fontSize: 14,
    color: selected ? colors.white : colors.textPrimary,
    ...text.semiBold,
  }),
});
