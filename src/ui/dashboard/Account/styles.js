import {StyleSheet} from 'react-native';
import {colors, text} from '../../../styles';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },

  profileWrapper: {
    flex: 0.6,
    alignItems: 'center',
    marginVertical: 30,
    flexDirection: 'row',
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginRight: 18,
  },

  username: {
    fontSize: 25,
    color: colors.secondaryBlack,
    ...text.bold,
  },

  userEmail: {
    fontSize: 18,
    color: colors.ghost,
    ...text.medium,
    marginBottom: 16,
  },

  logoutBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoutBtnText: {
    fontSize: 16,
    color: colors.red,
    ...text.medium,
    marginLeft: 7,
  },
});

export default Styles;
