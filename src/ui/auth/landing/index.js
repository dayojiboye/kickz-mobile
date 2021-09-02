import React, {useState, useEffect} from 'react';

import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {useNavigation} from '@react-navigation/native';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

import Styles from './styles';

const Landing = () => {
  const navigation = useNavigation();

  const [bounceValue] = useState(new Animated.Value(280));
  const [hidden, setHidden] = useState(true);

  const toggleBottomView = () => {
    let toValue = 280;

    if (hidden) {
      toValue = 0;
    }

    Animated.spring(bounceValue, {
      toValue: toValue,
      velocity: 3,
      tension: 30,
      friction: 8,
      useNativeDriver: true,
    }).start();

    setHidden(true);
  };

  useEffect(() => {
    setTimeout(() => {
      toggleBottomView();
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={Styles.container}>
      <ImageBackground
        source={require('../../../assets/images/landing-image2.jpeg')}
        resizeMode="cover"
        style={Styles.imageBg}>
        <View style={Styles.imageOverlay}>
          <View style={Styles.imageTextContainer}>
            <Image
              source={require('../../../../assets/bootsplash-logo.png')}
              style={Styles.brand}
            />
            <Text style={Styles.brandMotto}>...walk with confidence</Text>
          </View>

          <Animated.View
            style={[
              Styles.bottomView,
              {transform: [{translateY: bounceValue}]},
            ]}>
            <Text style={Styles.bottomHeader}>Start shopping with Kickz</Text>
            <TouchableOpacity
              style={Styles.signupBtn}
              activeOpacity={0.7}
              onPress={() => {
                ReactNativeHapticFeedback.trigger('impactLight', options);
                navigation.navigate('Signup');
              }}>
              <Text style={Styles.signupText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Styles.loginBtn}
              activeOpacity={0.7}
              onPress={() => {
                ReactNativeHapticFeedback.trigger('impactLight', options);
                navigation.navigate('Login');
              }}>
              <Text style={Styles.loginText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={Styles.skipBtn}
              onPress={() => {
                ReactNativeHapticFeedback.trigger('impactLight', options);
              }}>
              <Text style={Styles.skipBtnText}>Skip to our catalogue</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Landing;
