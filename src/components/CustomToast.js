import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Toast} from 'native-base';

const {width} = Dimensions.get('window');

export default function CustomToast({variant, text, ...props}) {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'error':
        return '#f44336';
      case 'success':
        return '#4ECC4E';
      case 'warning':
        return '#FFA500';
      case 'info':
        return '#8D6CFA';
      default:
        return '#4ECC4E';
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: getBackgroundColor()}]}>
      <Text style={styles.toastText} numberOfLines={3}>
        {text}
      </Text>
      <TouchableOpacity
        onPress={() => Toast.closeAll()}
        style={styles.closeIcon}>
        <Icon name="close" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 65,
    maxHeight: 90,
    width: width - 40,
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    transform: [{translateY: Platform.OS === 'ios' ? 10 : -30}],
    paddingHorizontal: 10,
    zIndex: 1000,
    borderRadius: 10,
  },
  toastText: {
    color: '#fff',
    fontSize: 15,
    // letterSpacing: 0.4,
    textAlign: 'left',
    fontFamily: 'EuclidCircularB-Regular',
    maxWidth: width - 100,
  },
  closeIcon: {
    right: 20,
    zIndex: 10,
    position: 'absolute',
  },
});
