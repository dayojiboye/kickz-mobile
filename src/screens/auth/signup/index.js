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
import * as actions from '../../../../store/actions';
import AlertView from '../../../components/alertView';
import CustomButton from '../../../components/CustomButton';
import TextButton from '../../../components/TextButton';
import {SafeAreaView} from 'react-native-safe-area-context';

const Signup = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const regForm = useRef(null);

  const {currentUser, loading, error} = useSelector(state => {
    return {
      currentUser: state.auth.currentUser,
      loading: state.auth.loading,
      error: state.auth.error,
    };
  });

  const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const validationSchema = yup.object().shape({
    displayName: yup
      .string()
      .trim()
      .min(2, 'Username must be at least 2 characters')
      .required('Please enter a username!'),
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
    confirm: yup
      .string()
      .trim()
      .required('Please confirm your password!')
      .when('password', {
        is: val => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf(
            [yup.ref('password')],
            'The two passwords that you entered do not match!',
          ),
      }),
  });

  useEffect(() => {
    if (currentUser) {
      navigation.navigate('Dashboard');
    }
  }, [currentUser]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(actions.authError(null));
      }, 7000);
    }
  }, [error]);

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      regForm.current.resetForm();
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
          <Text style={Styles.headerText}>Let's get started</Text>
          <Text style={Styles.smallHeaderText}>Create a new account</Text>
        </View>
      </SafeAreaView>
      <Formik
        validationSchema={validationSchema}
        innerRef={regForm}
        initialValues={{
          displayName: '',
          email: '',
          password: '',
          confirm: '',
        }}
        onSubmit={values => {
          dispatch(
            actions.signup({
              email: values.email,
              password: values.password,
              displayName: values.displayName,
            }),
          );
        }}>
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
                    name="displayName"
                    placeholder="Username"
                    iconName="user"
                  />

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

                  <Field
                    component={CustomInput}
                    name="confirm"
                    placeholder="Confirm Password"
                    isPassword
                    containerStyle={Styles.lastInput}
                  />
                </ScrollView>
              </View>

              <View style={Styles.bottomView}>
                <CustomButton
                  label="Register"
                  style={Styles.formBtn}
                  disabled={loading}
                  loading={loading}
                  hasHapticFeedback
                  onPress={() => {
                    handleSubmit();
                    Keyboard.dismiss();
                  }}
                />

                <View style={Styles.bottomInfo}>
                  <Text style={Styles.bottomTextLeft}>
                    Do you have an account?
                  </Text>
                  <TextButton
                    label="Sign in"
                    onPress={() => navigation.navigate('Login')}
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

export default Signup;
