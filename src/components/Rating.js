import {StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const Rating = ({style, rating}) => {
  return (
    <View style={{...styles.container, ...style}}>
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
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 7,
  },
  starIcon: {
    marginRight: 2,
  },
});
