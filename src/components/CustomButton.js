/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {colors, text} from '../styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const CustomButton = ({
  style,
  label,
  iconElement,
  labelStyle,
  onPress,
  loading,
  disabled,
  hasHapticFeedback,
  ...props
}) => {
  const handlePress = () => {
    if (disabled || loading) return;
    onPress?.();
    if (hasHapticFeedback) {
      ReactNativeHapticFeedback.trigger('impactLight', options);
    }
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: disabled || loading ? colors.ghost : colors.primary,
        ...styles.container,
        ...style,
      }}
      disabled={disabled}
      onPress={() => handlePress()}
      {...props}>
      {iconElement ? iconElement : null}
      <Text style={{...styles.label, ...labelStyle}}>{label}</Text>
      {loading ? (
        <ActivityIndicator
          color={colors.white}
          animating={true}
          style={{marginLeft: 7}}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    paddingHorizontal: 12,
    paddingVertical: 14,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  label: {
    color: colors.white,
    ...text.bold,
    fontSize: 14,
  },
});
