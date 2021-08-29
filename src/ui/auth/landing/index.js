import React, {useState, useEffect} from 'react';

import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';

import Styles from './styles';

const Landing = () => {
  const [bounceValue] = useState(new Animated.Value(230));
  const [hidden, setHidden] = useState(true);

  const toggleBottomView = () => {
    let toValue = 230;

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
            <TouchableOpacity style={Styles.signupBtn} activeOpacity={0.7}>
              <Text style={Styles.signupText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Styles.loginBtn} activeOpacity={0.7}>
              <Text style={Styles.loginText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Landing;
