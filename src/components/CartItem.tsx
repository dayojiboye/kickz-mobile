import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CartItemType } from "../types";
import theme from "../config/theme";

type Props = {
	product: CartItemType;
	// onIncrease: (item: CartItemType) => void;
	// onDecrease: (item: CartItemType) => void;
	// onRemove: (id: string) => void;
	// onClick: () => void;
};

export default function CartItem({ product }: Props) {
	return (
		<TouchableOpacity style={styles.container}>
			<Image source={{ uri: product.thumbnail }} style={styles.image} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: theme.border,
		flexDirection: "row",
		gap: 16,
		// backgroundColor: "red",
	},
	image: {
		height: 200,
		borderRadius: 16,
		flex: 1,
	},
});
