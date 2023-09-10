import { Text, View } from "react-native";
import React from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AppBottomSheet from ".";
import { StyleSheet } from "react-native";
import theme from "../../config/theme";
import shoeSizes from "../../data/shoeSizes";
import SizeTile from "../SizeTile";
import { ScrollView } from "react-native-gesture-handler";

type Props = { selectedSize: number; onSelectSize: (size: number) => void };

const SizeOptionsBottomSheet = React.forwardRef(
	({ selectedSize, onSelectSize }: Props, ref: React.Ref<BottomSheetModalMethods>) => {
		const closeBottomsheet = React.useCallback(() => {
			// @ts-ignore
			ref?.current?.close();
		}, []);

		return (
			<AppBottomSheet ref={ref} snapPoints={["70%"]} closeBottomsheet={closeBottomsheet}>
				<View style={styles.header}>
					<Text style={styles.headingText}>Select Size</Text>
				</View>
				<ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
					{shoeSizes.map((size) => (
						<SizeTile
							key={size}
							label={size}
							isSelected={selectedSize === size}
							onPress={() => {
								onSelectSize(size);
								closeBottomsheet();
							}}
						/>
					))}
				</ScrollView>
			</AppBottomSheet>
		);
	}
);

export default SizeOptionsBottomSheet;

const styles = StyleSheet.create({
	container: {
		paddingTop: 15,
		paddingHorizontal: 20,
		gap: 10,
		paddingBottom: 30,
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
