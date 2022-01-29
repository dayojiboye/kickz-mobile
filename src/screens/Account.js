/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import * as actions from '../store/actions';
import Icon from 'react-native-vector-icons/Feather';
import {colors, text} from '../styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import SVGElement from '../components/SVGElement';
import Avatar from '../assets/images/user_icon_circle.svg';

const Account = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(actions.signout());
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headingText}>Account</Text>
        <SVGElement icon={Avatar} width={50} height={50} />
      </View>
      <View style={{flex: 1, paddingTop: 15, paddingHorizontal: 15}}>
        <TouchableOpacity style={styles.links}>
          <Icon name="user" size={25} color={colors.primary} />
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.links}>
          <Icon name="shopping-bag" size={25} color={colors.primary} />
          <Text style={styles.text}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.links} onPress={() => logout()}>
          <Icon name="log-out" size={25} color={colors.red} />
          <Text style={{...styles.text, color: colors.red}}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    backgroundColor: colors.white,
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.fade,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingText: {
    ...text.bold,
    fontSize: 28,
    color: colors.black,
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  text: {
    marginLeft: 16,
    ...text.semiBold,
    color: colors.textPrimary,
    fontSize: 16,
  },
});
