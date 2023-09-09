import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ProductType } from "../types";
import theme from "../config/theme";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { formatCurrency } from "../utils/helpers";
import { BlurView } from "expo-blur";

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
				source={{
					uri: product.thumbnail,
				}}
			>
				<LinearGradient
					colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.5)"]}
					style={styles.cardOverlay}
				>
					<BlurView style={styles.favoriteButton} intensity={3} tint="light">
						<TouchableOpacity
							style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
							onPress={() => setIsFav(!isFav)}
						>
							<Icon
								name={isFav ? "favorite" : "favorite-border"}
								size={25}
								color={isFav ? theme.red : theme.white}
							/>
						</TouchableOpacity>
					</BlurView>
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
		flex: 1,
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
		fontSize: 16,
	},
	favoriteButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "rgba(156, 153, 153, 0.7)",
	},
});