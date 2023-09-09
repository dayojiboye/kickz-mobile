import ProductsView from "../../components/ProductsView";
import useGetProducts from "../../hooks/useGetProducts";
import React from "react";

export default function MenScreen() {
	const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);
	const menProductsQuery = useGetProducts("men", () => setIsRefreshing(false));

	return (
		<ProductsView
			isLoading={menProductsQuery.isLoading}
			products={menProductsQuery.data || []}
			refreshing={isRefreshing}
			onRefresh={() => {
				setIsRefreshing(true);
				menProductsQuery.refetch();
			}}
		/>
	);
}
