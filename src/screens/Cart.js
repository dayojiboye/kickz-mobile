/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../store/actions';
import {colors, text} from '../styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import {totalCartPrice} from '../utils/cart.helpers';
import {formatPrice} from '../utils/helpers';
import CartItem from '../components/CartItem';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart?.cart);
  const [cartTotalPrice, setCartTotalPrice] = React.useState(0);

  const handleRemoveItem = id => {
    dispatch(actions.removeCartItem(id));
  };

  const increaseItemHandler = item => {
    dispatch(actions.addToCart(item));
  };

  const decreaseItemHandler = item => {
    dispatch(actions.reduceCartItem(item));
  };

  React.useEffect(() => {
    setCartTotalPrice(totalCartPrice(cart));
  }, [cart]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headingText}>Cart</Text>
      </View>
      {cart?.length > 0 ? (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={styles.innerContainer}>
          {cart?.map((item, index) => (
            <CartItem
              key={index}
              product={item}
              onRemoveItem={id => handleRemoveItem(id)}
              onIncreaseItem={prod => increaseItemHandler(prod)}
              onDecreaseItem={prod => decreaseItemHandler(prod)}
            />
          ))}
        </ScrollView>
      ) : null}
      <View style={styles.footer}>
        <Text style={styles.totalAmountText}>
          Total:{' '}
          <Text style={{color: colors.primary}}>
            {formatPrice(cartTotalPrice)}
          </Text>
        </Text>
        <CustomButton label="Check out" hasHapticFeedback />
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
  innerContainer: {
    paddingBottom: 100,
  },
  footer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'center',
    height: 'auto',
    alignItems: 'center',
    marginTop: 'auto',
  },
  totalAmountText: {
    ...text.bold,
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
