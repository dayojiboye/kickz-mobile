/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback,
  Share,
} from 'react-native';
import {colors, text} from '../styles';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {handleFetchProduct} from '../utils/products.helpers';
import {formatPrice, hapticOptions} from '../utils/helpers';
import {Fab, useToast} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomReactionButton from '../components/CustomReactionButton';
import Rating from '../components/Rating';
import {shoeSizes, reviews, megaSales} from '../utils/mock';
import SizeTag from '../components/SizeTag';
import Review from '../components/Review';
import ProductCard from '../components/ProductCard';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import CustomToast from '../components/CustomToast';
import AddToCartBottomSheet from '../components/bottom-sheets/AddToCartBottomSheet';

const {width} = Dimensions.get('window');

export default function ProductScreen({route, navigation}) {
  const {id} = route.params;
  const offset = React.useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [shouldShowBackButton, setShouldShowBackButton] = React.useState(false);
  const [shouldShowAddToCartButton, setShouldShowAddToCartButton] =
    React.useState(false);
  const Toast = useToast();
  const addToCartBottomSheetRef = React.useRef(null);

  const headerHeight = offset.interpolate({
    inputRange: [0, 200 + insets.top],
    outputRange: [280 + insets.top, insets.top + 50],
    extrapolate: 'clamp',
  });

  const handleBackButtonPress = () => {
    setShouldShowBackButton(false);
    setShouldShowAddToCartButton(false);
    navigation.goBack();
  };

  React.useEffect(() => {
    let isApiSubcribed = true;
    // fetch product
    const getProductData = async () => {
      try {
        const response = await handleFetchProduct(id);
        setData(response);
      } catch (err) {
        Toast.show({
          render: () => <CustomToast text={err.message} variant="error" />,
          placement: 'top-left',
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    // doing this because the back button still appears after navigating away and before the component is fully transitioned into
    setTimeout(() => {
      setShouldShowBackButton(true);
      setShouldShowAddToCartButton(true);
    }, 200);

    if (isApiSubcribed) getProductData();
    // effect cleanup
    return () => {
      isApiSubcribed = false;
      setShouldShowBackButton(false);
      setShouldShowAddToCartButton(false);
    };
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <SafeAreaView
        forceInset={{top: 'always'}}
        edges={['top']}
        style={styles.container}>
        {shouldShowBackButton ? (
          <Fab
            placement="top-left"
            icon={<Icon name="arrow-left" size={18} color={colors.white} />}
            padding={0}
            style={styles.floatingButton}
            onPress={() => handleBackButtonPress()}
          />
        ) : null}
        {!data && loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{marginTop: 14}}
          />
        ) : (
          <>
            <Animated.Image
              style={{...styles.headerImage, height: headerHeight}}
              source={{
                uri: data?.thumbnail,
              }}
            />
            <ScrollView
              style={{flex: 1}}
              contentContainerStyle={styles.innerContainer}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: offset}}}],
                {useNativeDriver: false},
              )}>
              <View style={{...styles.row, paddingHorizontal: 16}}>
                <Text style={styles.productName}>{data?.name}</Text>
                <CustomReactionButton />
              </View>
              {/* rating */}
              <Rating rating={4} style={{marginTop: 16, marginLeft: 16}} />
              {/* price */}
              <Text style={styles.price}>{formatPrice(data?.price)}</Text>
              {/* size selection */}
              <Text
                style={{...styles.headingText, marginLeft: 16, marginTop: 40}}>
                Select Size
              </Text>
              <ScrollView
                horizontal
                style={{width: width}}
                contentContainerStyle={{paddingLeft: 16}}
                showsHorizontalScrollIndicator={false}>
                {shoeSizes?.map(item => (
                  <SizeTag key={item} size={item} />
                ))}
              </ScrollView>
              {/* description */}
              <View style={styles.description}>
                <Text style={styles.headingText}>Specification</Text>
                <Text style={styles.text}>{data?.desc}</Text>
              </View>
              {/* review product */}
              <View
                style={{...styles.row, marginTop: 40, paddingHorizontal: 16}}>
                <Text style={{...styles.headingText, marginBottom: 0}}>
                  Review Product
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      ...styles.headingText,
                      color: colors.primary,
                      ...text.semiBold,
                      fontSize: 14,
                      marginBottom: 0,
                    }}>
                    See More
                  </Text>
                </TouchableOpacity>
              </View>
              {/* ratings */}
              <View
                style={{
                  ...styles.row,
                  marginTop: 16,
                  paddingHorizontal: 16,
                  justifyContent: 'flex-start',
                }}>
                <Rating rating={4} style={{marginBottom: 0, marginRight: 10}} />
                <Text style={styles.smallText}>4.5 (5 Reviews)</Text>
              </View>
              {/* reviews */}
              {reviews?.map(item => (
                <Review
                  key={item.id}
                  {...item}
                  style={{paddingHorizontal: 16}}
                />
              ))}
              {/* other products */}
              <Text
                style={{...styles.headingText, marginLeft: 16, marginTop: 40}}>
                You Might Also Like
              </Text>
              <ScrollView
                horizontal
                style={{width: width}}
                contentContainerStyle={{paddingLeft: 16}}
                showsHorizontalScrollIndicator={false}>
                {megaSales?.map(item => (
                  <ProductCard
                    key={item.name}
                    amount={item.amount}
                    name={item.name}
                    image={item.image}
                    rating={item.rating}
                    style={styles.productCard}
                  />
                ))}
              </ScrollView>
            </ScrollView>
          </>
        )}
        <AddToCartBottomSheet refProp={addToCartBottomSheetRef} />
      </SafeAreaView>
      {/* add to cart floating animation button */}
      {shouldShowAddToCartButton && data ? (
        <FloatingButtonExpand
          onPress={() => addToCartBottomSheetRef?.current?.open()}
        />
      ) : null}
    </>
  );
}

const FloatingButtonExpand = ({onPress}) => {
  const animatedValueRef = React.useRef(new Animated.Value(0));
  const [isExpand, setIsExpand] = React.useState(false);
  const Toast = useToast();

  React.useEffect(() => {
    return () => setIsExpand(false);
  }, []);

  // toggle the expansion
  const toggleOpen = () => {
    ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
    const toValue = isExpand ? 0 : 1;

    Animated.timing(animatedValueRef.current, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setIsExpand(!isExpand);
  };

  // bookmark button interpolate
  const bookmarkInterpolate = animatedValueRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -70],
  });

  // share button interpolate
  const shareInterpolate = animatedValueRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -140],
  });

  // bookmark button animated style
  const bookmarkStyle = {
    transform: [
      {
        scale: animatedValueRef.current,
      },
      {
        translateY: bookmarkInterpolate,
      },
    ],
  };

  // share button animated style
  const shareStyle = {
    transform: [
      {
        scale: animatedValueRef.current,
      },
      {
        translateY: shareInterpolate,
      },
    ],
  };

  // scale interpolate for hidden animated background
  const scaleInterpolate = animatedValueRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  // hidden animated background animation style
  const hiddenBackgroundStyle = {
    transform: [
      {
        scale: scaleInterpolate,
      },
    ],
  };

  // share handler
  const shareHandler = () => {
    Share.share({
      message: 'With Love From Dee ❤️',
    });
    toggleOpen();
  };

  // bookmark handler
  const bookmarkHandler = () => {
    Toast.show({
      render: () => <CustomToast text="Item has been bookmarked! ✅" />,
      placement: 'top-left',
      duration: 3000,
    });
    toggleOpen();
  };

  // cart handler - should bring out a bottom sheet
  const cartHandler = () => {
    // do anything here
    onPress?.();
  };

  return (
    <>
      <Animated.View style={[styles.hiddenBackground, hiddenBackgroundStyle]} />
      <TouchableWithoutFeedback onPress={() => shareHandler()}>
        <Animated.View
          style={[
            styles.floatingCartButton,
            styles.otherFloatingButton,
            shareStyle,
          ]}>
          <IconMaterial name="share-outline" size={27} color={colors.primary} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => bookmarkHandler()}>
        <Animated.View
          style={[
            styles.floatingCartButton,
            styles.otherFloatingButton,
            bookmarkStyle,
          ]}>
          <IconMaterial
            name="bookmark-outline"
            size={27}
            color={colors.primary}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      {isExpand ? (
        <TouchableWithoutFeedback
          onPress={() => {
            toggleOpen();
          }}
          onLongPress={() => {
            toggleOpen();
          }}>
          <View
            style={{...styles.floatingCartButton, ...styles.addToCartButton}}>
            <IconMaterial name="close" size={27} color={colors.white} />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          onLongPress={() => toggleOpen()}
          onPress={() => cartHandler()}>
          <View
            style={{...styles.floatingCartButton, ...styles.addToCartButton}}>
            <IconMaterial name="cart-outline" size={27} color={colors.white} />
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productName: {
    ...text.bold,
    fontSize: 24,
    color: colors.textPrimary,
    lineHeight: 32,
    width: '70%',
  },
  floatingButton: {
    height: 40,
    width: 40,
    padding: 0,
    top: 44,
    backgroundColor: '#0723233A',
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  innerContainer: {
    paddingTop: 300,
    paddingBottom: 100,
  },
  price: {
    marginTop: 16,
    marginLeft: 16,
    fontSize: 20,
    color: colors.primary,
    ...text.bold,
  },
  headingText: {
    fontSize: 18,
    color: colors.textPrimary,
    ...text.semiBold,
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  text: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 24,
    ...text.regular,
  },
  description: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  smallText: {
    fontSize: 12,
    color: colors.textPrimary,
    ...text.regular,
  },
  productCard: {
    marginRight: 16,
  },
  floatingCartButton: {
    bottom: 100,
    right: 16,
    padding: 0,
    height: 60,
    width: 60,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowOffset: {x: 2, y: 0},
    shadowRadius: 5,
    zIndex: 55,
    elevation: 9,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
  },
  otherFloatingButton: {
    backgroundColor: colors.white,
  },
  hiddenBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    width: 60,
    height: 60,
    bottom: 100,
    right: 16,
    borderRadius: 30,
  },
  closeExpandLabel: {
    fontSize: 25,
    color: colors.white,
    ...text.bold,
  },
});
