/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as actions from '../../../../store/actions';
import Loader from '../../../components/loader';

const Account = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const {loading, currentUser} = useSelector(state => {
    return {
      loading: state.auth.loading,
      currentUser: state.auth.currentUser,
    };
  });

  const logout = () => {
    dispatch(actions.signout());
  };

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate('Login');
    }
  }, [currentUser]);

  return (
    <>
      <View style={Styles.container}>
        <Text>This is the account page!</Text>
        {currentUser && <Text>{currentUser.displayName}</Text>}

        <TouchableOpacity onPress={logout}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
      {loading && <Loader />}
    </>
  );
};

export default Account;
