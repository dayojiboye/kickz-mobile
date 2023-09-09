import { StyleSheet } from "react-native";
import ProductsView from "../../components/ProductsView";
import useGetProducts from "../../hooks/useGetProducts";

export default function MenScreen() {
	const menProductsQuery = useGetProducts("men");

	return (
		<ProductsView isLoading={menProductsQuery.isLoading} products={menProductsQuery.data || []} />
	);
}

const styles = StyleSheet.create({});
