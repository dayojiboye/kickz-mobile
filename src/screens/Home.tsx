import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import theme from "../config/theme";
import ProfileScreen from "./ProfileScreen";
import OrdersScreen from "./OrdersScreen";
import FavoritesScreen from "./FavoritesScreen";
import { Home3, Archive, ReceiptItem, User } from "iconsax-react-native";

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
						<Home3
							size="32"
							color={props.focused ? theme.primary : theme.placeholder}
							variant={props.focused ? "Bold" : "Broken"}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Favorites"
				component={FavoritesScreen}
				options={{
					tabBarIcon: (props) => (
						<Archive
							size="32"
							color={props.focused ? theme.primary : theme.placeholder}
							variant={props.focused ? "Bold" : "Broken"}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="OrdersScreen"
				component={OrdersScreen}
				options={{
					tabBarIcon: (props) => (
						<ReceiptItem
							size="32"
							color={props.focused ? theme.primary : theme.placeholder}
							variant={props.focused ? "Bold" : "Broken"}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: (props) => (
						<User
							size="32"
							color={props.focused ? theme.primary : theme.placeholder}
							variant={props.focused ? "Bold" : "Broken"}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}
