import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SLIcons from "react-native-vector-icons/SimpleLineIcons";
import HomeScreen from "./HomeScreen";
import theme from "../config/theme";
import ProfileScreen from "./ProfileScreen";

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
						<SLIcons
							name="home"
							color={props.focused ? theme.primary : theme.placeholder}
							size={25}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: (props) => (
						<SLIcons
							name="user"
							color={props.focused ? theme.primary : theme.placeholder}
							size={25}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}
