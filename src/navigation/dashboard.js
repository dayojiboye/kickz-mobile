import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, text} from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFa from 'react-native-vector-icons/FontAwesome';
import {isIphoneWithNotch} from '../utils/helpers';

// tab screens
import Account from '../screens/Account';
import Home from '../screens//Home';
import Shop from '../screens/Shop';
import Cart from '../screens/Cart';

const Tab = createBottomTabNavigator();

export const DashboardNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.ghost,
        headerShown: false,
        tabBarStyle: {
          borderTopColor: colors.fade,
          borderTopWidth: 1,
          paddingTop: 10,
          paddingBottom: isIphoneWithNotch() ? 16 : 5,
          height: isIphoneWithNotch() ? 75 : 70,
        },
        tabBarButton: props => (
          <TouchableOpacity activeOpacity={0.7} {...props} />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '',
          tabBarLabelStyle: {
            fontSize: 15,
            ...text.medium,
          },
          tabBarIcon: ({color, focused}) => {
            return (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={25}
                color={color}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarLabel: '',
          tabBarLabelStyle: {
            fontSize: 15,
            ...text.medium,
          },
          tabBarIcon: ({color, focused}) => {
            return (
              <IconMaterial
                name={focused ? 'shopping' : 'shopping-outline'}
                size={25}
                color={color}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: '',
          tabBarLabelStyle: {
            fontSize: 15,
            ...text.medium,
          },
          // tabBarBadge: 0,
          tabBarBadgeStyle: {
            top: -5,
            left: 0,
            ...text.bold,
          },
          tabBarIcon: ({color, focused}) => {
            return (
              <IconMaterial
                name={focused ? 'cart' : 'cart-outline'}
                size={25}
                color={color}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: '',
          tabBarLabelStyle: {
            fontSize: 15,
            ...text.medium,
          },
          tabBarIcon: ({color, focused}) => {
            return (
              <IconFa
                name={focused ? 'user' : 'user-o'}
                size={25}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
