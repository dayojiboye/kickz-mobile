/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../store/actions';
import {colors, text} from '../styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import {totalCartPrice} from '../utils/cart.helpers';
import {formatPrice} from '../utils/helpers';
import Icon from 'react-native-vector-icons/Entypo';

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
            <View key={index} style={styles.product}>
              <Image
                style={styles.productImage}
                source={{uri: item?.thumbnail}}
              />
              <View style={{marginLeft: 16, flex: 1}}>
                <Text style={styles.productName}>{item?.name}</Text>
                <Text style={styles.amount}>{formatPrice(item?.price)}</Text>
                <View style={[styles.row, {marginTop: 10}]}>
                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item?.documentID)}>
                    <Icon name="trash" color={colors.red} size={25} />
                  </TouchableOpacity>
                  <View style={[styles.row, {marginLeft: 20}]}>
                    <TouchableOpacity
                      disabled={item?.quantity === 50}
                      onPress={() =>
                        increaseItemHandler({
                          ...item,
                          quantity: 1,
                        })
                      }>
                      <Icon
                        name="circle-with-plus"
                        color={
                          item?.quantity === 50 ? colors.fade : colors.primary
                        }
                        size={25}
                      />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item?.quantity}</Text>
                    <TouchableOpacity
                      disabled={item?.quantity === 1}
                      onPress={() => decreaseItemHandler(item)}>
                      <Icon
                        name="circle-with-minus"
                        color={
                          item?.quantity === 1 ? colors.fade : colors.primary
                        }
                        size={25}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
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
  product: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.fade,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  productImage: {
    height: 100,
    width: 100,
    borderRadius: 7,
  },
  productName: {
    ...text.medium,
    fontSize: 18,
    color: colors.textPrimary,
    maxWidth: 150,
    lineHeight: 22,
  },
  amount: {
    ...text.regular,
    color: colors.textPrimary,
    fontSize: 15,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    ...text.medium,
    fontSize: 16,
    color: colors.textPrimary,
    width: 30,
    textAlign: 'center',
  },
});
