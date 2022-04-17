import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, text} from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function ErrorComponent({errorText, onPress, iconSize, style}) {
  return (
    <View style={[styles.container, {...style}]}>
      <Icon
        name="exclamation-triangle"
        color={colors.primary}
        size={iconSize || 60}
      />
      <Text style={styles.text}>{errorText || 'An unknown error occured'}</Text>
      <TouchableOpacity style={styles.button} onPress={() => onPress?.()}>
        <Text style={styles.buttonText}>Please try again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 7,
    alignItems: 'center',
  },
  text: {
    ...text.regular,
    color: colors.textPrimary,
    fontSize: 17,
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    borderBottomWidth: 1.5,
    borderColor: colors.primary,
  },
  buttonText: {
    ...text.medium,
    color: colors.primary,
    fontSize: 17,
  },
});
