import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CartStackParamList, ShippingInfoType } from "../../types";
import CustomAppBar from "../../components/CustomAppBar";
import Icon from "react-native-vector-icons/Octicons";
import theme from "../../config/theme";
import * as yup from "yup";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import useStore from "../../hooks/useStore";
// import { showToast } from "../../utils/helpers";
// import { toastType } from "../../enums";

const formValidationSchema = yup.object().shape({
	firstName: yup.string().required("First name is required"),
	lastName: yup.string().required("Last name is required"),
	email: yup.string().required("Email is required").email("Please enter a valid email"),
	address: yup.string().required("Address is required"),
	city: yup.string().required("City is required"),
	state: yup.string().required("State is required"),
	postalCode: yup
		.string()
		.min(5, "Post code must be at least 5 characters long!")
		.required("Post code is required"),
});

export default function ShippingInfoScreen() {
	const navigation = useNavigation<NativeStackNavigationProp<CartStackParamList>>();
	const { shippingInfo, setShippingInfo } = useStore();

	const initialFormValues: ShippingInfoType = {
		firstName: shippingInfo?.firstName || "",
		lastName: shippingInfo?.lastName || "",
		email: shippingInfo?.email || "",
		address: shippingInfo?.address || "",
		city: shippingInfo?.city || "",
		state: shippingInfo?.state || "",
		postalCode: shippingInfo?.postalCode || "",
	};

	return (
		<>
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
				<Text style={styles.headingText}>Shipping Info.</Text>
				<Formik
					initialValues={initialFormValues}
					validationSchema={formValidationSchema}
					onSubmit={(values) => {
						// showToast("Shipping address submitted successfully", toastType.SUCCESS);
						setShippingInfo(values);
						navigation.navigate("Checkout");
					}}
				>
					{({ values, errors, touched, handleSubmit, handleChange }) => (
						<View style={styles.form}>
							<CustomTextInput
								placeholder="First Name"
								onChangeText={handleChange("firstName")}
								error={touched.firstName && errors.firstName}
								defaultValue={values.firstName}
							/>
							<CustomTextInput
								placeholder="Last Name"
								onChangeText={handleChange("lastName")}
								error={touched.lastName && errors.lastName}
								defaultValue={values.lastName}
							/>
							<CustomTextInput
								autoCapitalize="none"
								placeholder="Email"
								keyboardType="email-address"
								onChangeText={handleChange("email")}
								error={touched.email && errors.email}
								defaultValue={values.email}
							/>
							<CustomTextInput
								placeholder="Address"
								onChangeText={handleChange("address")}
								error={touched.address && errors.address}
								defaultValue={values.address}
							/>
							<CustomTextInput
								placeholder="City"
								onChangeText={handleChange("city")}
								error={touched.city && errors.city}
								defaultValue={values.city}
							/>
							<View style={styles.formRow}>
								<CustomTextInput
									outerContainerStyle={styles.formRowInput}
									placeholder="State"
									onChangeText={handleChange("state")}
									error={touched.state && errors.state}
									defaultValue={values.state}
								/>
								<CustomTextInput
									outerContainerStyle={styles.formRowInput}
									placeholder="Postal Code"
									onChangeText={handleChange("postalCode")}
									error={touched.postalCode && errors.postalCode}
									defaultValue={values.postalCode}
								/>
							</View>
							<CustomButton
								label="Continue"
								style={{ marginTop: 44 }}
								onPress={() => handleSubmit()}
							/>
						</View>
					)}
				</Formik>
			</KeyboardAwareScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		paddingBottom: 50,
		paddingHorizontal: 20,
	},
	headingText: {
		color: theme.textPrimary,
		fontFamily: theme.fontBold,
		fontSize: 28,
		letterSpacing: -1,
	},
	form: {
		gap: 24,
		marginTop: 60,
	},
	formRow: {
		flexDirection: "row",
		gap: 16,
	},
	formRowInput: {
		flex: 1,
	},
});
