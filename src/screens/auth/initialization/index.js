/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/loader';
// import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {colors} from '../../../styles';

const Initialization = () => {
  // const navigation = useNavigation();

  // const [loading, setLoading] = useState(false);

  // const checkAuth = async () => {
  //   setLoading(true);
  //   try {
  //     setLoading(false);
  //     const auth = JSON.parse(await AsyncStorage.getItem('persist:root'));
  //     const user = JSON.parse(auth.currentUser);
  //     //   console.log('user: ', user);

  //     if (user) {
  //       navigation.navigate('Dashboard');
  //       // console.log('auth:', user.currentUser);
  //       // console.log(user);
  //     } else {
  //       navigation.navigate('Landing');
  //     }
  //   } catch (err) {
  //     setLoading(false);
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   checkAuth();
  //   // AsyncStorage.removeItem('persist:auth'); // for removing items in AsyncStorage
  // }, []);

  return <Loader animating={true} containerStyle={Styles.container} />;
  // return <Loader animating={loading} containerStyle={Styles.container} />;
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});

export default Initialization;
