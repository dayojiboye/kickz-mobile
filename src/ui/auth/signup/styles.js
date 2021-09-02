import {StyleSheet} from 'react-native';
import {colors, text, config} from '../../../styles';

const Styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backText: {
    color: colors.primary,
    ...text.semiBold,
    fontSize: 20,
    marginLeft: 10,
  },

  headerText: {
    marginTop: 60,
    color: colors.primary,
    ...text.bold,
    fontSize: 23,
    textAlign: 'center',
  },

  keyboardContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  signupForm: {
    flex: 1,
    paddingVertical: 25,
  },

  lastInput: {
    marginBottom: 30,
  },

  formBtn: {
    ...config.roundedBtn,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    width: '100%',
    marginTop: 'auto',
    marginBottom: 20,
  },

  formBtnText: {
    ...text.bold,
    color: colors.white,
    fontSize: 14,
  },
});

export default Styles;
