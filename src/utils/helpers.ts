import Toast from "react-native-root-toast";
import { toastType } from "../enums";

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
