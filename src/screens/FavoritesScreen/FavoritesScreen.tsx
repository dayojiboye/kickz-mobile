import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomAppBar from "../../components/CustomAppBar";
import theme from "../../config/theme";
import FlatListContextProvider, { FlatList } from "../../context/FlatListContext";
import useStore from "../../hooks/useStore";
import ProductCard from "../../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FavoritesStackParamList } from "../../types";

export default function FavoritesScreen() {
	const { favoriteProducts } = useStore();
	const navigation = useNavigation<NativeStackNavigationProp<FavoritesStackParamList>>();

	return (
		<>
			<FlatListContextProvider>
				<CustomAppBar title="Favorites" isFlatList />
				<FlatList
					data={favoriteProducts}
					keyExtractor={(item, index) => item.documentID}
					renderItem={({ item: product }) => (
						<ProductCard
							product={product}
							onPress={() => navigation.navigate("FavoriteProduct", { product })}
						/>
					)}
					style={{ flex: 1, backgroundColor: theme.white }}
					contentContainerStyle={styles.container}
					numColumns={2}
					columnWrapperStyle={{ gap: 10 }}
					ListHeaderComponent={() => <Text style={styles.headingText}>Favorites</Text>}
					ListEmptyComponent={() => (
						<View style={styles.emptyView}>
							<Text style={styles.emptyViewText}>Your favorite products appear here</Text>
						</View>
					)}
				/>
			</FlatListContextProvider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingBottom: 50,
		rowGap: 20,
	},
	headingText: {
		color: theme.black,
		fontFamily: theme.fontBold,
		fontSize: 28,
		marginBottom: 10,
	},
	emptyView: {
		height: 200,
		alignItems: "center",
		justifyContent: "center",
	},
	emptyViewText: {
		fontFamily: theme.fontSemiBold,
		color: theme.placeholder,
		fontSize: 18,
	},
});
