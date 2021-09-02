import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens

// auth screens
import Landing from '../ui/auth/landing';
import Signup from '../ui/auth/signup';
import Login from '../ui/auth/login';

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
          animation: 'fade',
        }}
        name="Landing"
        component={Landing}
      />

      <AuthStack.Screen
        options={{
          title: '',
          headerShown: false,
          animation: 'slide_from_right',
        }}
        name="Signup"
        component={Signup}
      />

      <AuthStack.Screen
        options={{
          title: '',
          headerShown: false,
          animation: 'slide_from_right',
        }}
        name="Login"
        component={Login}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
