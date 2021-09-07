import {StyleSheet} from 'react-native';
import {colors, text} from '../../styles';

const Styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: colors.fade,
    borderBottomWidth: 1,
  },

  headerText: {
    ...text.bold,
    color: colors.black,
    fontSize: 25,
  },
});

export default Styles;
