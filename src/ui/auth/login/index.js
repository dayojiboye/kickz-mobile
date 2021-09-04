/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import Styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  SafeAreaView,
  View,
  Pressable,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  Keyboard,
} from 'react-native';
import {colors, config} from '../../../styles';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../../components/customInput';
import {Formik, Field} from 'formik';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import * as yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../../store/actions';
import AlertView from '../../../components/alertView';

const Login = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {currentUser, loading, error} = useSelector(state => {
    return {
      currentUser: state.auth.currentUser,
      loading: state.auth.loading,
      error: state.auth.error,
    };
  });

  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email('Email you entered is not valid!')
      .matches(emailRegExp, 'Email you entered is not valid!')
      .required('Please enter your email!'),
    password: yup
      .string()
      .trim()
      .required('Please enter your password!')
      .min(6, 'Password must be at least 6 characters long!'),
  });

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(actions.authError(null));
      }, 7000);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(actions.authError(null));
    };
  }, []);

  return (
    <SafeAreaView style={Styles.safeArea}>
      <AlertView
        show={error}
        text={error}
        variant="danger"
        click={() => dispatch(actions.authError(null))}
      />

      <StatusBar backgroundColor={colors.primary} />

      <View style={Styles.header}>
        <Pressable
          style={Styles.backBtn}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="left" color={colors.primary} size={25} />
          <Text style={Styles.backText}>Back</Text>
        </Pressable>

        <Text style={Styles.headerText}>Login</Text>
      </View>

      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values =>
          dispatch(
            actions.signin({
              email: values.email,
              password: values.password,
            }),
          )
        }>
        {({handleSubmit, isValid}) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={Styles.keyboardContainer}>
            <View style={Styles.formWrapper}>
              <ScrollView style={[Styles.signupForm]} bounces={false}>
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email Address"
                  iconName="mail"
                  keyboardType="email-address"
                />

                <Field
                  component={CustomInput}
                  name="password"
                  placeholder="Password"
                  isPassword
                />
              </ScrollView>
            </View>

            <Pressable
              style={[Styles.formBtn, loading ? config.disabledBtn : '']}
              disabled={loading}
              onPress={() => {
                ReactNativeHapticFeedback.trigger('impactLight', options);
                handleSubmit();
                Keyboard.dismiss();
              }}>
              <Text style={Styles.formBtnText}>Log in</Text>
            </Pressable>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Login;
