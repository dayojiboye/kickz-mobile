import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import CustomButton from "./CustomButton";
import theme from "../config/theme";
import { ProductType } from "../types";

export default function ProductsView({ products }: { products: ProductType[] }) {
	return (
		<View style={styles.container}>
			<ScrollView style={{ flex: 1 }} contentContainerStyle={styles.contentStyle}>
				<Text>{products.length}</Text>
			</ScrollView>

			<CustomButton label="Checkout" style={styles.checkoutButton} />
			{/* <LinearGradient
				colors={["rgba(255, 255, 255, 0.3)", "transparent"]}
				style={styles.linearGradient}
				pointerEvents="none"
			/> */}
			<BlurView intensity={5} tint="light" style={styles.blur} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.white,
		position: "relative",
		paddingBottom: 10,
	},
	contentStyle: {
		paddingTop: 48,
	},
	checkoutButton: {
		// borderRadius: 50,
		width: 200,
		alignSelf: "center",
	},
	// linearGradient: {
	// 	position: "absolute",
	// 	left: 0,
	// 	right: 0,
	// 	bottom: 0,
	// 	height: 80,
	// 	zIndex: -1,
	// },
	blur: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		height: 80,
		zIndex: -1,
	},
});
