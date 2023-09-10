import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import React from "react";
import theme from "../config/theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
	label: string;
	preference: string | number;
	style?: StyleProp<ViewStyle>;
	onPress: () => void;
};

export default function PreferenceButton({ label, preference, style, onPress }: Props) {
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<Text numberOfLines={1} style={styles.label}>
				{label}
			</Text>
			<Text style={[styles.label, { marginLeft: "auto" }]}>{preference}</Text>
			<Icon name="chevron-down" color={theme.black} size={30} style={{ marginLeft: 10 }} />
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
});
