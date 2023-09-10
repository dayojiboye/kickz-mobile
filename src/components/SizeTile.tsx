import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import React from "react";
import theme from "../config/theme";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
	label: number;
	style?: StyleProp<ViewStyle>;
	isSelected: boolean;
	onPress: () => void;
};

export default function SizeTile({ label, style, isSelected, onPress }: Props) {
	return (
		<TouchableOpacity
			style={[
				styles.container,
				{
					backgroundColor: isSelected ? theme.primary : theme.white,
					borderWidth: 1,
					borderColor: isSelected ? theme.primary : theme.faded,
				},
				style,
			]}
			onPress={onPress}
		>
			<Text
				numberOfLines={1}
				style={[styles.label, { color: isSelected ? theme.white : theme.black }]}
			>
				{label}
			</Text>
			{isSelected ? <Icon name="checkmark-sharp" color={theme.white} size={24} /> : null}
		</TouchableOpacity>
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
		paddingLeft: 20,
		paddingRight: 16,
	},
	label: {
		fontFamily: theme.fontSemiBold,
		fontSize: 18,
	},
});
