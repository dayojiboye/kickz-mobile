/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {colors, text} from '../styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Menu} from 'native-base';
import Icon from 'react-native-vector-icons/EvilIcons';
import * as actions from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import ProductCard from '../components/ProductCard';

const Shop = ({navigation}) => {
  const [showDropdown, setDropdown] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState('Show All');
  const filterCategories = ['Show All', 'Women', 'Men'];
  const dispatch = useDispatch();

  const {products, loading} = useSelector(state => {
    return {
      products: state.products.products,
      loading: state.products.loading,
    };
  });

  const {data, latestDoc, isLastPage} = products;

  // handle select filter
  const selectFilter = category => {
    if (selectedFilter === category) {
      return;
    }
    setSelectedFilter(category);
  };

  // fetch products handler
  const handleFetchProducts = () => dispatch(actions.fetchProducts(true));

  // load more products
  const handleLoadMoreProducts = () => {
    if (isLastPage) return;
    dispatch(actions.fetchProducts(true, null, latestDoc, data));
  };

  // fetch products on mount
  React.useEffect(() => {
    handleFetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headingText}>Shop</Text>
      </View>
      <View style={{marginTop: 16, paddingHorizontal: 16}}>
        <Menu
          style={styles.dropdown}
          shouldOverlapWithTrigger={false}
          onOpen={() => setDropdown(true)}
          onClose={() => setDropdown(false)}
          placement="bottom left"
          trigger={triggerProps => {
            return (
              <TouchableOpacity style={styles.dropdownButton} {...triggerProps}>
                <Text style={{...styles.filterText, fontSize: 16}}>
                  {selectedFilter}
                </Text>
                <Icon
                  name={showDropdown ? 'chevron-up' : 'chevron-down'}
                  size={32}
                  color={colors.ghost}
                />
              </TouchableOpacity>
            );
          }}>
          {filterCategories?.map(item => (
            <Menu.Item
              key={item}
              onPress={() => selectFilter(item)}
              style={{opacity: selectedFilter === item ? 0.5 : 1}}>
              <Text style={styles.filterText}>{item}</Text>
            </Menu.Item>
          ))}
        </Menu>
      </View>
      {/* products list */}
      <ProductsList
        data={data}
        onRefresh={() => handleFetchProducts()}
        refreshing={loading}
        onEndReached={() => handleLoadMoreProducts()}
        onEndReachedThreshold={0.1}
        initialNumToRender={6}
        loading={loading}
      />
    </SafeAreaView>
  );
};

// products list component
const ProductsList = ({data, loading, ...props}) => {
  const renderItem = ({item}) => (
    <ProductCard
      image={item.thumbnail}
      rating={4}
      amount={item.price}
      name={item.name}
      style={styles.gridItem}
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
      enableOnAndroid
      numColumns={2}
      style={{
        marginTop: 16,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 50,
      }}
      columnWrapperStyle={{
        justifyContent: 'space-between',
      }}
      ListFooterComponent={<ProductListFooter loading={loading} />}
      {...props}
    />
  );
};

const ProductListFooter = ({loading}) => {
  if (!loading) return null;

  return (
    <View style={{paddingVertical: 20, marginVertical: 10}}>
      <ActivityIndicator animating size="large" />
    </View>
  );
};

export default Shop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    backgroundColor: colors.white,
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.fade,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingText: {
    ...text.bold,
    fontSize: 28,
    color: colors.black,
  },
  dropdown: {
    width: 100,
    backgroundColor: colors.white,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    padding: 8,
    top: 10,
  },
  dropdownButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
  },
  filterText: {
    fontSize: 14,
    color: colors.textPrimary,
    ...text.medium,
  },
  gridItem: {
    width: '47.7%',
    marginBottom: 16,
  },
});
