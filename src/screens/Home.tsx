import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useStore from "../hooks/useStore";
import OIcons from "react-native-vector-icons/Octicons";
import HomeScreen from "./HomeScreen";
import theme from "../config/theme";

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
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: (props) => (
						<OIcons name="home" color={props.focused ? theme.primary : theme.faded} size={36} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
