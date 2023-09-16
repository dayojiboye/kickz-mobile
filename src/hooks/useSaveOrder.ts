import { useMutation, useQueryClient } from "react-query";
import db from "../../firebase/firebaseConfig";
import * as firestore from "firebase/firestore";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";
import { OrderType } from "../types";

export default function useSaveOrderMutation(onSuccess?: () => void, onSettled?: () => void) {
	const queryClient = useQueryClient();

	return useMutation<unknown, unknown, OrderType>(
		async (values) => {
			const docRef = await firestore.addDoc(firestore.collection(db, "orders"), values);
			return docRef;
		},
		{
			onSuccess: () => {
				onSuccess?.();
			},
			onError: (err: any) => {
				__DEV__ && console.log("Error saving order: ", err.message);
				showToast(err.message, toastType.ERROR);
			},
			onSettled: () => {
				onSettled?.();
				queryClient.refetchQueries("orders");
			},
		}
	);
}
