import {
	ActivityIndicator,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Octicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CartStackParamList, OrderType } from "../../types";
import CustomAppBar from "../../components/CustomAppBar";
import theme from "../../config/theme";
import useStore from "../../hooks/useStore";
import { formatCurrency, showToast, totalCartPrice } from "../../utils/helpers";
import CustomButton from "../../components/CustomButton";
import { Paystack } from "react-native-paystack-webview";
import { PAYSTACK_API_KEY } from "@env";
import { toastType } from "../../enums";
import useSaveOrderMutation from "../../hooks/useSaveOrder";
import { RootStackParamList } from "../../types";

export default function CheckoutScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<CartStackParamList & RootStackParamList>>();
	const { shippingInfo, cart, clearCart, setShippingInfo, user } = useStore();
	const totalPrice = totalCartPrice(cart);
	const [pay, setPay] = React.useState<boolean>(false);
	const timestamp = new Date();
	const [isPaymentLoading, setIsPaymentLoading] = React.useState<boolean>(false);

	const userOrder: OrderType = {
		orderUserID: user?.uid,
		orderCreatedDate: timestamp,
		orderTotal: totalPrice,
		orderItems: cart.map((item) => ({
			documentID: item.documentID,
			name: item.name,
			price: item.price,
			quantity: item.quantity,
			thumbnail: item.thumbnail,
		})),
	};

	const _onSuccess = () => {
		setPay(true);
		setIsPaymentLoading(true);
	};

	const _saveUserOrder = useSaveOrderMutation(_onSuccess);

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
			>
				<Text style={styles.headingText}>Order Summary</Text>
				{isPaymentLoading ? (
					<ActivityIndicator
						color={theme.primary}
						size="large"
						animating
						style={{ marginTop: 40 }}
					/>
				) : (
					<View style={styles.summary}>
						{cart.map((product) => (
							<TouchableOpacity
								key={product.documentID}
								style={styles.product}
								onPress={() => navigation.navigate("CartProduct", { product })}
							>
								<Image source={{ uri: product.thumbnail }} style={styles.image} />
								<View style={{ flex: 1 }}>
									<Text style={styles.text}>{product.name}</Text>
									<Text style={styles.text}>{formatCurrency(product.price)}</Text>
									<Text style={[styles.text, { marginTop: 20 }]}>
										Quantity - {product.quantity}
									</Text>
								</View>
							</TouchableOpacity>
						))}
						<View style={[styles.summaryRow, { marginTop: 20 }]}>
							<Text style={styles.summaryRowText}>Total</Text>
							<Text style={styles.summaryRowValue}>{formatCurrency(totalPrice)}</Text>
						</View>
						<View style={styles.summaryRow}>
							<Text style={styles.summaryRowText}>Full Name</Text>
							<Text style={styles.summaryRowValue}>
								{shippingInfo.firstName} {shippingInfo.lastName}
							</Text>
						</View>
						<View style={styles.summaryRow}>
							<Text style={styles.summaryRowText}>Address</Text>
							<Text style={styles.summaryRowValue}>
								{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state},{" "}
								{shippingInfo.postalCode}
							</Text>
						</View>
						<View style={styles.summaryRow}>
							<Text style={styles.summaryRowText}>Email Address</Text>
							<Text style={styles.summaryRowValue}>{shippingInfo.email}</Text>
						</View>
					</View>
				)}
			</ScrollView>
			<View style={styles.footer}>
				<CustomButton
					label="Pay Now"
					isLoading={_saveUserOrder.isLoading}
					onPress={() => _saveUserOrder.mutate(userOrder)}
				/>
			</View>

			{/* Paystack Web View */}
			{pay ? (
				<View>
					<Paystack
						paystackKey={PAYSTACK_API_KEY}
						amount={totalPrice}
						billingEmail={shippingInfo.email!}
						activityIndicatorColor={theme.primary}
						onCancel={(e) => {
							// handle response here
							showToast("Payment Cancelled", toastType.ERROR);
						}}
						firstName={shippingInfo.firstName}
						lastName={shippingInfo.lastName}
						onSuccess={(response) => {
							// handle response here
							setIsPaymentLoading(false);
							const responseStatus = response.status;
							__DEV__ && console.log(responseStatus);
							if (responseStatus === "success") {
								showToast("Payment Approved", toastType.SUCCESS);
								clearCart();
								setShippingInfo({});
								navigation.push("Home", {
									screen: "OrdersScreen",
								});
							}

							if (responseStatus === "error") {
								showToast("An error occurred while trying to make payment", toastType.ERROR);
							}
						}}
						autoStart={pay}
					/>
				</View>
			) : null}
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
	summary: {
		marginTop: 40,
	},
	product: {
		flexDirection: "row",
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: theme.border,
		gap: 20,
	},
	image: {
		flex: 1,
		height: 140,
		borderRadius: 16,
	},
	text: {
		fontFamily: "OS",
		color: theme.black,
		fontSize: 16,
	},
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 16,
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: theme.border,
	},
	summaryRowText: {
		fontFamily: "OSSemiBold",
		fontSize: 16,
		color: theme.black,
		flex: 1,
	},
	summaryRowValue: {
		fontFamily: "OSSemiBold",
		fontSize: 16,
		color: theme.black,
		textAlign: "right",
		width: 200,
	},
	footer: {
		marginTop: "auto",
		paddingHorizontal: 20,
		paddingVertical: 16,
		backgroundColor: theme.white,
	},
});
