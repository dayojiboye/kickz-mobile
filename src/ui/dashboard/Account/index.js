/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as actions from '../../../../store/actions';
import Loader from '../../../components/loader';
import {WithLocalSvg} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../../styles';

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
      <ScrollView style={Styles.container} bounces={false}>
        <View style={Styles.profileWrapper}>
          <View style={Styles.avatar}>
            <WithLocalSvg
              width="100%"
              height="100%"
              asset={require('../../../assets/images/man.svg')}
            />
          </View>

          {currentUser && (
            <View style={Styles.userInfo}>
              <Text style={Styles.username}>{currentUser.displayName}</Text>
              <Text style={Styles.userEmail}>{currentUser.email}</Text>
              <TouchableOpacity
                style={Styles.logoutBtn}
                onPress={logout}
                activeOpacity={0.7}>
                <Icon color={colors.red} size={16} name="log-out" />
                <Text style={Styles.logoutBtnText}>Log out</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {loading && <Loader />}
    </>
  );
};

export default Account;
