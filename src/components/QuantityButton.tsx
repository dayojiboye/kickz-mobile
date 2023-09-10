import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import React from "react";
import theme from "../config/theme";
import Icon from "react-native-vector-icons/MaterialIcons";

type Props = {
	style?: StyleProp<ViewStyle>;
	quantity: number;
	onIncrease: () => void;
	onDecrease: () => void;
};

export default function QuantityButton({ style, quantity, onIncrease, onDecrease }: Props) {
	const isDecreaseDisabled = quantity === 1;
	const isIncreaseDisabled = quantity === 50;

	return (
		<View style={[styles.container, style]}>
			<Text numberOfLines={1} style={styles.label}>
				Quantity
			</Text>
			<View style={styles.quantityContainer}>
				<TouchableOpacity
					disabled={isDecreaseDisabled}
					style={[styles.ctaButton, { opacity: isDecreaseDisabled ? 0.6 : 1 }]}
					onPress={onDecrease}
				>
					<Icon name="remove" size={25} color={theme.black} />
				</TouchableOpacity>
				<Text style={[styles.label, { width: 30, textAlign: "center" }]}>{quantity}</Text>
				<TouchableOpacity
					disabled={isIncreaseDisabled}
					style={[styles.ctaButton, { opacity: isIncreaseDisabled ? 0.5 : 1 }]}
					onPress={onIncrease}
				>
					<Icon name="add" size={25} color={theme.black} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 60,
		borderRadius: 4,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderWidth: 1,
		borderColor: theme.faded,
		paddingLeft: 20,
		paddingRight: 16,
	},
	label: {
		fontFamily: theme.fontSemiBold,
		color: theme.black,
		fontSize: 18,
	},
	quantityContainer: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
	},
	ctaButton: {
		height: 40,
		width: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(188, 185, 185, 0.4)",
	},
});
