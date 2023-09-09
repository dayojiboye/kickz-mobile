import { useQuery } from "react-query";
import { collection, query, getDocs, where } from "firebase/firestore";
import db from "../../firebase/firebaseConfig";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";
import { ProductType } from "../types";

export default function useGetProducts(
	category: "men" | "women",
	onDone?: () => void
	// isSearching?: boolean,
	// searchText?: string
) {
	const fetchProducts = async () => {
		const q = query(collection(db, "products"), where("category", "==", category));
		const querySnapshot = await getDocs(q);
		const products: ProductType[] = [];
		querySnapshot.forEach((doc) =>
			products.push({
				...JSON.parse(JSON.stringify(doc.data())),
				documentID: doc.id,
			})
		);
		return products;
	};

	return useQuery<ProductType[]>(["products", category], fetchProducts, {
		onError: (err: any) => {
			showToast(err.message, toastType.ERROR);
		},
		onSettled: () => {
			onDone?.();
		},
		// select: (data) => {
		// 	if (isSearching && searchText) {
		// 		const searchResult = data.filter((note) =>
		// 			note.content
		// 				.replace(regexToRemoveHtmlTags, "")
		// 				.toLowerCase()
		// 				.includes(searchText.toLowerCase())
		// 		);
		// 		return searchResult;
		// 	} else {
		// 		return data;
		// 	}
		// },
	});
}
