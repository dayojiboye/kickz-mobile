/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigation/auth';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from './src/store/actions';
// import {auth, firestore} from './firebase/utils';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Initialization from './src/screens/auth/initialization';

const App = () => {
  const dispatch = useDispatch();

  const {currentUser, hasFetched} = useSelector(state => {
    return {
      currentUser: state.auth.currentUser,
      hasFetched: state.auth.hasFetched,
    };
  });

  useEffect(() => {
    const authListener = auth().onAuthStateChanged(async user => {
      if (user) {
        dispatch(actions.getUserAdditionalData(user));
      }

      dispatch(actions.setCurrentUser(user));
    });

    return () => authListener();
  }, []);

  useEffect(() => {
    if (currentUser?.uid) {
      const unsubscribe = firestore()
        .collection('users')
        .doc(currentUser.uid)
        .onSnapshot(doc => {
          dispatch(actions.setCurrentUser(doc?.data()));
        });

      return () => unsubscribe();
    }
  }, []);

  if (!hasFetched && !currentUser) return <Initialization />;

  return (
    <NavigationContainer
      onReady={() => {
        RNBootSplash.hide({fade: true});
      }}>
      <SafeAreaProvider>
        <AuthNavigator />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
