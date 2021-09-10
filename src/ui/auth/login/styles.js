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

  // backBtn: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   alignSelf: 'flex-start',
  // },

  // backText: {
  //   color: colors.primary,
  //   ...text.semiBold,
  //   fontSize: 20,
  //   marginLeft: 10,
  // },

  headerText: {
    marginTop: 60,
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
    // maxHeight: 210,
    paddingTop: 25,
  },

  signupForm: {
    flexGrow: 0,
  },

  bottomView: {
    marginTop: 'auto',
  },

  formBtn: {
    ...config.roundedBtn,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  formBtnText: {
    ...text.bold,
    color: colors.white,
    fontSize: 14,
  },

  bottomInfo: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomTextLeft: {
    color: colors.secondaryBlack,
    fontSize: 15,
    ...text.medium,
  },

  registerLink: {
    marginLeft: 7,
  },

  registerLinkText: {
    fontSize: 15,
    ...text.medium,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});

export default Styles;
