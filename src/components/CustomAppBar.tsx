import { Text, TextStyle, TouchableOpacity, View, ViewStyle, Animated, Easing } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleProp } from "react-native";
import theme from "../config/theme";
import { useScroller as useScrollViewScroller } from "../context/ScrollContext";
import { useScroller as useFlatListScroller } from "../context/FlatListContext";

type Props = {
	disabled?: boolean;
	title?: string;
	leadIcon?: any;
	trailIcon?: any;
	leadIconProps?: any;
	trailIconProps?: any;
	style?: StyleProp<ViewStyle>;
	titleStyle?: StyleProp<TextStyle>;
	leadIconStyle?: StyleProp<ViewStyle>;
	trailIconStyle?: StyleProp<ViewStyle>;
	isFlatList?: boolean;
	onLeadPress?: () => void;
	onTrailPress?: () => void;
};

export default function CustomAppBar({
	disabled,
	title,
	leadIcon,
	trailIcon,
	leadIconProps,
	trailIconProps,
	style,
	titleStyle,
	leadIconStyle,
	trailIconStyle,
	isFlatList,
	onLeadPress,
	onTrailPress,
}: Props) {
	const insets = useSafeAreaInsets();

	const useScroller = isFlatList ? useFlatListScroller : useScrollViewScroller;

	const { titleShowing } = useScroller();

	const [titleFade] = React.useState(new Animated.Value(0));
	const [translate] = React.useState(new Animated.Value(5));

	React.useEffect(() => {
		titleShowing === false &&
			Animated.timing(titleFade, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
				easing: Easing.sin,
			}).start();

		titleShowing === true &&
			Animated.timing(translate, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
				easing: Easing.sin,
			}).start();

		titleShowing === false &&
			Animated.timing(translate, {
				toValue: 5,
				duration: 200,
				useNativeDriver: true,
				easing: Easing.sin,
			}).start();

		titleShowing === true &&
			Animated.timing(titleFade, {
				toValue: 1,
				duration: 200,
				useNativeDriver: true,
				easing: Easing.sin,
			}).start();
	});

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
			{title ? (
				<Animated.View
					style={[
						{
							flexBasis: "33%",
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							alignContent: "center",
						},
						{ opacity: titleFade, transform: [{ translateY: translate }] },
					]}
				>
					<Text style={[{ fontFamily: theme.fontBold, fontSize: 22 }, titleStyle]}>{title}</Text>
				</Animated.View>
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
