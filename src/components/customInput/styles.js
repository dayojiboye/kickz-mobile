import {StyleSheet} from 'react-native';

import {config} from '../../styles';

const Styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },

  textInput: {
    ...config.textInput,
  },

  inputIcon: {
    position: 'absolute',
    right: 13,
    top: 13,
    zIndex: 10,
  },

  errorInput: {
    ...config.errorInput,
  },

  errorText: {
    ...config.errorText,
  },
});

export default Styles;
