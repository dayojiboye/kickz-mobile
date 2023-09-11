import { StyleSheet } from "react-native";
import React from "react";
import CustomAppBar from "../../components/CustomAppBar";
import theme from "../../config/theme";
import FlatListContextProvider, { FlatList } from "../../context/FlatListContext";
import useStore from "../../hooks/useStore";
import ProductCard from "../../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FavoritesStackParamList } from "../../types";
import EmptyView from "../../components/EmptyView";
import HeadingText from "../../components/HeadingText";

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
					columnWrapperStyle={{ justifyContent: "space-between" }}
					ListHeaderComponent={() => <HeadingText text="Favorites" />}
					ListEmptyComponent={() => <EmptyView text="Your favorite products appear here" />}
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
});
