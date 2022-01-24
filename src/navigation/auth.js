import React from 'react';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {DashboardNav} from './dashboard';

// screens
import Shop from '../screens/Shop';

// auth screens
import Initialization from '../screens/auth/initialization';
import Landing from '../screens/auth/landing';
import Signup from '../screens/auth/signup';
import Login from '../screens/auth/login';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  const {hasFetched, currentUser} = useSelector(state => {
    return {
      hasFetched: state.auth.hasFetched,
      currentUser: state.auth.currentUser,
    };
  });

  return (
    <AuthStack.Navigator
      initialRouteName="Initialization"
      screenOptions={{headerShown: false}}>
      {!hasFetched && !currentUser ? (
        <AuthStack.Screen
          options={{
            title: '',
            headerShown: false,
            animation: 'fade',
          }}
          name="Initialization"
          component={Initialization}
        />
      ) : null}

      {currentUser ? (
        <>
          <AuthStack.Screen
            options={{
              title: '',
              headerShown: false,
              animation: 'slide_from_right',
            }}
            name="Dashboard"
            component={DashboardNav}
          />
        </>
      ) : (
        <>
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
            name="Shop"
            component={Shop}
          />
        </>
      )}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
