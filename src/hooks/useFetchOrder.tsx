import { useQuery } from "react-query";
import * as firestore from "firebase/firestore";
import db from "../../firebase/firebaseConfig";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";
import useStore from "./useStore";
import { OrderType } from "../types";

export default function useFetchUserOrder(docId: string | undefined, onDone?: () => void) {
	const { user } = useStore();

	if (!docId) return;

	const fetchOrder = async () => {
		const docRef = firestore.doc(db, "orders", docId);
		const docSnap = await firestore.getDoc(docRef);
		if (docSnap.exists()) {
			const userOrder: OrderType = JSON.parse(JSON.stringify(docSnap.data()));
			return userOrder;
		}
		return {};
	};

	return useQuery<OrderType | any>(["order", user?.uid, docId], fetchOrder, {
		onError: (err: any) => {
			showToast(err.message, toastType.ERROR);
		},
		onSettled: () => {
			onDone?.();
		},
	});
}
