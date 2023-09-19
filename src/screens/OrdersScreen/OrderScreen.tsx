import { ActivityIndicator, StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import useFetchUserOrder from "../../hooks/useFetchOrder";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OrderItemType, OrdersStackParamList } from "../../types";
import ErrorComponent from "../../components/ErrorComponent";
import CustomAppBar from "../../components/CustomAppBar";
import theme from "../../config/theme";
import HeadingText from "../../components/HeadingText";
import Icon from "react-native-vector-icons/Octicons";
import { convertTimestampToDate, formatCurrency } from "../../utils/helpers";
import { format as formatDate } from "date-fns";

type Props = NativeStackScreenProps<OrdersStackParamList, "Order">;

export default function OrderScreen({ navigation, route }: Props) {
	const { orderId } = route.params;
	const fetchUserOrder = useFetchUserOrder(orderId);

	const renderView = () => {
		if (fetchUserOrder?.isLoading) {
			return <ActivityIndicator animating size="large" />;
		}

		if (fetchUserOrder?.isError && fetchUserOrder.isFetchedAfterMount) {
			return (
				<ErrorComponent
					errorMsg="An error occurred, please try again"
					onRetry={() => fetchUserOrder.refetch()}
				/>
			);
		}

		if (fetchUserOrder?.isSuccess) {
			if (fetchUserOrder.data.orderItems.length > 0) {
				const { orderCreatedDate, orderTotal } = fetchUserOrder.data || {};

				return (
					<>
						{fetchUserOrder.data.orderItems.map((item: OrderItemType) => (
							<View key={item.documentID} style={styles.orderItem}>
								<Image
									source={{
										uri: item.thumbnail,
									}}
									style={styles.image}
								/>
								<View style={{ gap: 7 }}>
									<Text style={[styles.text, { fontFamily: theme.fontSemiBold, maxWidth: 140 }]}>
										{item.name}
									</Text>
									<Text style={styles.text}>{formatCurrency(item.price)}</Text>
									<Text style={styles.text}>Quantity - {item.quantity}</Text>
								</View>
								<Text style={[styles.text, { marginLeft: "auto" }]}>
									{formatDate(convertTimestampToDate(orderCreatedDate).toDate(), "dd/MM/yyyy")}
								</Text>
							</View>
						))}
						<Text
							style={[styles.text, { fontFamily: theme.fontBold, fontSize: 18, marginTop: 48 }]}
						>
							Total: {formatCurrency(orderTotal)}
						</Text>
					</>
				);
			}

			return <></>;
		}

		return <></>;
	};

	return (
		<>
			<CustomAppBar
				leadIcon={Icon}
				leadIconProps={{ name: "chevron-left", size: 35, color: theme.textPrimary }}
				onLeadPress={() => navigation.goBack()}
			/>
			<ScrollView
				style={{ flex: 1, backgroundColor: theme.white }}
				contentContainerStyle={styles.container}
				scrollEnabled={fetchUserOrder?.data && Object.values(fetchUserOrder?.data).length > 0}
			>
				<HeadingText text={`Order ID: ${orderId}`} style={{ fontSize: 22 }} />
				{renderView()}
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
	orderItem: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: theme.border,
		paddingVertical: 20,
		gap: 16,
	},
	image: {
		borderRadius: 16,
		width: 140,
		height: 140,
	},
	text: {
		fontFamily: theme.fontRegular,
		color: theme.black,
		fontSize: 16,
	},
});
