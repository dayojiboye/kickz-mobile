import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useStore from "../../hooks/useStore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CartStackParamList } from "../../types";
import ScrollContextProvider, { ScrollView } from "../../context/ScrollContext";
import CustomAppBar from "../../components/CustomAppBar";
import theme from "../../config/theme";
import EmptyView from "../../components/EmptyView";
import HeadingText from "../../components/HeadingText";
import CartItem from "../../components/CartItem";
import CustomButton from "../../components/CustomButton";
import { formatCurrency, totalCartPrice } from "../../utils/helpers";

export default function CartScreen() {
	const { cart } = useStore();
	const navigation = useNavigation<NativeStackNavigationProp<CartStackParamList>>();
	const [cartTotalPrice, setCartTotalPrice] = React.useState<number>(0);

	React.useEffect(() => {
		setCartTotalPrice(totalCartPrice(cart));
	}, [cart]);

	return (
		<>
			<ScrollContextProvider>
				<CustomAppBar title="Bag" />
				<ScrollView
					style={{ flex: 1, backgroundColor: theme.white }}
					contentContainerStyle={styles.container}
					scrollEnabled={cart.length > 0}
				>
					<HeadingText text="Bag" />
					{cart.length > 0 ? (
						<>
							{cart.map((item) => (
								<CartItem key={item.documentID} product={item} />
							))}
						</>
					) : (
						<EmptyView
							text={`No product in your bag. \n Add some now!`}
							textStyle={{ textAlign: "center" }}
						/>
					)}
				</ScrollView>
				<View style={styles.footer}>
					<CustomButton
						label="Continue to checkout"
						rightIcon={TotalPriceText}
						iconProps={{ totalPrice: cartTotalPrice }}
						style={styles.checkoutButton}
					/>
				</View>
			</ScrollContextProvider>
		</>
	);
}

const TotalPriceText = ({ totalPrice }: { totalPrice: number }) => {
	return <Text style={styles.totalPrice}>{formatCurrency(totalPrice)}</Text>;
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
	footer: {
		marginTop: "auto",
		paddingHorizontal: 20,
		paddingVertical: 16,
		backgroundColor: theme.white,
	},
	checkoutButton: {
		justifyContent: "space-between",
		paddingHorizontal: 16,
	},
	totalPrice: {
		fontSize: 18,
		color: theme.white,
		fontFamily: theme.fontSemiBold,
	},
});
