import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import theme from "../config/theme";
import CustomButton from "./CustomButton";

type Props = {
	style?: StyleProp<ViewStyle>;
	errorMsg: string;
	onRetry: () => void;
};

export default function ErrorComponent({ style, errorMsg, onRetry }: Props) {
	return (
		<View style={[styles.container, style]}>
			<Text style={styles.text}>{errorMsg}</Text>
			<CustomButton label="Try again" onPress={() => onRetry?.()} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 20,
		textAlign: "center",
	},
	text: {
		fontFamily: "OSSemiBold",
		fontSize: 18,
		color: theme.placeholder,
		textAlign: "center",
	},
});
