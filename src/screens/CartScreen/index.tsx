import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CartStackParamList } from "../../types";
import CartScreen from "./CartScreen";
import ShippingInfoScreen from "./ShippingInfoScreen";
import ProductScreen from "../ProductScreen";
import CheckoutScreen from "./CheckoutScreen";

const Stack = createNativeStackNavigator<CartStackParamList>();

export default function CartStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
			<Stack.Screen name="Cart" component={CartScreen} />
			<Stack.Screen name="CartProduct" component={ProductScreen} />
			<Stack.Screen name="ShippingInfo" component={ShippingInfoScreen} />
			<Stack.Screen name="Checkout" component={CheckoutScreen} />
		</Stack.Navigator>
	);
}
