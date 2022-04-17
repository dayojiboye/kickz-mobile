import React from 'react';
import {Dimensions, Platform} from 'react-native';
import {Toast} from 'native-base';
import CustomToast from '../components/CustomToast';

// check if a phone is an iphone with a notch
export const isIphoneWithNotch = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
};

// get random integer between two values
export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

// default haptic feedback options
export const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

// format price
export const formatPrice = amount => {
  return `₦${amount?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};

// Custom Toast Renderer
export const ShowCustomToast = ({message, text, type, duration}) => {
  Promise.resolve(Toast?.closeAll()).then(() => {
    Toast.show({
      render: () => <CustomToast text={message || text} variant={type} />,
      placement: 'top',
      duration: duration || 2000,
      order: 'first',
    });
  });
};

// Format Firebase Error Message
export const formatErrorMessage = text => {
  return text?.replace(/ *\[[^\]]*]/, '');
};
