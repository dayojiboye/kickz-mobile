import { StyleSheet, Text, View } from "react-native";
import React from "react";
import theme from "../config/theme";

export default function HomeScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Home Screen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.white,
	},
	text: {
		fontFamily: theme.fontMedium,
		fontSize: 18,
		color: theme.primary,
	},
});
