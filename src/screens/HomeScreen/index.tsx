import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeStackParamList } from "../../types";
import ProductsScreen from "./ProductsScreen";
import ProductScreen from "../ProductScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
			<Stack.Screen name="Products" component={ProductsScreen} />
			<Stack.Screen name="Product" component={ProductScreen} />
		</Stack.Navigator>
	);
}
