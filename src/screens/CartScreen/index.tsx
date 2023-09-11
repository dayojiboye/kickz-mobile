import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CartStackParamList } from "../../types";
import CartScreen from "./CartScreen";

const Stack = createNativeStackNavigator<CartStackParamList>();

export default function CartStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
			<Stack.Screen name="Cart" component={CartScreen} />
		</Stack.Navigator>
	);
}
