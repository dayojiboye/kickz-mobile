import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {colors, text} from '../styles';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function RecommendedProductCard({style}) {
  return (
    <TouchableOpacity
      style={{...styles.container, ...style}}
      activeOpacity={0.7}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bWVuJTIwc2hvZXN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        }}
        borderRadius={5}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <LinearGradient
          style={styles.gradient}
          colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.6)']}>
          <Text style={styles.cardHeaderText}>Recommended Product</Text>
          <Text style={styles.text}>We recommend the best for you</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 206,
    marginTop: 40,
  },
  backgroundImage: {
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
  text: {
    marginTop: 20,
    color: colors.white,
    ...text.medium,
    fontSize: 14,
  },
});
