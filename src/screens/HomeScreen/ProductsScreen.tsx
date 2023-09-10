import { StyleSheet, TouchableOpacity, View, Animated } from "react-native";
import React from "react";
import theme from "../../config/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
	MaterialTopTabBarProps,
	createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import MenScreen from "./MenScreen";
import WomenScreen from "./WomenScreen";
// import { BlurView } from "expo-blur";

const Tab = createMaterialTopTabNavigator();

export default function ProductsScreen() {
	const inset = useSafeAreaInsets();

	return (
		<>
			<StatusBar style="dark" />
			{/* Add scroll to top on swipe start */}
			<Tab.Navigator
				tabBar={(props) => <ProductTab {...props} />}
				style={[styles.container, { paddingTop: inset.top }]}
			>
				<Tab.Screen name="Men" component={MenScreen} />
				<Tab.Screen name="Women" component={WomenScreen} />
			</Tab.Navigator>
			{/* <BlurView intensity={3} tint="default" style={styles.blurView} /> */}
		</>
	);
}

const ProductTab = ({ state, descriptors, navigation, position }: MaterialTopTabBarProps) => {
	let indicatorPosition: any = 0;

	return (
		<View style={styles.tabStyle}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				// const label =
				// 	options.tabBarLabel !== undefined
				// 		? options.tabBarLabel
				// 		: options.title !== undefined
				// 		? options.title
				// 		: route.name;

				const isFocused: boolean = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						// The `merge: true` option makes sure that the params inside the tab screen are preserved
						// @ts-ignore
						navigation.navigate({ name: route.name, merge: true });
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};

				const inputRange = state.routes.map((_, i) => i);
				indicatorPosition = position.interpolate({
					inputRange,
					outputRange: inputRange.map((i) => (i === index ? 100 : 0)),
				});

				return (
					<TouchableOpacity
						key={index}
						activeOpacity={1}
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={styles.tabItemStyle}
					>
						<Animated.Text
							style={[
								styles.tabBarLabelStyle,
								{
									color: isFocused ? theme.white : theme.textPrimary,
								},
							]}
						>
							{route.name}
						</Animated.Text>
					</TouchableOpacity>
				);
			})}
			<Animated.View
				style={[
					styles.tabIndicator,
					{ transform: [{ translateX: indicatorPosition }], backgroundColor: theme.primary },
				]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.white,
	},
	tabStyle: {
		flexDirection: "row",
		alignSelf: "center",
		backgroundColor: theme.background,
		borderRadius: 50,
		position: "relative",
	},
	tabItemStyle: {
		width: 100,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	tabBarLabelStyle: {
		fontSize: 14,
		fontFamily: theme.fontBold,
	},
	tabIndicator: {
		width: 100,
		position: "absolute",
		top: 0,
		height: "100%",
		zIndex: -1,
		borderRadius: 50,
	},
	blurView: {
		// backgroundColor: "rgba(255, 255, 255, 0.4)",
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		height: 40,
	},
	checkoutButton: {
		position: "absolute",
		bottom: 16,
		right: 20,
		backgroundColor: theme.primary,
		width: 60,
		height: 60,
		borderRadius: 35,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: theme.black,
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 10.32,
		elevation: 16,
	},
	checkoutIcon: {
		position: "relative",
	},
	checkoutCount: {
		minWidth: 18,
		minHeight: 18,
		borderRadius: 9,
		position: "absolute",
		backgroundColor: theme.textPrimary,
		right: -5,
		top: -5,
		justifyContent: "center",
		alignItems: "center",
	},
	checkoutCountText: {
		fontFamily: theme.fontBold,
		color: theme.white,
		fontSize: 12,
	},
});
