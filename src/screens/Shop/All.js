/* eslint-disable curly */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {handleFetchProducts} from '../../utils/products.helpers';
import {useFocusEffect} from '@react-navigation/native';
import {colors} from '../../styles';
import ErrorComponent from '../../components/ErrorComponent';
import ProductsFlatList from '../../components/ProductsFlatList';

export default function All() {
  const [products, setProducts] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [refreshLoading, setRefreshLoading] = React.useState(false);
  const [errorState, setErrorState] = React.useState(false);
  const flatlistRef = React.useRef(null);

  // fetch products handler
  const fetchProducts = async () => {
    setLoading(true);
    setErrorState(false);
    try {
      const response = await handleFetchProducts(null);
      setProducts(response);
    } catch (err) {
      setErrorState(true);
    } finally {
      setLoading(false);
      setRefreshLoading(false);
    }
  };

  // load more products
  const handleLoadMoreProducts = async () => {
    if (products?.isLastPage) return;
    setLoading(true);
    setErrorState(false);
    try {
      const response = await handleFetchProducts(
        null,
        products?.latestDoc,
        products?.data,
      );
      setProducts(response);
    } catch (err) {
      setErrorState(true);
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

  return (
    <View style={styles.container}>
      <RenderErrorComponent
        isVisible={errorState && !loading}
        onPress={() => fetchProducts()}
      />
      <ProductsFlatList
        refProp={flatlistRef}
        data={products?.data}
        loading={loading}
        refreshLoading={refreshLoading}
        isVisible={!errorState}
        onRefresh={() => {
          setRefreshLoading(true);
          fetchProducts();
        }}
        onLoadMore={() => handleLoadMoreProducts()}
      />
    </View>
  );
}

const RenderErrorComponent = ({isVisible, onPress}) => {
  return isVisible ? (
    <View style={styles.errorContainer}>
      <ErrorComponent onPress={() => onPress?.()} />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
