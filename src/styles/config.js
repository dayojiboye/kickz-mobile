import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {text} from './text';

export const config = StyleSheet.create({
  roundedBtn: {
    borderRadius: 3,
    paddingHorizontal: 12,
    paddingVertical: 14,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // for text input

  textInput: {
    width: '100%',
    borderColor: colors.ghost,
    borderRadius: 3,
    borderWidth: 1,
    height: 45,
    paddingLeft: 12,
    paddingRight: 40,
    color: colors.black,
    fontSize: 15,
  },

  errorInput: {
    borderColor: colors.red,
  },

  errorText: {
    color: colors.red,
    fontSize: 13,
    ...text.regular,
    marginTop: 5,
  },

  disabledBtn: {
    backgroundColor: colors.ghost,
  },
});
