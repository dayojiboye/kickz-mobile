import React from 'react';
import {useSelector} from 'react-redux';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {DashboardNav} from './dashboard';

// in app screens
import Shop from '../screens/Shop';
import ProductScreen from '../screens/ProductScreen';

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
          <AuthStack.Screen name="ProductScreen" component={ProductScreen} />
        </>
      ) : (
        <>
          <AuthStack.Screen name="Landing" component={Landing} />
          <AuthStack.Screen name="Signup" component={Signup} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Shop" component={Shop} />
          <AuthStack.Screen name="ProductScreen" component={ProductScreen} />
        </>
      )}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
