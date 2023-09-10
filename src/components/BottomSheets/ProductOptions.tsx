import { TouchableOpacity, Text, View } from "react-native";
import React from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AppBottomSheet from ".";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import theme from "../../config/theme";

type Props = {};

const ProductOptionsBottomSheet = React.forwardRef(
	({}: Props, ref: React.Ref<BottomSheetModalMethods>) => {
		const closeBottomsheet = React.useCallback(() => {
			// @ts-ignore
			ref?.current?.close();
		}, []);

		return (
			<AppBottomSheet ref={ref} snapPoints={["30%"]} closeBottomsheet={closeBottomsheet}>
				<View style={styles.header}>
					<Text style={styles.headingText}>More options</Text>
				</View>
				<View style={styles.container}>
					<TouchableOpacity style={styles.option}>
						<Icon color={theme.black} name="dislike2" size={24} />
						<Text style={styles.optionText}>Not interested</Text>
					</TouchableOpacity>
					<View style={{ borderBottomWidth: 1, borderColor: theme.muted }} />
					<TouchableOpacity style={styles.option}>
						<Icon color={theme.red} name="exclamationcircleo" size={24} />
						<Text style={[styles.optionText, { color: theme.red }]}>Report</Text>
					</TouchableOpacity>
				</View>
			</AppBottomSheet>
		);
	}
);

export default ProductOptionsBottomSheet;

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
		gap: 16,
		paddingVertical: 15,
	},
	optionText: {
		fontFamily: theme.fontSemiBold,
		fontSize: 18,
		color: theme.black,
	},
});
