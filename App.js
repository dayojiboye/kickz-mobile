/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

// import {StyleSheet, Text, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigation/auth';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from './store/actions';
import {auth, firestore} from './firebase/utils';

const App = () => {
  const dispatch = useDispatch();

  const {currentUser} = useSelector(state => {
    return {
      currentUser: state.auth.currentUser,
    };
  });

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async user => {
      if (user) {
        dispatch(actions.getUserAdditionalData(user));
      }

      dispatch(actions.setCurrentUser(user));
    });

    return () => authListener();
  }, []);

  useEffect(() => {
    if (currentUser?.uid) {
      const unsubscribe = firestore
        .collection('users')
        .doc(currentUser.uid)
        .onSnapshot(doc => {
          dispatch(actions.setCurrentUser(doc.data()));
        });

      return () => unsubscribe();
    }
  }, []);

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
