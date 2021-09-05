import React from 'react';
import {View, Text} from 'react-native';
import Styles from './styles';

const Header = ({title}) => {
  return (
    <View style={Styles.header}>
      <Text style={Styles.headerText}>{title}</Text>
    </View>
  );
};

export default Header;
