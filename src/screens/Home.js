/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colors, text} from '../styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import FlashCard from '../components/FlashCard';
import ProductCard from '../components/ProductCard';
import {flashSales, categories, megaSales} from '../utils/mock';
import RecommendedProductCard from '../components/RecommendedProductCard';

const {width} = Dimensions.get('screen');

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Home</Text>
      </View>
      <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 50}}>
        {/* flash sales card */}
        <FlashCard
          style={{paddingHorizontal: 16}}
          title="Super Flash Sale 50% Off"
          image="https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTUxfHxtZW4lMjBzaG9lc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />
        {/* categories */}
        <Text style={styles.headingText}>Category</Text>
        <ScrollView
          horizontal
          style={{width: width}}
          contentContainerStyle={{paddingLeft: 16}}
          showsHorizontalScrollIndicator={false}>
          {categories?.map(item => (
            <Category key={item} name={item} />
          ))}
        </ScrollView>
        {/* flash sale */}
        <Text style={styles.headingText}>Flash Sale</Text>
        <ScrollView
          horizontal
          style={{width: width}}
          contentContainerStyle={{paddingLeft: 16}}
          showsHorizontalScrollIndicator={false}>
          {flashSales?.map(item => (
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
        {/* mega sale */}
        <Text style={styles.headingText}>Mega Sale</Text>
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
        {/* recommended product */}
        <RecommendedProductCard style={{paddingHorizontal: 16}} />
        {/* more products */}
        <View style={styles.grid}>
          <ProductCard
            amount={40500}
            style={styles.gridItem}
            name="Men Nike Air Max 3"
            rating={3}
            image="https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTY2fHxtZW4lMjBzaG9lc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          />
          <ProductCard
            amount={30000}
            style={styles.gridItem}
            name="Floral Toe Pumps"
            rating={2}
            image="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=80"
          />
          <ProductCard
            amount={12300}
            style={styles.gridItem}
            name="Women Sandals 2"
            rating={3}
            image="https://images.unsplash.com/photo-1512664401326-cd1a54ccd52d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8d29tZW4lMjBzaG9lc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          />
          <ProductCard
            amount={32000}
            style={styles.gridItem}
            name="Men Puma Suede"
            rating={2}
            image="https://images.unsplash.com/photo-1545289414-1c3cb1c06238?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Njh8fG1lbiUyMGd1Y2NpJTIwc2hvZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Category = ({name}) => {
  return (
    <TouchableOpacity style={styles.category}>
      <Text
        style={{
          ...text.semiBold,
          fontSize: 13,
          color: colors.primary,
          textTransform: 'uppercase',
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default Home;

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
  screenTitle: {
    ...text.bold,
    fontSize: 28,
    color: colors.black,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: colors.black,
    ...text.medium,
  },
  logout: {
    padding: 16,
    width: '60%',
    marginTop: 16,
  },
  headingText: {
    fontSize: 18,
    color: colors.textPrimary,
    ...text.semiBold,
    marginTop: 40,
    marginLeft: 16,
    marginBottom: 12,
  },
  category: {
    alignSelf: 'flex-start',
    padding: 13,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.fade,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginRight: 16,
  },
  productCard: {
    marginRight: 16,
  },
  grid: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 40,
  },
  gridItem: {
    width: '47.7%',
    marginBottom: 16,
  },
});
