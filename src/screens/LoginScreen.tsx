import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import theme from "../config/theme";
import * as yup from "yup";
import { Formik, useFormikContext } from "formik";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import CustomTextButton from "../components/CustomTextButton";
import { StatusBar } from "expo-status-bar";
import useLoginMutation from "../hooks/useLogin";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;
const { height } = Dimensions.get("window");

const formValidationSchema = yup.object().shape({
	email: yup.string().required("Email is required").email("Please enter a valid email"),
	password: yup
		.string()
		.required("Password is required")
		.min(6, "Password must be at least 6 characters long"),
});

export default function LoginScreen({ navigation }: Props) {
	const initialFormValues = {
		email: "",
		password: "",
	};

	const loginMutation = useLoginMutation();

	return (
		<>
			<StatusBar style="dark" />

			<KeyboardAwareScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.container}
				keyboardShouldPersistTaps="handled"
			>
				<Text style={styles.heading}>Kickz</Text>
				<Formik
					initialValues={initialFormValues}
					validationSchema={formValidationSchema}
					onSubmit={(values) => loginMutation.mutate(values)}
				>
					{({ errors, touched, handleSubmit, handleChange }) => (
						<>
							<View style={styles.form}>
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
								<CustomButton
									label="Login"
									style={{ marginTop: 44 }}
									isLoading={loginMutation.isLoading}
									onPress={() => handleSubmit()}
								/>
							</View>
							<FormikObserver />
						</>
					)}
				</Formik>
				<View style={styles.footer}>
					<Text style={styles.footerText}>Don't have an account?</Text>
					<CustomTextButton label="Sign Up" onPress={() => navigation.push("Signup")} />
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
	scrollView: {
		backgroundColor: theme.white,
	},
	container: {
		height,
		paddingHorizontal: 20,
		justifyContent: "center",
	},
	heading: {
		color: theme.primary,
		fontFamily: theme.fontBold,
		fontSize: 48,
		letterSpacing: -1,
		textAlign: "center",
	},
	form: {
		marginTop: 60,
		gap: 24,
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
