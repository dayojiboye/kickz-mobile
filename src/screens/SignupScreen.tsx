import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import * as yup from "yup";
import { Formik, useFormikContext } from "formik";
import { StatusBar } from "expo-status-bar";
import theme from "../config/theme";
import CustomAppBar from "../components/CustomAppBar";
import Icon from "react-native-vector-icons/Octicons";
import CustomTextInput from "../components/CustomTextInput";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomButton from "../components/CustomButton";
import CustomTextButton from "../components/CustomTextButton";
import useSignUpMutation from "../hooks/useSignup";

const { height } = Dimensions.get("window");
type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

const formValidationSchema = yup.object().shape({
	username: yup.string().required("Username is required"),
	email: yup.string().required("Email is required").email("Please enter a valid email"),
	password: yup
		.string()
		.required("Password is required")
		.min(6, "Password must be at least 6 characters long"),
	confirmPassword: yup
		.string()
		.required("Re-enter password")
		.oneOf([yup.ref("password")], "Passwords do not match"),
});

export default function SignupScreen({ navigation }: Props) {
	const initialFormValues = {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	const signupMutation = useSignUpMutation();

	return (
		<>
			<StatusBar style="dark" />
			<CustomAppBar
				leadIcon={Icon}
				leadIconProps={{ name: "chevron-left", size: 35, color: theme.textPrimary }}
				onLeadPress={() => navigation.goBack()}
			/>
			<KeyboardAwareScrollView
				style={{ flex: 1, backgroundColor: theme.white }}
				contentContainerStyle={styles.container}
				keyboardShouldPersistTaps="handled"
			>
				<Text style={styles.headingText}>Signup</Text>
				<Text style={styles.subHeadingText}>Create a Kickz account</Text>
				<Formik
					initialValues={initialFormValues}
					validationSchema={formValidationSchema}
					onSubmit={(values) => signupMutation.mutate(values)}
				>
					{({ errors, touched, handleSubmit, handleChange }) => (
						<>
							<View style={styles.form}>
								<CustomTextInput
									autoCapitalize="none"
									placeholder="Username"
									onChangeText={handleChange("username")}
									error={touched.username && errors.username}
								/>
								<CustomTextInput
									autoCapitalize="none"
									placeholder="Email"
									keyboardType="email-address"
									onChangeText={handleChange("email")}
									error={touched.email && errors.email}
								/>
								<CustomTextInput
									isPassword
									autoCapitalize="none"
									placeholder="Password"
									onChangeText={handleChange("password")}
									error={touched.password && errors.password}
								/>
								<CustomTextInput
									isPassword
									autoCapitalize="none"
									placeholder="Confirm Password"
									onChangeText={handleChange("confirmPassword")}
									error={touched.confirmPassword && errors.confirmPassword}
								/>
								<CustomButton
									label="Signup"
									style={{ marginTop: 44 }}
									isLoading={signupMutation.isLoading}
									onPress={() => handleSubmit()}
								/>
							</View>
							<FormikObserver />
						</>
					)}
				</Formik>
				<View style={styles.footer}>
					<Text style={styles.footerText}>Already have an account?</Text>
					<CustomTextButton label="Login" onPress={() => navigation.push("Login")} />
				</View>
			</KeyboardAwareScrollView>
		</>
	);
}

const FormikObserver = () => {
	const { handleReset } = useFormikContext<unknown | any>();

	useFocusEffect(
		React.useCallback(() => {
			handleReset();
		}, [])
	);

	return null;
};

const styles = StyleSheet.create({
	container: {
		// height,
		paddingTop: 16,
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
	headingText: {
		color: theme.textPrimary,
		fontFamily: theme.fontBold,
		fontSize: 28,
		letterSpacing: -1,
	},
	subHeadingText: {
		color: theme.textPrimary,
		fontFamily: theme.fontRegular,
		fontSize: 16,
		marginTop: 7,
	},
	form: {
		gap: 24,
		marginTop: 60,
	},
	footer: {
		flexDirection: "row",
		gap: 5,
		justifyContent: "center",
		marginTop: 35,
	},
	footerText: {
		fontSize: 16,
		color: theme.black,
		fontFamily: theme.fontRegular,
	},
});
