import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import EIcon from "react-native-vector-icons/Entypo";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import HomeScreen from "./HomeScreen";
import theme from "../config/theme";
import ProfileScreen from "./ProfileScreen";
import OrdersScreen from "./OrdersScreen";
import FavoritesScreen from "./FavoritesScreen";

const Tab = createBottomTabNavigator();

export default function Home() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
			}}
		>
			<Tab.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{
					tabBarIcon: (props) => (
						<FAIcon
							name="home"
							color={props.focused ? theme.primary : theme.placeholder}
							size={25}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Favorites"
				component={FavoritesScreen}
				options={{
					tabBarIcon: (props) => (
						<FAIcon
							name="bookmark"
							solid
							color={props.focused ? theme.primary : theme.placeholder}
							size={25}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="OrdersScreen"
				component={OrdersScreen}
				options={{
					tabBarIcon: (props) => (
						<FAIcon
							name="receipt"
							color={props.focused ? theme.primary : theme.placeholder}
							size={25}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: (props) => (
						<Icon
							name="person"
							color={props.focused ? theme.primary : theme.placeholder}
							size={25}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}
