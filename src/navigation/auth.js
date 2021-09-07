import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DashboardNav} from './dashboard';

// auth screens
import Initialization from '../ui/auth/initialization';
import Landing from '../ui/auth/landing';
import Signup from '../ui/auth/signup';
import Login from '../ui/auth/login';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Initialization"
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        options={{
          title: '',
          headerShown: false,
          animation: 'fade',
        }}
        name="Initialization"
        component={Initialization}
      />

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

      <AuthStack.Screen
        options={{
          title: '',
          headerShown: false,
          animation: 'slide_from_right',
        }}
        name="Dashboard"
        component={DashboardNav}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
