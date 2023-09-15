import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import React from "react";
import theme from "../config/theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import SIcon from "react-native-vector-icons/SimpleLineIcons";

type Props = {
	style?: StyleProp<ViewStyle>;
	quantity: number;
	onIncrease: () => void;
	onDecrease: () => void;
	onRemove: () => void;
};

export default function QuantityButtonV2({
	quantity,
	onIncrease,
	onDecrease,
	onRemove,
	style,
}: Props) {
	const isDecreaseDisabled = quantity === 1;
	const isIncreaseDisabled = quantity === 50;

	return (
		<View style={[styles.container, style]}>
			<TouchableOpacity style={styles.ctaButton} onPress={onDecrease}>
				{isDecreaseDisabled ? (
					<SIcon name="trash" size={22} color={theme.black} />
				) : (
					<Icon name="remove" size={25} color={theme.black} />
				)}
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
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 32,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderWidth: 1,
		borderColor: theme.border,
		paddingHorizontal: 10,
		// paddingVertical: 7,
		height: 60,
		gap: 10,
	},
	label: {
		fontFamily: theme.fontSemiBold,
		color: theme.black,
		fontSize: 18,
	},
	ctaButton: {
		height: 40,
		width: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(188, 185, 185, 0.2)",
	},
});
