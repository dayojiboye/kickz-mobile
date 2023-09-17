import { StyleSheet, View } from "react-native";
import React from "react";
import CustomAppBar from "../../components/CustomAppBar";
import theme from "../../config/theme";
import useStore from "../../hooks/useStore";
import ProductCard from "../../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FavoritesStackParamList } from "../../types";
import EmptyView from "../../components/EmptyView";
import HeadingText from "../../components/HeadingText";
import ScrollContextProvider, { ScrollView } from "../../context/ScrollContext";

export default function FavoritesScreen() {
	const { favoriteProducts } = useStore();
	const navigation = useNavigation<NativeStackNavigationProp<FavoritesStackParamList>>();

	return (
		<ScrollContextProvider>
			<CustomAppBar title="Favorites" />
			<ScrollView
				style={{ flex: 1, backgroundColor: theme.white }}
				contentContainerStyle={styles.container}
				scrollEnabled={favoriteProducts.length > 0}
			>
				<HeadingText text="Favorites" />
				{favoriteProducts.length > 0 ? (
					<View style={styles.productGrid}>
						{favoriteProducts.map((prod) => (
							<ProductCard
								key={prod.documentID}
								product={prod}
								onPress={() => navigation.navigate("FavoriteProduct", { product: prod })}
							/>
						))}
					</View>
				) : (
					<EmptyView
						text="Your favorite products appear here"
						textStyle={{ textAlign: "center" }}
					/>
				)}
			</ScrollView>
		</ScrollContextProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
	productGrid: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
		rowGap: 20,
	},
});
