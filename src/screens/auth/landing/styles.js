import {StyleSheet} from 'react-native';
import {text, colors, config} from '../../../styles';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageBg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  imageOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  imageTextContainer: {
    position: 'absolute',
    top: '20%',
    left: 50,
  },

  brand: {
    width: 200,
    height: 110,
    resizeMode: 'contain',
    marginBottom: -20,
  },

  brandMotto: {
    ...text.semiBold,
    color: colors.white,
    fontSize: 14,
    marginLeft: 20,
  },

  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    height: 280,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },

  bottomHeader: {
    ...text.bold,
    fontSize: 24,
    color: colors.black,
    textAlign: 'center',
  },

  signupBtn: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 13,
  },

  loginBtn: {
    alignSelf: 'center',
    backgroundColor: colors.fade,
  },

  skipBtn: {
    alignSelf: 'center',
    marginTop: 32,
    backgroundColor: 'transparent',
    width: 'auto',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export default Styles;
