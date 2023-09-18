import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { OrdersStackParamList } from "../../types";
import OrdersScreen from "./OrdersScreen";
import OrderScreen from "./OrderScreen";

const Stack = createNativeStackNavigator<OrdersStackParamList>();

export default function OrdersStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
			<Stack.Screen name="Orders" component={OrdersScreen} />
			<Stack.Screen name="Order" component={OrderScreen} />
		</Stack.Navigator>
	);
}
