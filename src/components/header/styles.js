import {StyleSheet} from 'react-native';
import {colors, text} from '../../styles';

const Styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  headerText: {
    ...text.bold,
    color: colors.white,
    fontSize: 25,
  },
});

export default Styles;
