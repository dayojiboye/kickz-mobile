import {
	Dimensions,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../types";
import CustomAppBar from "../components/CustomAppBar";
import theme from "../config/theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import useStore from "../hooks/useStore";
import { formatCurrency } from "../utils/helpers";
import PreferenceButton from "../components/PreferenceButton";
import QuantityButton from "../components/QuantityButton";
import CustomButton from "../components/CustomButton";
import ExpansionPanel from "../components/ExpansionPanel";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import ProductOptionsBottomSheet from "../components/BottomSheets/ProductOptions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<HomeStackParamList, "Product">;
const { width } = Dimensions.get("window");

export default function ProductScreen({ navigation, route }: Props) {
	const { product } = route.params;
	const { favoriteProducts, addFavoriteProduct, removeFavoriteProduct } = useStore();
	const isFav = favoriteProducts.some((prod) => prod.documentID === product.documentID);
	const [quantity, setQuantity] = React.useState<number>(1);
	const productOptionsBottomSheetRef = React.useRef<BottomSheetModal>(null);
	const inset = useSafeAreaInsets();

	const toggleFavorite = () => {
		if (isFav) removeFavoriteProduct(product);
		else addFavoriteProduct(product);
	};

	return (
		<>
			<View
				style={{
					flex: 1,
					backgroundColor: theme.white,
					position: "relative",
					paddingTop: inset.top,
				}}
			>
				<CustomAppBar
					style={{ backgroundColor: "transparent", position: "absolute", top: 10 }}
					leadIcon={Icon}
					leadIconStyle={styles.ctaButton}
					leadIconProps={{ name: "chevron-left", size: 40, color: theme.white }}
					onLeadPress={() => navigation.goBack()}
				/>
				<ScrollView
					style={{ flex: 1, backgroundColor: theme.white }}
					contentContainerStyle={styles.container}
					stickyHeaderIndices={[1]}
				>
					<ImageBackground
						source={{
							uri: product.thumbnail,
						}}
						style={styles.heroImage}
					/>
					<View style={styles.stickyContent}>
						<TouchableOpacity
							style={[
								styles.ctaButton,
								{
									alignItems: "center",
									justifyContent: "center",
									backgroundColor: isFav ? theme.primary : theme.iconBg,
								},
							]}
							onPress={toggleFavorite}
						>
							<Icon name={isFav ? "favorite" : "favorite-border"} size={28} color={theme.white} />
						</TouchableOpacity>
					</View>
					<View style={styles.content}>
						<View style={styles.heading}>
							<Text style={styles.headingText}>{product.name}</Text>
							<TouchableOpacity onPress={() => productOptionsBottomSheetRef.current?.present()}>
								<Icon name="more-horiz" color={theme.black} size={28} />
							</TouchableOpacity>
						</View>
						<Text style={styles.priceText}>{formatCurrency(product.price)}</Text>
						<View style={{ marginTop: 24, gap: 10 }}>
							<PreferenceButton label="Size" preference="Medium" onPress={() => {}} />
							<QuantityButton
								quantity={quantity}
								onIncrease={() => setQuantity(quantity + 1)}
								onDecrease={() => setQuantity(quantity - 1)}
							/>
						</View>
						<CustomButton label="Add to bag" style={{ marginTop: 24 }} />
						<Text style={[styles.headingText, { marginTop: 40 }]}>Description</Text>
						<Text style={styles.priceText}>{product.desc}</Text>
						<ExpansionPanel title="Shipping policy" style={{ marginTop: 32 }}>
							<Text style={[styles.priceText, { marginTop: 0 }]}>
								At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
								praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
								excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
								officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem
								rerum facilis est et expedita distinctio.
							</Text>
						</ExpansionPanel>
						<ExpansionPanel title="Refund policy" style={{ marginTop: 32 }}>
							<Text style={[styles.priceText, { marginTop: 0 }]}>
								At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
								praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
								excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
								officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem
								rerum facilis est et expedita distinctio.
							</Text>
						</ExpansionPanel>
					</View>
				</ScrollView>
			</View>
			<ProductOptionsBottomSheet ref={productOptionsBottomSheetRef} />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		paddingBottom: 50,
	},
	heroImage: {
		height: 400,
		width,
	},
	ctaButton: {
		backgroundColor: theme.iconBg,
		width: 50,
		height: 50,
		borderRadius: 25,
		paddingRight: 0,
	},
	stickyContent: {
		backgroundColor: "transparent",
		alignItems: "flex-end",
		paddingHorizontal: 20,
		paddingVertical: 10,
		position: "absolute",
		top: -80,
	},
	content: {
		marginTop: -80,
		paddingHorizontal: 20,
		paddingTop: 40,
	},
	heading: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headingText: {
		fontFamily: theme.fontBold,
		fontSize: 28,
		color: theme.black,
		width: "70%",
		lineHeight: 32,
	},
	priceText: {
		fontFamily: theme.fontRegular,
		color: "#1b1b1b",
		fontSize: 18,
		marginTop: 16,
	},
});
