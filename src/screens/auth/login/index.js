/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import Styles from './styles';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../../styles';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../../components/customInput';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions';
import AlertView from '../../../components/alertView';
import CustomButton from '../../../components/CustomButton';
import TextButton from '../../../components/TextButton';
import {SafeAreaView} from 'react-native-safe-area-context';

const Login = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const loginForm = useRef(null);

  const {currentUser, loading, error} = useSelector(state => {
    return {
      currentUser: state.auth.currentUser,
      loading: state.auth.loading,
      error: state.auth.error,
    };
  });

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
    if (currentUser) {
      navigation.navigate('Dashboard');
    }
  }, [currentUser]);

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      loginForm.current.resetForm();
      Keyboard.dismiss();
    });

    const unSub2 = navigation.addListener('blur', () => {
      dispatch(actions.authError(null));
    });

    return () => {
      unsub();
      unSub2();
    };
  }, [navigation]);

  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <AlertView
        show={error}
        text={error}
        variant="danger"
        click={() => dispatch(actions.authError(null))}
      />
      <SafeAreaView edges={['top']}>
        <View style={Styles.header}>
          <Text style={Styles.headerText}>Welcome to Kickz</Text>
          <Text style={Styles.smallHeaderText}>Sign in to continue</Text>
        </View>
      </SafeAreaView>
      <Formik
        validationSchema={validationSchema}
        innerRef={loginForm}
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
            <TouchableOpacity
              style={Styles.touchableWrapper}
              activeOpacity={1}
              onPress={() => {
                Keyboard.dismiss();
              }}>
              <View style={Styles.formWrapper}>
                <ScrollView style={[Styles.signupForm]} bounces={false}>
                  <Field
                    component={CustomInput}
                    name="email"
                    placeholder="Email Address"
                    iconName="mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <Field
                    component={CustomInput}
                    name="password"
                    placeholder="Password"
                    isPassword
                  />
                </ScrollView>
              </View>
              <View style={Styles.bottomView}>
                <CustomButton
                  label="Log in"
                  style={Styles.formBtn}
                  hasHapticFeedback
                  disabled={loading}
                  loading={loading}
                  onPress={() => {
                    handleSubmit();
                    Keyboard.dismiss();
                  }}
                />
                <View style={Styles.bottomInfo}>
                  <Text style={Styles.bottomTextLeft}>
                    Don't have an account?
                  </Text>
                  <TextButton
                    label="Register"
                    onPress={() => navigation.navigate('Signup')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </>
  );
};

export default Login;
