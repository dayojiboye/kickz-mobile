import { TouchableOpacity, View, ViewStyle } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleProp } from "react-native";
import theme from "../config/theme";

export default function CustomAppBar({
	disabled,
	leadIcon,
	trailIcon,
	leadIconProps,
	trailIconProps,
	style,
	leadIconStyle,
	trailIconStyle,
	onLeadPress,
	onTrailPress,
}: {
	disabled?: boolean;
	leadIcon?: any;
	trailIcon?: any;
	leadIconProps?: any;
	trailIconProps?: any;
	style?: StyleProp<ViewStyle>;
	leadIconStyle?: StyleProp<ViewStyle>;
	trailIconStyle?: StyleProp<ViewStyle>;
	onLeadPress?: () => void;
	onTrailPress?: () => void;
}) {
	const insets = useSafeAreaInsets();

	return (
		<View
			style={[
				{
					paddingHorizontal: 20,
					paddingTop: insets.top,
					paddingBottom: 16,
					flexDirection: "row",
					alignItems: "center",
					position: "relative",
					zIndex: 4,
					backgroundColor: theme.white,
				},
				style,
			]}
		>
			{leadIcon ? (
				<AppBarButton
					disabled={disabled}
					onPress={() => onLeadPress?.()}
					icon={leadIcon}
					iconProps={leadIconProps}
					style={[{ paddingRight: 20 }, leadIconStyle]}
				/>
			) : null}
			{trailIcon ? (
				<AppBarButton
					disabled={disabled}
					onPress={() => onTrailPress?.()}
					icon={trailIcon}
					iconProps={trailIconProps}
					style={[{ marginLeft: "auto", paddingLeft: 20 }, trailIconStyle]}
				/>
			) : null}
		</View>
	);
}

const AppBarButton = ({
	disabled,
	icon,
	iconProps,
	style,
	onPress,
}: {
	disabled?: boolean;
	icon: any;
	iconProps: any;
	style?: StyleProp<ViewStyle>;
	onPress: () => void;
}) => {
	const Icon = icon;

	return (
		<TouchableOpacity
			disabled={disabled}
			style={[{ alignItems: "center", justifyContent: "center" }, style]}
			onPress={onPress}
		>
			<Icon {...iconProps} />
		</TouchableOpacity>
	);
};
