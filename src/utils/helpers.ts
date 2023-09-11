import Toast from "react-native-root-toast";
import { toastType } from "../enums";
import { CartItemType } from "../types";

export const showToast = (
	message: string,
	variation?: toastType,
	position: number = 60,
	duration: number = Toast.durations.LONG
) =>
	Toast.show(message, {
		duration,
		position,
		backgroundColor: variation === toastType.ERROR ? "red" : "green",
		textColor: "#fff",
		textStyle: { fontSize: 16 },
		shadow: false,
		animation: true,
	});

export const formatCurrency = (cash: number | string): string => {
	const money = cash
		? Number(cash)
				.toFixed(2)
				.replace(/./g, (c, i, a) => (i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c))
		: "0.00";

	return `₦${money}`;
};

// Cart helpers
export const existingItem = (prevCartItems: CartItemType[], nextCartItem: CartItemType) => {
	return prevCartItems.some((item) => {
		return item.documentID === nextCartItem.documentID;
	});
};

export const handleAddToCart = (prevCartItems: CartItemType[], nextCartItem: CartItemType) => {
	const itemExists = existingItem(prevCartItems, nextCartItem);

	if (itemExists) {
		return prevCartItems.map((item) => {
			return item.documentID === nextCartItem.documentID
				? {
						...item,
						quantity: item.quantity + nextCartItem.quantity,
				  }
				: item;
		});
	}

	return [
		...prevCartItems,
		{
			...nextCartItem,
		},
	];
};

export const totalCartItems = (cart: CartItemType[]) => {
	if (!cart?.length) return;

	return cart.reduce((prev, cur) => prev + cur.quantity, 0);
};

export const handleRemoveCartItem = (prevCartItems: CartItemType[], currentID: string) => {
	return prevCartItems.filter((item) => item.documentID !== currentID);
};

export const handleReduceCartItem = (prevCartItems: CartItemType[], currentItem: CartItemType) => {
	return prevCartItems.map((item) => {
		return item.documentID === currentItem.documentID
			? {
					...item,
					quantity: item.quantity - 1,
			  }
			: item;
	});
};

export const totalCartPrice = (cart: CartItemType[]) => {
	return cart.reduce((prev, cur) => prev + cur.quantity * cur.price, 0);
};
