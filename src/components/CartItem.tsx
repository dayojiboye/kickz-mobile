import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CartItemType } from "../types";

type Props = {
	product: CartItemType;
	// onIncrease: (item: CartItemType) => void;
	// onDecrease: (item: CartItemType) => void;
	// onRemove: (id: string) => void
};

export default function CartItem({ product }: Props) {
	return (
		<View>
			<Text>CartItem</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});
