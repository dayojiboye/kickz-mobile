import { useQuery } from "react-query";
import { collection, query, getDocs } from "firebase/firestore";
import db from "../../firebase/firebaseConfig";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";
import useStore from "./useStore";
import { ProductType } from "../types";

export default function useGetProducts(
	onDone?: () => void
	// isSearching?: boolean,
	// searchText?: string
) {
	const appStore = useStore();

	const fetchUserNotes = async () => {
		const q = query(collection(db, "products"));
		const querySnapshot = await getDocs(q);
		const products: ProductType[] = [];
		querySnapshot.forEach((doc) => products.push(JSON.parse(JSON.stringify(doc.data()))));
		return products;
	};

	return useQuery<ProductType[]>(["user_notes", appStore.user?.uid], fetchUserNotes, {
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
