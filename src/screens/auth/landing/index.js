/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

import {Text, View, ImageBackground, Image, Animated} from 'react-native';
import CustomButton from '../../../components/CustomButton';

import {useNavigation} from '@react-navigation/native';

import Styles from './styles';
import {colors} from '../../../styles';

const Landing = () => {
  const navigation = useNavigation();

  const [bounceValue] = useState(new Animated.Value(280));

  useEffect(() => {
    setTimeout(() => {
      Animated.spring(bounceValue, {
        toValue: 0,
        velocity: 3,
        tension: 30,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }, 500);
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
            <CustomButton
              label="Get Started"
              style={Styles.signupBtn}
              onPress={() => navigation.navigate('Signup')}
              hasHapticFeedback
            />

            <CustomButton
              label="Login"
              style={Styles.loginBtn}
              labelStyle={{color: colors.primary}}
              onPress={() => navigation.navigate('Login')}
              hasHapticFeedback
            />

            <CustomButton
              label="Skip to our catalogue"
              style={Styles.skipBtn}
              labelStyle={{fontSize: 18, color: colors.primary}}
              onPress={() => navigation.navigate('Shop')}
              hasHapticFeedback
            />
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Landing;
