import { StyleSheet } from "react-native";
import ProductsView from "../../components/ProductsView";
import useGetProducts from "../../hooks/useGetProducts";

export default function WomenScreen() {
	const womenProductsQuery = useGetProducts("women");

	return (
		<ProductsView
			isLoading={womenProductsQuery.isLoading}
			products={womenProductsQuery.data || []}
		/>
	);
}

const styles = StyleSheet.create({});
