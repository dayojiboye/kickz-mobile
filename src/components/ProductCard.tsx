import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ProductType } from "../types";
import theme from "../config/theme";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import Rating from "./Rating";
import { formatCurrency } from "../utils/helpers";

type Props = {
	isFavorite: boolean;
	product: ProductType;
	rating: number;
};

export default function ProductCard({ isFavorite, product, rating }: Props) {
	const [isFav, setIsFav] = React.useState(false);

	return (
		<TouchableOpacity activeOpacity={0.8} style={styles.container}>
			<ImageBackground
				style={styles.imageContainer}
				imageStyle={styles.image}
				// resizeMode="center"
				source={{
					uri: product.thumbnail,
				}}
			>
				<LinearGradient
					colors={["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.7)"]}
					style={styles.cardOverlay}
				>
					<TouchableOpacity style={styles.favoriteButton} onPress={() => setIsFav(!isFav)}>
						<Icon
							name={isFav ? "favorite" : "favorite-border"}
							size={30}
							color={isFav ? theme.red : theme.white}
						/>
					</TouchableOpacity>
					<View style={styles.content}>
						<Text style={styles.productName}>{product.name}</Text>
						<Text style={[styles.productName, { fontSize: 20 }]}>
							{formatCurrency(product.price)}
						</Text>
						<Rating rating={rating} />
					</View>
				</LinearGradient>
			</ImageBackground>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 4,
		height: 250,
	},
	imageContainer: {
		flex: 1,
		position: "relative",
	},
	image: {
		borderRadius: 4,
	},
	cardOverlay: {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		borderRadius: 4,
		justifyContent: "space-between",
		padding: 16,
	},
	content: {
		gap: 7,
	},
	productName: {
		color: theme.white,
		fontFamily: theme.fontBold,
		fontSize: 22,
		lineHeight: 28,
	},
	favoriteButton: {
		marginLeft: "auto",
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "rgba(0, 0, 0, 0.3)",
		justifyContent: "center",
		alignItems: "center",
	},
});
