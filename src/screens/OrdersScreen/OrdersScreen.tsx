import { ActivityIndicator, RefreshControl, StyleSheet } from "react-native";
import React from "react";
import ScrollContextProvider, { ScrollView } from "../../context/ScrollContext";
import CustomAppBar from "../../components/CustomAppBar";
import theme from "../../config/theme";
import useFetchUserOrders from "../../hooks/useFetchUserOrders";
import EmptyView from "../../components/EmptyView";
import OrderTile from "../../components/OrderTile";
import ErrorComponent from "../../components/ErrorComponent";
import HeadingText from "../../components/HeadingText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OrdersStackParamList } from "../../types";

export default function OrdersScreen() {
	const navigation = useNavigation<NativeStackNavigationProp<OrdersStackParamList>>();
	const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

	const fetchUserOrdersQuery = useFetchUserOrders(() => setIsRefreshing(false));

	const renderView = () => {
		if (fetchUserOrdersQuery.isLoading) {
			return <ActivityIndicator animating size="large" />;
		}

		if (fetchUserOrdersQuery.isError && fetchUserOrdersQuery.isFetchedAfterMount) {
			return (
				<ErrorComponent
					errorMsg="An error occurred, please try again"
					onRetry={() => fetchUserOrdersQuery.refetch()}
				/>
			);
		}

		if (fetchUserOrdersQuery.isSuccess) {
			if (!fetchUserOrdersQuery.data || fetchUserOrdersQuery.data?.length === 0) {
				return <EmptyView text="All your orders appear here" textStyle={{ textAlign: "center" }} />;
			}

			return (
				<>
					{fetchUserOrdersQuery.data?.map((order) => (
						<OrderTile
							key={order.documentID}
							orderDate={order.orderCreatedDate}
							orderAmount={order.orderTotal}
							orderID={order.documentID}
							onTap={() => navigation.navigate("Order", { orderId: order.documentID })}
						/>
					))}
				</>
			);
		}

		return <></>;
	};

	return (
		<ScrollContextProvider>
			<CustomAppBar title="Order History" />
			<ScrollView
				style={{ flex: 1, backgroundColor: theme.white }}
				contentContainerStyle={styles.container}
				scrollEnabled={fetchUserOrdersQuery.data && fetchUserOrdersQuery.data?.length > 0}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={() => {
							setIsRefreshing(true);
							fetchUserOrdersQuery.refetch();
						}}
					/>
				}
			>
				<HeadingText text="Order History" />
				{renderView()}
			</ScrollView>
		</ScrollContextProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
});
