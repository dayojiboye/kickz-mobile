import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {colors, text} from '../styles';
import LinearGradient from 'react-native-linear-gradient';

export default function FlashCard({title, image, style}) {
  return (
    <View style={{...styles.container, ...style}}>
      <ImageBackground
        source={{
          uri: image,
        }}
        borderRadius={5}
        resizeMode="cover"
        style={styles.flashSaleBg}>
        <LinearGradient
          style={styles.gradient}
          colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.6)']}>
          <Text style={styles.cardHeaderText}>{title}</Text>
          <View style={{...styles.row, marginTop: 'auto'}}>
            <View style={styles.timeBlock}>
              <Text style={styles.flashSaleCount}>08</Text>
            </View>
            <Text
              style={{
                color: colors.white,
                fontSize: 14,
                marginHorizontal: 4,
                ...text.semiBold,
              }}>
              :
            </Text>
            <View style={styles.timeBlock}>
              <Text style={styles.flashSaleCount}>34</Text>
            </View>
            <Text
              style={{
                color: colors.white,
                fontSize: 14,
                marginHorizontal: 4,
                ...text.semiBold,
              }}>
              :
            </Text>
            <View style={styles.timeBlock}>
              <Text style={styles.flashSaleCount}>52</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    width: '100%',
    height: 206,
  },
  flashSaleBg: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '100%',
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  cardHeaderText: {
    color: colors.white,
    ...text.bold,
    fontSize: 26,
    maxWidth: 209,
    lineHeight: 36,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBlock: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  flashSaleCount: {
    ...text.bold,
    fontSize: 16,
    color: colors.textPrimary,
  },
});
