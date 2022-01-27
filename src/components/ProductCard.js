import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {colors, text} from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductCard = ({style, image, name, amount, rating}) => {
  return (
    <TouchableOpacity style={{...styles.container, ...style}}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.productImage}
      />
      <View style={{height: 80}}>
        <Text style={styles.productName}>{name}</Text>
        <View style={{...styles.row, marginTop: 'auto', marginBottom: 7}}>
          <Icon
            name="star"
            size={18}
            color={rating > 0 ? colors.gold : colors.neutral}
            style={styles.starIcon}
          />
          <Icon
            name="star"
            size={18}
            color={rating > 1 ? colors.gold : colors.neutral}
            style={styles.starIcon}
          />
          <Icon
            name="star"
            size={18}
            color={rating > 2 ? colors.gold : colors.neutral}
            style={styles.starIcon}
          />
          <Icon
            name="star"
            size={18}
            color={rating > 3 ? colors.gold : colors.neutral}
            style={styles.starIcon}
          />
          <Icon
            name="star"
            size={18}
            color={rating > 4 ? colors.gold : colors.neutral}
          />
        </View>
      </View>
      <View style={{marginTop: 'auto'}}>
        <Text style={styles.amount}>
          ₦{amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </Text>
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
    height: 300,
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
  starIcon: {
    marginRight: 2,
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
