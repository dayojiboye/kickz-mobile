/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, ActivityIndicator, FlatList} from 'react-native';
import React from 'react';
import ProductCard from './ProductCard';
import {useNavigation} from '@react-navigation/native';

export default function ProductsFlatList({
  isVisible,
  loading,
  data,
  onRefresh,
  onLoadMore,
  refProp,
  refreshLoading,
}) {
  const navigation = useNavigation();

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

  return isVisible ? (
    <FlatList
      data={data}
      renderItem={renderItem}
      onRefresh={() => onRefresh?.()}
      refreshing={refreshLoading}
      onEndReached={() => onLoadMore?.()}
      onEndReachedThreshold={0.1}
      initialNumToRender={6}
      keyExtractor={(item, index) => index}
      enableOnAndroid
      numColumns={2}
      style={{flex: 1}}
      contentContainerStyle={styles.container}
      columnWrapperStyle={{
        justifyContent: 'space-between',
      }}
      ListFooterComponent={<ProductListFooter loading={loading} />}
      scrollIndicatorInsets={{right: 1}}
      ref={refProp}
    />
  ) : null;
}

const ProductListFooter = ({loading}) => {
  if (!loading) return null;

  return (
    <View style={styles.listFooter}>
      <ActivityIndicator animating size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  gridItem: {
    width: '47.7%',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listFooter: {
    paddingVertical: 20,
    marginVertical: 10,
  },
});
