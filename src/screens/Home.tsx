import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import theme from "../config/theme";
import ProfileScreen from "./ProfileScreen";
import OrdersScreen from "./OrdersScreen";
import { Home3, Archive, ReceiptItem, User } from "iconsax-react-native";
import HomeStack from "./HomeScreen";
import { RootStackParamList } from "../types";
import FavoriteStack from "./FavoritesScreen";

const Tab = createBottomTabNavigator<RootStackParamList>();

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
				component={HomeStack}
				options={{
					tabBarIcon: (props) => (
						<Home3
							size="30"
							color={props.focused ? theme.primary : theme.placeholder}
							variant={props.focused ? "Bold" : "Broken"}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="FavoritesScreen"
				component={FavoriteStack}
				options={{
					tabBarIcon: (props) => (
						<Archive
							size="30"
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
							size="30"
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
							size="30"
							color={props.focused ? theme.primary : theme.placeholder}
							variant={props.focused ? "Bold" : "Broken"}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}
