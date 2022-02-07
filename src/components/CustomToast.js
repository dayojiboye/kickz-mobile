/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import {Host, Portal} from 'react-native-portalize';
import {colors} from '../styles';

const {width} = Dimensions.get('window');

export default function CustomToast({variant, text, iconColor, ...props}) {
  return (
    <Host>
      <Portal>
        <View
          style={{
            ...styles.container,
            backgroundColor: variant === 'error' ? 'red' : 'green',
          }}>
          <Text style={styles.toastText}>{text}</Text>
        </View>
      </Portal>
    </Host>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 105 : 115,
    width,
    backgroundColor: 'green',
    opacity: Platform.OS === 'ios' ? 0.8 : 1,
    position: 'absolute',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    top: 0,
    left: 0,
    transform: [{translateY: -60}],
    padding: 20,
    zIndex: 1000,
  },
  toastText: {
    color: colors.white,
    fontSize: 16,
    letterSpacing: 0.4,
    textAlign: 'center',
    fontFamily: 'EuclidCircularB-Regular',
  },
  toastIcon: {
    fontSize: 18,
    marginRight: 10,
  },
});
