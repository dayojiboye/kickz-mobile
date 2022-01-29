import React from 'react';
import {useSelector} from 'react-redux';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {DashboardNav} from './dashboard';

// screens
import Shop from '../screens/Shop';

// auth screens
import Landing from '../screens/auth/landing';
import Signup from '../screens/auth/signup';
import Login from '../screens/auth/login';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  const {currentUser} = useSelector(state => {
    return {
      currentUser: state.auth.currentUser,
    };
  });

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      {currentUser ? (
        <>
          <AuthStack.Screen name="Dashboard" component={DashboardNav} />
        </>
      ) : (
        <>
          <AuthStack.Screen name="Landing" component={Landing} />
          <AuthStack.Screen name="Signup" component={Signup} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Shop" component={Shop} />
        </>
      )}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
