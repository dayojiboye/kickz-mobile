import {
	Text,
	TextInput,
	TextInputProps,
	TextStyle,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { StyleProp } from "react-native";
import theme from "../config/theme";

type Props = {
	onChangeText: (text: string) => void;
	placeholder?: string;
	isPassword?: boolean;
	outerContainerStyle?: StyleProp<ViewStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	inputStyle?: StyleProp<TextStyle>;
	icon?: any;
	iconProps?: any;
	error?: boolean | string;
} & TextInputProps;

export default function CustomTextInput({
	onChangeText,
	placeholder,
	isPassword = false,
	outerContainerStyle,
	containerStyle,
	inputStyle,
	icon,
	iconProps,
	error,
	...props
}: Props) {
	const refInput = React.useRef<TextInput>(null);
	const [secureText, setSecureText] = React.useState<boolean>(true);

	const LeftIcon = icon;

	return (
		<View style={[{ width: "100%" }, outerContainerStyle]}>
			<View
				style={[
					{
						borderColor: error ? theme.red : theme.border,
						backgroundColor: theme.background,
						borderWidth: 1,
						borderRadius: 4,
						flexDirection: "row",
						alignItems: "center",
						width: "100%",
						height: 60,
					},
					containerStyle,
				]}
			>
				{icon && <LeftIcon {...iconProps} />}
				<TextInput
					ref={refInput}
					placeholder={placeholder}
					placeholderTextColor={theme.placeholder}
					spellCheck={false}
					cursorColor={theme.faded}
					selectionColor={theme.faded}
					style={[
						{
							fontSize: 18,
							color: theme.textPrimary,
							fontFamily: theme.fontRegular,
							flex: 1,
							height: "100%",
							paddingHorizontal: 32,
							backgroundColor: "transparent",
							borderRadius: 4,
						},
						inputStyle,
					]}
					onChangeText={onChangeText}
					secureTextEntry={isPassword ? secureText : false}
					{...props}
				/>
				{isPassword && (
					<TouchableOpacity
						activeOpacity={0.8}
						style={{
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
							width: 50,
							backgroundColor: "transparent",
						}}
						onPress={() => {
							// refInput?.current?.focus();
							setSecureText(!secureText);
						}}
					>
						<Icon name={secureText ? "eye-off" : "eye"} size={20} color={theme.placeholder} />
					</TouchableOpacity>
				)}
			</View>
			{error && (
				<Text
					style={{ fontSize: 16, fontFamily: theme.fontRegular, color: theme.red, marginTop: 4 }}
				>
					{error}
				</Text>
			)}
		</View>
	);
}
