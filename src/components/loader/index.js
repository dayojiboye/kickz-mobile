import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Styles from './styles';
import {colors} from '../../styles';

const Loader = ({animating, containerStyle}) => {
  return (
    <View style={[Styles.loader, {...containerStyle}]}>
      <ActivityIndicator
        animating={animating ? animating : true}
        color={colors.primary}
        size="large"
      />
    </View>
  );
};

export default Loader;
