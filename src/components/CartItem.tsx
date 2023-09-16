import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CartItemType } from "../types";
import theme from "../config/theme";
import QuantityButtonV2 from "./QuantityButtonV2";
import { formatCurrency } from "../utils/helpers";
import useStore from "../hooks/useStore";
import Icon from "react-native-vector-icons/MaterialIcons";

type Props = {
	product: CartItemType;
	onOptionTap: () => void;
	onTap: () => void;
};

export default function CartItem({ product, onOptionTap, onTap }: Props) {
	const productPrice: number = product.price * product.quantity;
	const { addToCart, reduceCartItem, removeCartItem } = useStore();

	const onIncreaseQuantity = () => {
		addToCart({
			...product,
			quantity: 1,
		});
	};

	const onDecreaseQuantity = () => {
		reduceCartItem(product);
	};

	const onRemoveProduct = () => {
		removeCartItem(product.documentID);
	};

	return (
		<TouchableOpacity style={styles.container} onPress={onTap}>
			<Image source={{ uri: product.thumbnail }} style={styles.image} />
			<View style={{ justifyContent: "space-between", flex: 1, gap: 10 }}>
				<View>
					<Text style={[styles.text, { fontFamily: "OSSemiBold", maxWidth: "95%" }]}>
						{product.name}
					</Text>
					<Text style={[styles.text, { color: "#1b1b1b" }]}>{product.size}</Text>
					<Text style={[styles.text, { color: "#1b1b1b", marginTop: 12 }]}>
						{formatCurrency(productPrice)}
					</Text>
				</View>
				<QuantityButtonV2
					quantity={product.quantity}
					onDecrease={onDecreaseQuantity}
					onIncrease={onIncreaseQuantity}
					onRemove={onRemoveProduct}
				/>
			</View>
			<View style={{ justifyContent: "flex-end", width: 60 }}>
				<TouchableOpacity style={styles.optionsButton} onPress={onOptionTap}>
					<Icon name="more-horiz" color={theme.black} size={28} />
				</TouchableOpacity>
			</View>
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
		justifyContent: "space-between",
	},
	image: {
		height: "100%",
		borderRadius: 16,
		// width: 120,
		flex: 1,
	},
	text: {
		fontFamily: "OS",
		color: theme.black,
		fontSize: 16,
	},
	optionsButton: {
		backgroundColor: "rgba(188, 185, 185, 0.2)",
		height: 60,
		width: 60,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 30,
	},
});
