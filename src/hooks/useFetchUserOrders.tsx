import { useQuery } from "react-query";
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";
import db from "../../firebase/firebaseConfig";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";
import useStore from "./useStore";
import { OrderType } from "../types";

export default function useFetchUserOrders(onDone?: () => void) {
	const { user } = useStore();

	const fetchOrders = async () => {
		const q = query(
			collection(db, "orders"),
			where("orderUserID", "==", user?.uid),
			orderBy("orderCreatedDate", "desc")
		);
		const querySnapshot = await getDocs(q);
		const orders: OrderType[] = [];
		querySnapshot.forEach((doc) =>
			orders.push({
				...JSON.parse(JSON.stringify(doc.data())),
				documentID: doc.id,
			})
		);
		return orders;
	};

	return useQuery<OrderType[]>(["orders", user?.uid], fetchOrders, {
		onError: (err: any) => {
			showToast(err.message, toastType.ERROR);
		},
		onSettled: () => {
			onDone?.();
		},
		// select: (data) => {
		// 	const sortedData = [...data].sort((a, b) =>
		// 		b.orderCreatedDate > a.orderCreatedDate ? -1 : 1
		// 	);
		// 	return sortedData;
		// },
	});
}
