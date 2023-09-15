import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Octicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CartStackParamList } from "../../types";
import CustomAppBar from "../../components/CustomAppBar";
import theme from "../../config/theme";
import useStore from "../../hooks/useStore";

export default function CheckoutScreen() {
	const navigation = useNavigation<NativeStackNavigationProp<CartStackParamList>>();
	const { shippingInfo, cart } = useStore();

	return (
		<>
			<CustomAppBar
				leadIcon={Icon}
				leadIconProps={{ name: "chevron-left", size: 35, color: theme.textPrimary }}
				onLeadPress={() => navigation.goBack()}
			/>
			<ScrollView
				style={{ flex: 1, backgroundColor: theme.white }}
				contentContainerStyle={styles.container}
			></ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		paddingBottom: 50,
		paddingHorizontal: 20,
	},
});
