import React from "react";
import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import Backdrop from "../Backdrop";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import theme from "../../config/theme";
import { Text, View } from "react-native";

const AppBottomSheet = React.forwardRef(
	(
		props: { closeBottomsheet: () => void } & BottomSheetModalProps,
		ref: React.Ref<BottomSheetModalMethods>
	) => {
		return (
			<BottomSheetModal
				ref={ref}
				index={0}
				backgroundStyle={{ backgroundColor: theme.white, borderRadius: 32 }}
				handleIndicatorStyle={{ backgroundColor: theme.faded, width: 60 }}
				backdropComponent={(backdropProps) => (
					<Backdrop onPress={props.closeBottomsheet} {...backdropProps} />
				)}
				{...props}
			>
				{props.children}
			</BottomSheetModal>
		);
	}
);

export default AppBottomSheet;
