/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Rating from './Rating';
import {colors, text} from '../styles';

export default function Review({style, name, image, rating, comment}) {
  return (
    <View style={{...styles.container, ...style}}>
      <View style={styles.row}>
        <Image style={styles.image} source={image} />
        <View style={{marginLeft: 14}}>
          <Text style={styles.name}>{name}</Text>
          <Rating rating={rating} style={{marginTop: 7, marginBottom: 0}} />
        </View>
      </View>
      <Text style={styles.text}>{comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    color: colors.textPrimary,
    ...text.semiBold,
    textTransform: 'capitalize',
  },
  text: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 24,
    marginTop: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
});
