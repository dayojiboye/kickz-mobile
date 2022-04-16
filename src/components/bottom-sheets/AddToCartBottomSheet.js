import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomInput from '../customInput';
import {colors, text} from '../../styles';
import CustomButton from '../CustomButton';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';

export default function AddToCartBottomSheet({refProp}) {
  const [quantity, setQuantity] = React.useState('1');
  const [buttonPressed, setButtonPressed] = React.useState(false);

  const handleAddToCart = () => {
    // setButtonPressed(true);
    onCloseBottomSheet();
  };

  const onCloseBottomSheet = () => {
    setQuantity('1');
    refProp?.current?.close();
  };

  React.useEffect(() => {
    // onBlur, do not snap the bottom sheet to the bottom
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
          <Text style={styles.text}>Add to cart</Text>
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
    marginTop: 20,
    height: 70,
  },
  button: {
    marginTop: 40,
    width: '100%',
    height: 60,
  },
});
