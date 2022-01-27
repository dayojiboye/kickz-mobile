import {StyleSheet} from 'react-native';
import {colors, text, config} from '../../../styles';

const Styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  headerText: {
    color: colors.primary,
    ...text.bold,
    fontSize: 23,
    textAlign: 'center',
  },

  smallHeaderText: {
    marginTop: 13,
    alignSelf: 'center',
    color: colors.secondaryBlack,
    ...text.medium,
    fontSize: 15,
  },

  keyboardContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 16,
  },

  touchableWrapper: {
    flex: 1,
  },

  formWrapper: {
    flex: 1,
    paddingTop: 25,
  },

  signupForm: {
    flexGrow: 0,
  },

  lastInput: {
    marginBottom: 30,
  },

  bottomView: {
    marginTop: 'auto',
    marginBottom: 30,
  },

  formBtn: {
    alignSelf: 'center',
    width: '100%',
    marginBottom: 20,
  },

  bottomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomTextLeft: {
    color: colors.secondaryBlack,
    fontSize: 15,
    ...text.medium,
    marginRight: 7,
  },
});

export default Styles;
