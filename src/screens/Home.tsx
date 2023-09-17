import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import theme from "../config/theme";
import ProfileScreen from "./ProfileScreen";
import { Home3, Archive, ReceiptItem, User, ShoppingBag } from "iconsax-react-native";
import HomeStack from "./HomeScreen";
import { RootStackParamList } from "../types";
import FavoriteStack from "./FavoritesScreen";
import CartStack from "./CartScreen";
import useStore from "../hooks/useStore";
import OrdersStack from "./OrdersScreen";

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function Home() {
	const appStore = useStore();

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
				name="CartScreen"
				component={CartStack}
				options={{
					tabBarIcon: (props) => (
						<ShoppingBag
							size="30"
							color={props.focused ? theme.primary : theme.placeholder}
							variant={props.focused ? "Bold" : "Broken"}
						/>
					),
					tabBarBadge: appStore.cart.length > 0 ? appStore.cart.length : undefined,
					tabBarBadgeStyle: {
						backgroundColor: theme.primary,
						borderWidth: 1.5,
						borderColor: theme.white,
						fontSize: 10,
					},
				}}
			/>
			<Tab.Screen
				name="OrdersScreen"
				component={OrdersStack}
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
