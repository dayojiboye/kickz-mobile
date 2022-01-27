import React, {useEffect, useRef} from 'react';
import {Animated, Text} from 'react-native';
import Styles from './styles';
import CustomButton from '../CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';

const AlertView = ({show, text, children, variant, click}) => {
  const showValue = useRef(new Animated.Value(-250)).current;

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
      <SafeAreaView edges={['top']}>
        <Text style={Styles.alertText}>{text || null}</Text>
        <CustomButton
          activeOpacity={0.7}
          hasHapticFeedback
          style={Styles.alertDismissBtn}
          onPress={() => click?.()}
          labelStyle={Styles.alertBtnText}
          label="Dismiss"
        />
        {children}
      </SafeAreaView>
    </Animated.View>
  );
};

export default AlertView;
