import React, {useState} from 'react';

import {TextInput, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../styles';
import Styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';

// two types of input, the one configured to use formik field and the one not configured to use formik field

export default function CustomInput({isNotInAForm, style, ...props}) {
  if (isNotInAForm) {
    return (
      <TextInput
        style={[Styles.textInput, {...style}]}
        placeholderTextColor={colors.ghost}
        {...props}
      />
    );
  }

  return <FormInput {...props} />;
}

const FormInput = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    iconName,
    isPassword,
    containerStyle,
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  const [showPass, setShowPass] = useState(true);

  return (
    <View style={[Styles.inputContainer, containerStyle]}>
      <TextInput
        style={[Styles.textInput, hasError && Styles.errorInput]}
        placeholderTextColor={colors.ghost}
        value={value || ''}
        onChangeText={text => onChange(name)(text)}
        secureTextEntry={isPassword && showPass}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />

      {iconName && !isPassword && (
        <View style={Styles.inputIcon}>
          <Icon
            name={iconName}
            size={20}
            color={hasError ? colors.red : colors.ghost}
          />
        </View>
      )}

      {isPassword && (
        <View style={Styles.inputIcon}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowPass(!showPass)}>
            <IconFeather
              name={showPass ? 'eye-off' : 'eye'}
              size={20}
              color={hasError ? colors.red : colors.ghost}
            />
          </TouchableOpacity>
        </View>
      )}

      {hasError && <Text style={Styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};
