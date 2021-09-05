/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, SafeAreaView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, text} from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/header';
import {getHeaderTitle} from '@react-navigation/elements';
import Account from '../ui/dashboard/Account';

const Tab = createBottomTabNavigator();

export const DashboardNav = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Tab.Navigator
        initialRouteName="Account"
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.ghost,
          tabBarStyle: {
            borderTopColor: colors.fade,
            borderTopWidth: 1,
            height: 55,
            paddingTop: 10,
            paddingBottom: 0,
          },
          // tabBarActiveBackgroundColor: 'rgb(67, 91, 116)',
          tabBarButton: props => (
            <TouchableOpacity activeOpacity={0.7} {...props} />
          ),
          header: ({navigation, route, options}) => {
            const title = getHeaderTitle(options, route.name);

            return <Header title={title} />;
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Account}
          options={{
            // headerShown: false,
            tabBarLabel: '',
            tabBarLabelStyle: {
              fontSize: 15,
              ...text.medium,
            },
            //   headerBackground
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
          component={Account}
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
          component={Account}
          options={{
            tabBarLabel: '',
            tabBarLabelStyle: {
              fontSize: 15,
              ...text.medium,
            },
            tabBarBadge: 9,
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
                <Icon
                  name={focused ? 'ios-apps' : 'ios-apps-outline'}
                  size={25}
                  color={color}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
