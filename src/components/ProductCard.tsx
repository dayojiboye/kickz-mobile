import {
	ImageBackground,
	StyleProp,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";
import React from "react";
import { ProductType } from "../types";
import theme from "../config/theme";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { formatCurrency } from "../utils/helpers";
import useStore from "../hooks/useStore";

type Props = {
	product: ProductType;
	style?: StyleProp<ViewStyle>;
	onPress: () => void;
};

export default function ProductCard({ product, style, onPress }: Props) {
	const { favoriteProducts, addFavoriteProduct, removeFavoriteProduct } = useStore();
	const isFav = favoriteProducts.some((prod) => prod.documentID === product.documentID);

	const toggleFavorite = (product: ProductType) => {
		if (isFav) removeFavoriteProduct(product);
		else addFavoriteProduct(product);
	};

	return (
		<TouchableOpacity activeOpacity={0.8} style={[styles.container, style]} onPress={onPress}>
			<ImageBackground
				style={styles.imageContainer}
				imageStyle={styles.image}
				source={{
					uri: product.thumbnail,
				}}
			>
				<LinearGradient
					colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.5)"]}
					style={styles.cardOverlay}
				>
					<TouchableOpacity
						style={[
							styles.favoriteButton,
							{ backgroundColor: isFav ? theme.primary : theme.iconBg },
						]}
						onPress={() => toggleFavorite(product)}
					>
						<Icon name={isFav ? "favorite" : "favorite-border"} size={23} color={theme.white} />
					</TouchableOpacity>
				</LinearGradient>
			</ImageBackground>
			<View style={styles.content}>
				<Text style={styles.productName} numberOfLines={1}>
					{product.name}
				</Text>
				<Text style={styles.productName} numberOfLines={1}>
					{product.desc}
				</Text>
				<Text style={[styles.productName, { fontFamily: theme.fontMedium }]}>
					{formatCurrency(product.price)}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "48.5%",
		flexShrink: 0,
	},
	imageContainer: {
		height: 150,
		position: "relative",
		marginBottom: 5,
	},
	image: {
		borderRadius: 20,
	},
	cardOverlay: {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		borderRadius: 20,
		justifyContent: "flex-end",
		alignItems: "flex-end",
		padding: 12,
	},
	content: {
		marginTop: "auto",
	},
	productName: {
		color: theme.black,
		fontFamily: theme.fontRegular,
		fontSize: 15,
	},
	favoriteButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
});
