/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, text} from '../styles';
import Icon from 'react-native-vector-icons/Entypo';
import {formatPrice} from '../utils/helpers';

export default function CartItem({
  product,
  onRemoveItem,
  onIncreaseItem,
  onDecreaseItem,
  style,
}) {
  return (
    <View style={[styles.container, {...style}]}>
      <Image style={styles.productImage} source={{uri: product?.thumbnail}} />
      <View style={{marginLeft: 16, flex: 1}}>
        <Text style={styles.productName}>{product?.name}</Text>
        <Text style={styles.amount}>{formatPrice(product?.price)}</Text>
        <View style={[styles.row, {marginTop: 10}]}>
          <TouchableOpacity onPress={() => onRemoveItem?.(product?.documentID)}>
            <Icon name="trash" color={colors.red} size={25} />
          </TouchableOpacity>
          <View style={[styles.row, {marginLeft: 20}]}>
            <TouchableOpacity
              disabled={product?.quantity === 50}
              onPress={() =>
                onIncreaseItem?.({
                  ...product,
                  quantity: 1,
                })
              }>
              <Icon
                name="circle-with-plus"
                color={product?.quantity === 50 ? colors.fade : colors.primary}
                size={25}
              />
            </TouchableOpacity>
            <Text style={styles.quantity}>{product?.quantity}</Text>
            <TouchableOpacity
              disabled={product?.quantity === 1}
              onPress={() => onDecreaseItem?.(product)}>
              <Icon
                name="circle-with-minus"
                color={product?.quantity === 1 ? colors.fade : colors.primary}
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.fade,
    paddingLeft: 20,
    paddingVertical: 10,
    minHeight: 100,
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
  // swipeable row
});
