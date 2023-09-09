import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import theme from "../config/theme";
import { ProductType } from "../types";
import { Skeleton } from "moti/skeleton";
import ProductCard from "./ProductCard";

export default function ProductsView({
	products,
	isLoading,
}: {
	products: ProductType[];
	isLoading: boolean;
}) {
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
							isFavorite={false}
							rating={Math.floor(Math.random() * (6 - 1) + 1)}
						/>
					)}
					style={{ flex: 1 }}
					numColumns={2}
					contentContainerStyle={styles.contentStyle}
					columnWrapperStyle={{ gap: 10 }}
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
			<Skeleton colorMode="light" radius={4} height={250} width="100%" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.white,
		paddingTop: 20,
	},
	contentStyle: {
		paddingTop: 28,
		paddingHorizontal: 20,
		paddingBottom: 50,
		rowGap: 10,
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
