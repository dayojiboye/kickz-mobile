import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { format as formatDate } from "date-fns";
import { convertTimestampToDate, formatCurrency } from "../utils/helpers";
import theme from "../config/theme";

type Props = {
	orderDate: Date | string;
	orderID: string | undefined;
	orderAmount: number;
	onTap: () => void;
};

export default function OrderTile({ orderDate, orderID, orderAmount, onTap }: Props) {
	return (
		<TouchableOpacity style={styles.orderTile} onPress={() => onTap?.()}>
			<Text style={styles.orderText}>
				{formatDate(convertTimestampToDate(orderDate).toDate(), "dd/MM/yyyy")}
			</Text>
			<Text numberOfLines={1} style={[styles.orderText, { flex: 1 }]}>
				{orderID}
			</Text>
			<Text style={styles.orderText}>{formatCurrency(orderAmount)}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	orderTile: {
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: theme.border,
		flexDirection: "row",
		gap: 10,
	},
	orderText: {
		fontFamily: theme.fontRegular,
		fontSize: 16,
		color: "#1b1b1b",
	},
});
