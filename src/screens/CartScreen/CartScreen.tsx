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

export default function CartScreen() {
	const { cart } = useStore();
	const navigation = useNavigation<NativeStackNavigationProp<CartStackParamList>>();

	// React.useEffect(() => {
	// 	console.log(JSON.stringify(cart));
	// }, [cart]);

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
			</ScrollContextProvider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingBottom: 50,
		// rowGap: 20,
	},
});
