import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import * as actions from '../store/actions';
import {colors, text} from '../styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';

const Cart = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(actions.signout());
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headingText}>Cart</Text>
      </View>
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>Welcome to the Cart Screen 👋🏽</Text>
        <CustomButton
          label="Log out"
          style={styles.logout}
          hasHapticFeedback
          onPress={() => logout()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;

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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: colors.black,
    ...text.medium,
  },
  logout: {
    padding: 16,
    width: '60%',
    marginTop: 16,
  },
});
