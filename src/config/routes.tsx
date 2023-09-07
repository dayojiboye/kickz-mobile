import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { RootStackParamList } from "../types";
import useStore from "../hooks/useStore";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRoutes() {
	const appStore = useStore();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
			{appStore.isAuth ? (
				<>
					<Stack.Screen name="Home" component={Home} />
				</>
			) : (
				<>
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Signup" component={SignupScreen} />
				</>
			)}
		</Stack.Navigator>
	);
}
