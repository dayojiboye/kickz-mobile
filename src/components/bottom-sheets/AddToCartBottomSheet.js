/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomInput from '../customInput';
import {colors, text} from '../../styles';
import CustomButton from '../CustomButton';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import * as actions from '../../store/actions/index';
import {ShowCustomToast} from '../../utils/helpers';

export default function AddToCartBottomSheet({refProp, product}) {
  const [quantity, setQuantity] = React.useState('1');
  const [buttonPressed, setButtonPressed] = React.useState(false);

  const dispatch = useDispatch();

  const onCloseBottomSheet = () => {
    setQuantity('1');
    refProp?.current?.close();
  };

  const increaseQuantity = () => {
    if (quantity === '50') return;
    setQuantity(String(parseInt(quantity) + 1));
  };

  const decreaseQuantity = () => {
    if (quantity === '1') return;
    setQuantity(String(parseInt(quantity) - 1));
  };

  const handleAddToCart = () => {
    // setButtonPressed(true);
    dispatch(
      actions.addToCart({
        ...product,
        quantity: parseInt(quantity),
      }),
    );
    ShowCustomToast({
      text: 'Item has been added to cart',
      type: 'success',
    });
    onCloseBottomSheet();
  };

  React.useEffect(() => {
    // on blur, do not snap the bottom sheet to the bottom
    if (buttonPressed) {
      setTimeout(() => {
        setButtonPressed(false);
      }, 1000);
    }
  }, []);

  return (
    <Portal>
      <Modalize
        ref={refProp}
        modalStyle={styles.modalContainer}
        modalHeight={710}
        snapPoint={300}
        scrollViewProps={{
          nestedScrollEnabled: true,
          scrollEnabled: false,
        }}
        panGestureComponentEnabled={false}
        handleStyle={{top: 30, backgroundColor: colors.ghost}}
        onOverlayPress={() => onCloseBottomSheet()}
        onBackButtonPress={() => onCloseBottomSheet()}>
        <View style={styles.container}>
          {/* <Text style={styles.text}>Add to cart</Text> */}
          <View style={[styles.row, {height: 70, marginTop: 20}]}>
            <CustomInput
              isNotInAForm
              placeholder="Quantity"
              style={styles.input}
              onFocus={() => refProp?.current?.open('top')}
              onBlur={() => !buttonPressed && refProp?.current?.open('bottom')}
              value={quantity}
              onChangeText={text => setQuantity(text)}
              keyboardType="numeric"
            />
            <View style={styles.controllerContainer}>
              <TouchableOpacity onPress={() => increaseQuantity()}>
                <Icon name="caretup" color={colors.primary} size={22} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => decreaseQuantity()}>
                <Icon name="caretdown" color={colors.primary} size={22} />
              </TouchableOpacity>
            </View>
          </View>
          <CustomButton
            label="Add To Cart"
            style={styles.button}
            hasHapticFeedback
            disabled={!quantity.trim()}
            onPress={() => handleAddToCart()}
          />
        </View>
      </Modalize>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.white,
    flex: 0.9,
  },
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  text: {
    ...text.bold,
    fontSize: 20,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  button: {
    marginTop: 40,
    width: '100%',
    height: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controllerContainer: {
    marginLeft: 10,
    height: '100%',
    justifyContent: 'center',
  },
});
