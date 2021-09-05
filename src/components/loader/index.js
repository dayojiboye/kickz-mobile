import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Styles from './styles';
import {colors} from '../../styles';

const Loader = () => {
  return (
    <View style={Styles.loader}>
      <ActivityIndicator animating={true} color={colors.primary} size="large" />
    </View>
  );
};

export default Loader;
