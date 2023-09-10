import {
	LayoutAnimation,
	StyleProp,
	StyleSheet,
	Text,
	TouchableOpacity,
	UIManager,
	View,
	ViewStyle,
} from "react-native";
import React from "react";
import { Platform } from "react-native";
import theme from "../config/theme";
import Icon from "react-native-vector-icons/Feather";

type Props = {
	title: string;
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
};

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ExpansionPanel({ title, children, style }: Props) {
	const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

	const onExpand = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setIsExpanded(!isExpanded);
	};

	return (
		<View style={[styles.container, style]}>
			<TouchableOpacity style={styles.expansionButton} onPress={onExpand}>
				<Text style={styles.title}>{title}</Text>
				<Icon
					name="chevron-right"
					color={theme.black}
					size={30}
					style={{ transform: [{ rotate: isExpanded ? "90deg" : "0deg" }] }}
				/>
			</TouchableOpacity>
			{isExpanded ? <View style={styles.content}>{children}</View> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		overflow: "hidden",
	},
	expansionButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		fontFamily: theme.fontBold,
		fontSize: 24,
		color: theme.black,
		width: "85%",
	},
	content: {
		marginTop: 16,
	},
});
