import {
	Text,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
	TextStyle,
	TouchableOpacityProps,
	ActivityIndicator,
	GestureResponderEvent,
} from "react-native";
import React from "react";
import theme from "../config/theme";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type Props = {
	disabled?: boolean;
	label: string;
	containerStyle?: StyleProp<ViewStyle>;
	style?: StyleProp<ViewStyle>;
	labelStyle?: StyleProp<TextStyle>;
	activeOpacity?: number;
	onPress?: (event: GestureResponderEvent) => void;
	onLongPress?: (event: GestureResponderEvent) => void;
	leftIcon?: any;
	rightIcon?: any;
	iconProps?: any;
	isLoading?: boolean;
} & TouchableOpacityProps;

export default function CustomButton({
	disabled,
	label = "Button",
	containerStyle,
	style,
	labelStyle,
	activeOpacity = 1,
	onPress,
	leftIcon,
	rightIcon,
	iconProps,
	isLoading,
	onLongPress,
	...props
}: Props) {
	const Icon = leftIcon ? leftIcon : rightIcon;

	const pressed = useSharedValue(false);

	const tap = Gesture.Tap()
		.onBegin(() => {
			pressed.value = true;
		})
		.onFinalize(() => {
			pressed.value = false;
		});

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [{ scale: withTiming(pressed.value ? 0.97 : 1) }],
	}));

	return (
		<GestureDetector gesture={tap}>
			<Animated.View style={[{ width: "100%" }, animatedStyles, containerStyle]}>
				<TouchableOpacity
					activeOpacity={activeOpacity}
					disabled={disabled || isLoading}
					style={[
						{
							backgroundColor: disabled || isLoading ? theme.disabled : theme.primary,
							width: "100%",
							height: 60,
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "row",
							gap: 3,
							borderRadius: 4,
						},
						style,
					]}
					onPress={onPress}
					onLongPress={onLongPress}
					{...props}
				>
					{isLoading ? (
						<ActivityIndicator size="small" color={theme.white} />
					) : (
						<>
							{leftIcon && <Icon {...iconProps} />}
							<Text
								style={[
									{ fontSize: 18, color: theme.white, fontFamily: theme.fontSemiBold },
									labelStyle,
								]}
							>
								{label}
							</Text>
							{rightIcon && <Icon {...iconProps} />}
						</>
					)}
				</TouchableOpacity>
			</Animated.View>
		</GestureDetector>
	);
}
