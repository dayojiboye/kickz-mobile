import { TouchableOpacity, Text, View } from "react-native";
import React from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AppBottomSheet from ".";
import { StyleSheet } from "react-native";
import theme from "../../config/theme";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ProductType } from "../../types";
import Icon from "react-native-vector-icons/MaterialIcons";
import useStore from "../../hooks/useStore";
import SIcon from "react-native-vector-icons/SimpleLineIcons";

type Props = {};

const ManageProductBottomSheet = React.forwardRef(({}: Props, ref) => {
	const bottomsheetRef = React.useRef<BottomSheetModal>(null);
	const [product, setProduct] = React.useState<ProductType>();
	const { favoriteProducts, addFavoriteProduct, removeFavoriteProduct, removeCartItem } =
		useStore();
	const isFav = favoriteProducts.some((prod) => prod.documentID === product?.documentID);

	const closeBottomsheet = React.useCallback(() => {
		bottomsheetRef?.current?.close();
		setProduct(undefined);
	}, []);

	const toggleFavorite = () => {
		if (!product) return;
		if (isFav) removeFavoriteProduct(product);
		else addFavoriteProduct(product);
		closeBottomsheet();
	};

	const onRemoveProduct = () => {
		if (!product) return;
		removeCartItem(product.documentID);
		closeBottomsheet();
	};

	React.useImperativeHandle(
		ref,
		() => {
			return {
				open: (prod: ProductType) => {
					bottomsheetRef.current?.present();
					setProduct(prod);
				},
			};
		},
		[]
	);

	return (
		<AppBottomSheet ref={bottomsheetRef} snapPoints={["30%"]} closeBottomsheet={closeBottomsheet}>
			<View style={styles.header}>
				<Text style={styles.headingText}>Manage product</Text>
			</View>
			<View style={styles.container}>
				<TouchableOpacity style={styles.option} onPress={toggleFavorite}>
					<Icon
						name={isFav ? "favorite" : "favorite-border"}
						size={28}
						color={theme.black}
						style={styles.iconStyle}
					/>
					<Text style={styles.optionText}>
						{isFav ? "Remove from favorites" : "Move to favorites"}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.option} onPress={onRemoveProduct}>
					<SIcon color={theme.red} name="trash" size={24} style={styles.iconStyle} />
					<Text style={[styles.optionText, { color: theme.red }]}>Remove from bag</Text>
				</TouchableOpacity>
			</View>
		</AppBottomSheet>
	);
});

export default ManageProductBottomSheet;

const styles = StyleSheet.create({
	container: {
		paddingTop: 15,
		paddingHorizontal: 20,
	},
	header: {
		justifyContent: "center",
		paddingHorizontal: 20,
		paddingTop: 10,
	},
	headingText: {
		fontFamily: theme.fontBold,
		fontSize: 28,
		color: theme.black,
		lineHeight: 32,
		textAlign: "center",
	},
	option: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingVertical: 15,
	},
	optionText: {
		fontFamily: theme.fontSemiBold,
		fontSize: 18,
		color: theme.black,
	},
	iconStyle: {
		width: 30,
	},
});
