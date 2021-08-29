import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens

// auth screens
import Landing from '../ui/auth/landing';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Landing"
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        options={{
          title: '',
          headerShown: false,
          stackAnimation: 'fade',
        }}
        name="OnBoarding"
        component={Landing}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
