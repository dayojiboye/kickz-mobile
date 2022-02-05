/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {colors, text} from '../styles';
import Rating from './Rating';
import {formatPrice} from '../utils/helpers';

const ProductCard = ({style, image, name, amount, rating, onPress}) => {
  return (
    <TouchableOpacity
      style={{...styles.container, ...style}}
      onPress={() => onPress?.()}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.productImage}
      />
      <View style={{minHeight: 80}}>
        <Text style={styles.productName}>{name}</Text>
        <Rating rating={rating} />
      </View>
      <View style={{marginTop: 'auto'}}>
        <Text style={styles.amount}>{formatPrice(amount)}</Text>
        <View style={styles.row}>
          <Text style={styles.originalPrice}>₦534.33</Text>
          <Text style={styles.discount}>24% Off</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    height: 330,
    width: 200,
    backgroundColor: colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.fade,
    padding: 16,
  },
  productImage: {
    width: '100%',
    height: 130,
    marginBottom: 8,
  },
  productName: {
    fontSize: 17,
    color: colors.textPrimary,
    ...text.bold,
    lineHeight: 22,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  amount: {
    color: colors.primary,
    ...text.semiBold,
    fontSize: 15,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    fontSize: 13,
    color: colors.ghost,
    marginRight: 16,
    ...text.medium,
  },
  discount: {
    fontSize: 13,
    color: colors.red,
    ...text.semiBold,
  },
});
