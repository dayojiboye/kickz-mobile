import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import React from "react";
import theme from "../config/theme";

type Props = {
	style?: StyleProp<TextStyle>;
	text: string;
};

export default function HeadingText({ style, text }: Props) {
	return <Text style={[styles.headingText, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
	headingText: {
		color: theme.black,
		fontFamily: theme.fontBold,
		fontSize: 28,
		marginBottom: 28,
	},
});
