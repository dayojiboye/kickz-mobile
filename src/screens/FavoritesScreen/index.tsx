import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FavoritesStackParamList } from "../../types";
import FavoritesScreen from "./FavoritesScreen";
import ProductScreen from "../ProductScreen";

const Stack = createNativeStackNavigator<FavoritesStackParamList>();

export default function FavoriteStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
			<Stack.Screen name="Favorites" component={FavoritesScreen} />
			<Stack.Screen name="FavoriteProduct" component={ProductScreen} />
		</Stack.Navigator>
	);
}
