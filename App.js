/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

// import {StyleSheet, Text, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigation/auth';

const App = () => {
  return (
    <NavigationContainer
      onReady={() => {
        RNBootSplash.hide();
      }}>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default App;
