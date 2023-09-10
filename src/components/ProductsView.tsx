import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import theme from "../config/theme";
import { HomeStackParamList, ProductType } from "../types";
import { Skeleton } from "moti/skeleton";
import ProductCard from "./ProductCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function ProductsView({
	products,
	isLoading,
	refreshing,
	onRefresh,
}: {
	products: ProductType[];
	isLoading: boolean;
	refreshing?: boolean;
	onRefresh?: () => void;
}) {
	const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

	return (
		<View style={styles.container}>
			{isLoading ? (
				<LoadingComponent />
			) : (
				<FlatList
					data={products}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item: product }) => (
						<ProductCard
							product={product}
							onPress={() => navigation.navigate("Product", { product })}
							// rating={Math.floor(Math.random() * (6 - 1) + 1)}
						/>
					)}
					style={{ flex: 1 }}
					numColumns={2}
					contentContainerStyle={styles.contentStyle}
					columnWrapperStyle={{ gap: 10 }}
					refreshing={refreshing}
					onRefresh={onRefresh}
				/>
			)}
		</View>
	);
}

const LoadingComponent = () => {
	return (
		<View style={styles.loadingContainer}>
			{Array(12)
				.fill({})
				.map((_, index) => (
					<LoadingSkeleton key={index} />
				))}
		</View>
	);
};

const LoadingSkeleton = () => {
	return (
		<View style={styles.skeleton}>
			<Skeleton colorMode="light" radius={4} height={180} width="100%" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.white,
		paddingTop: 10,
	},
	contentStyle: {
		paddingTop: 28,
		paddingHorizontal: 20,
		paddingBottom: 50,
		rowGap: 20,
	},
	loadingContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		rowGap: 10,
		width: "100%",
		paddingTop: 28,
		paddingHorizontal: 20,
	},
	skeleton: {
		width: "48%",
	},
});
