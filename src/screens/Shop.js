/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, text} from '../styles';
import {SafeAreaView} from 'react-native-safe-area-context';

const Shop = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headingText}>Shop</Text>
      </View>
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>Welcome to the Shop Screen 👋🏽</Text>
        <TouchableOpacity
          style={styles.logout}
          onPress={() => navigation.goBack()}>
          <Text style={{color: colors.white, fontSize: 16, ...text.medium}}>
            Go back
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Shop;

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
    borderRadius: 3,
    backgroundColor: colors.primary,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    marginTop: 16,
  },
});
