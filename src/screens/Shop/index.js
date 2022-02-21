/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {colors, text} from '../../styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Menu} from 'native-base';
import Icon from 'react-native-vector-icons/EvilIcons';
import {useSelector} from 'react-redux';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

// import screens
import All from './All';
import Women from './Women';
import Men from './Men';

export default function Shop({navigation}) {
  const ShopStack = createStackNavigator();
  const [showDropdown, setDropdown] = React.useState(false);
  const filterCategories = ['Show All', 'Women', 'Men'];
  const [filterText, setFilterText] = React.useState('Show All');
  const {currentUser} = useSelector(state => {
    return {
      currentUser: state.auth.currentUser,
    };
  });

  const handleNavigation = item => {
    setFilterText(item);
    if (item === 'Show All') {
      navigation.replace('All');
    } else {
      navigation.replace(item);
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headingText}>Shop</Text>
          {!currentUser ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.black,
                  marginLeft: 5,
                  ...text.medium,
                }}>
                Go back
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={{marginTop: 16, paddingHorizontal: 16, marginBottom: 16}}>
          <Menu
            style={styles.dropdown}
            shouldOverlapWithTrigger={false}
            onOpen={() => setDropdown(true)}
            onClose={() => setDropdown(false)}
            placement="bottom left"
            trigger={triggerProps => {
              return (
                <TouchableOpacity
                  style={styles.dropdownButton}
                  {...triggerProps}>
                  <Text style={{...styles.filterText, fontSize: 16}}>
                    {filterText}
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
                onPress={() => {
                  if (item === filterText) return;
                  handleNavigation(item);
                }}
                style={{
                  opacity: filterText === item ? 0.5 : 1,
                }}>
                <Text style={styles.filterText}>{item}</Text>
              </Menu.Item>
            ))}
          </Menu>
        </View>
        <ShopStack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <ShopStack.Screen name="All" component={All} />
          <ShopStack.Screen name="Women" component={Women} />
          <ShopStack.Screen name="Men" component={Men} />
        </ShopStack.Navigator>
      </SafeAreaView>
    </>
  );
}

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
});
