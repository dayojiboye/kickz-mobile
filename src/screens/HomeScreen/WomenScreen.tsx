import ProductsView from "../../components/ProductsView";
import useGetProducts from "../../hooks/useGetProducts";
import React from "react";

export default function WomenScreen() {
	const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);
	const womenProductsQuery = useGetProducts("women", () => setIsRefreshing(false));

	return (
		<ProductsView
			isLoading={womenProductsQuery.isLoading}
			products={womenProductsQuery.data || []}
			refreshing={isRefreshing}
			onRefresh={() => {
				setIsRefreshing(true);
				womenProductsQuery.refetch();
			}}
		/>
	);
}
