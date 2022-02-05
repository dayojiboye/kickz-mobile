/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, text} from '../styles';

export default function SizeTag({selected, style, size}) {
  const [isSelected, setSelected] = React.useState(selected);

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...style,
        borderColor: isSelected ? colors.primary : colors.ghost,
        borderWidth: isSelected ? 1.5 : 1,
      }}
      onPress={() => setSelected(!isSelected)}>
      <Text style={styles.text}>{size}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 48 / 2,
    marginRight: 16,
  },
  text: {
    fontSize: 14,
    color: colors.textPrimary,
    ...text.semiBold,
  },
});
