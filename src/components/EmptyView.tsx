import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import React from "react";
import theme from "../config/theme";

type Props = {
	style?: StyleProp<ViewStyle>;
	text: string;
	textStyle?: StyleProp<TextStyle>;
};

export default function EmptyView({ text, style, textStyle }: Props) {
	return (
		<View style={[styles.emptyView, style]}>
			<Text style={[styles.emptyViewText, textStyle]}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	emptyView: {
		height: 200,
		alignItems: "center",
		justifyContent: "center",
	},
	emptyViewText: {
		fontFamily: theme.fontSemiBold,
		color: theme.placeholder,
		fontSize: 18,
	},
});
