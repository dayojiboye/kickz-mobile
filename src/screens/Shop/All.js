/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {handleFetchProducts} from '../../utils/products.helpers';
import ProductCard from '../../components/ProductCard';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {colors} from '../../styles';

export default function All() {
  const [products, setProducts] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [refreshLoading, setRefreshLoading] = React.useState(false);
  const navigation = useNavigation();
  const flatlistRef = React.useRef(null);

  // fetch products handler
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await handleFetchProducts(null);
      setProducts(response);
    } catch (err) {
      // take care of error
      console.log(err);
    } finally {
      setLoading(false);
      setRefreshLoading(false);
    }
  };

  // load more products
  const handleLoadMoreProducts = async () => {
    if (products?.isLastPage) return;
    setLoading(true);
    try {
      const response = await handleFetchProducts(
        null,
        products?.latestDoc,
        products?.data,
      );
      setProducts(response);
    } catch (err) {
      // take care of error
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      flatlistRef?.current?.scrollToOffset({animated: false, offset: 0});
      let isApiSubcribed = true;
      if (isApiSubcribed) {
        fetchProducts();
      }
      return () => {
        isApiSubcribed = false;
      };
    }, []),
  );

  const renderItem = ({item}) => (
    <ProductCard
      image={item.thumbnail}
      rating={4}
      amount={item.price}
      name={item.name}
      style={styles.gridItem}
      onPress={() =>
        navigation.navigate('ProductScreen', {
          id: item.documentID,
        })
      }
    />
  );

  // TODO - move this FlatList to its own component
  return (
    <FlatList
      data={products?.data}
      renderItem={renderItem}
      onRefresh={() => {
        setRefreshLoading(true);
        fetchProducts();
      }}
      refreshing={refreshLoading}
      onEndReached={() => handleLoadMoreProducts()}
      onEndReachedThreshold={0.1}
      initialNumToRender={6}
      keyExtractor={(item, index) => index}
      enableOnAndroid
      numColumns={2}
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
      contentContainerStyle={styles.container}
      columnWrapperStyle={{
        justifyContent: 'space-between',
      }}
      ListFooterComponent={<ProductListFooter loading={loading} />}
      scrollIndicatorInsets={{right: 1}}
      ref={flatlistRef}
    />
  );
}

// products list footer
const ProductListFooter = ({loading}) => {
  if (!loading) return null;

  return (
    <View style={{paddingVertical: 20, marginVertical: 10}}>
      <ActivityIndicator animating size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 50,
  },
  gridItem: {
    width: '47.7%',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
