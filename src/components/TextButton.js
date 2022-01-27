/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, text} from '../styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const TextButton = ({
  style,
  label,
  iconElement,
  labelStyle,
  onPress,
  disabled,
  hasHapticFeedback,
}) => {
  return (
    <TouchableOpacity
      style={{
        opacity: disabled ? 0.8 : 1,
        ...styles.container,
        ...style,
      }}
      disabled={disabled}
      onPress={() => {
        onPress?.();
        if (hasHapticFeedback) {
          ReactNativeHapticFeedback.trigger('impactLight', options);
        }
      }}>
      {iconElement ? iconElement : null}
      <Text style={{...styles.label, ...labelStyle}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  label: {
    color: colors.primary,
    ...text.medium,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
