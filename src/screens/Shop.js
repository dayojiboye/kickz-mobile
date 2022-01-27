import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, text} from '../styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';

const Shop = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headingText}>Shop</Text>
      </View>
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>Welcome to the Shop Screen 👋🏽</Text>
        <CustomButton
          label="Go back"
          style={styles.logout}
          hasHapticFeedback
          onPress={() => navigation.goBack()}
        />
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
    padding: 16,
    width: '60%',
    marginTop: 16,
  },
});
