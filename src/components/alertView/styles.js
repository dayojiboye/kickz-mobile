import {StyleSheet} from 'react-native';
import {colors, text} from '../../styles';

const Styles = StyleSheet.create({
  alertView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 'auto',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    zIndex: 120,
    justifyContent: 'flex-end',
  },

  alertError: {
    backgroundColor: colors.red,
  },

  alertSuccess: {
    backgroundColor: 'green',
  },

  alertText: {
    color: colors.white,
    ...text.medium,
    fontSize: 15,
    textAlign: 'center',
  },

  alertDismissBtn: {
    borderRadius: 3,
    paddingHorizontal: 12,
    paddingVertical: 14,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  alertBtnText: {
    ...text.semiBold,
    color: colors.white,
    fontSize: 15,
  },
});

export default Styles;
