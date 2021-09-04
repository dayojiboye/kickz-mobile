import React, {useEffect, useRef} from 'react';
import {Animated, Text, TouchableOpacity} from 'react-native';
import Styles from './styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const AlertView = ({show, text, children, variant, click}) => {
  const showValue = useRef(new Animated.Value(-250)).current;

  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  useEffect(() => {
    Animated.spring(showValue, {
      toValue: show ? 0 : -250,
      velocity: 3,
      tension: 30,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [showValue, show]);

  return (
    <Animated.View
      style={[
        Styles.alertView,
        {transform: [{translateY: showValue}]},
        variant === 'danger' ? Styles.alertError : Styles.alertSuccess,
      ]}>
      <Text style={Styles.alertText}>{text || null}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          Styles.alertDismissBtn,
          variant === 'danger'
            ? Styles.alertDismissBtnError
            : Styles.alertDismissBtnSuccess,
        ]}
        onPress={() => {
          ReactNativeHapticFeedback.trigger('impactLight', options);
          click();
        }}>
        <Text style={Styles.alertBtnText}>Dismiss</Text>
      </TouchableOpacity>
      {children}
    </Animated.View>
  );
};

export default AlertView;
