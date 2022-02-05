import {StyleSheet, TouchableOpacity, Animated} from 'react-native';
import React from 'react';
import {colors} from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SVGElement from './SVGElement';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {hapticOptions} from '../utils/helpers';

export default function CustomReactionButton({
  style,
  onPress,
  iconElement,
  width,
  height,
  hasUserReacted,
  iconName,
  iconColor,
}) {
  const [selectedReaction, setSelectedReaction] =
    React.useState(hasUserReacted);
  const [scale, setScale] = React.useState(new Animated.Value(0));

  const triggerLike = () => {
    setSelectedReaction(!selectedReaction);
    Animated.spring(scale, {
      toValue: 2,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      scale.setValue(0);
    });
  };

  const bounceIcon = scale.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 0.8, 1],
  });

  const iconButtonStyle = {
    transform: [{scale: bounceIcon}],
  };

  return (
    <TouchableOpacity
      style={{...styles.container, ...style}}
      onPress={() => {
        ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
        onPress?.();
        triggerLike();
      }}>
      <Animated.View style={iconButtonStyle}>
        {iconElement ? (
          <SVGElement icon={iconElement} width={width} height={height} />
        ) : (
          <Icon
            size={25}
            name={iconName ? iconName : 'heart'}
            solid={selectedReaction ? true : false}
            color={
              selectedReaction && iconColor
                ? iconColor
                : selectedReaction && !iconColor
                ? colors.red
                : colors.borderColor
            }
          />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
});
