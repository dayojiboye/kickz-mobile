import React, {useState} from 'react';

import {TextInput, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../styles';
import Styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';

// two types of input, the one configured to use formik field and the one not configured to use formik field

const CustomInput = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    iconName,
    isPassword,
    containerStyle,
    isNotInAForm,
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  const [showPass, setShowPass] = useState(true);

  return (
    <View style={[Styles.inputContainer, containerStyle]}>
      {isNotInAForm ? (
        <TextInput
          style={Styles.textInput}
          placeholderTextColor={colors.ghost}
          {...inputProps}
        />
      ) : (
        <>
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
        </>
      )}
    </View>
  );
};

export default CustomInput;
