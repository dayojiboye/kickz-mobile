import React from "react";
import { FlatList as FlatListNative, FlatListProps } from "react-native";
import { ScrollContextType, ChildProps, ProductType } from "../types";

const withinLimits = (val: number, min: number, max: number): number =>
	val > max ? max : val < min ? min : val;

export const FlatListContext = React.createContext<ScrollContextType>({
	opacity: 0,
	maxOffset: 0,
	offset: 0,
	titleShowing: false,
	updateOffset: (val: number) => {},
});

export const useScroller = () => React.useContext(FlatListContext);

export const FlatListContextProvider = (props: ChildProps) => {
	const minOffset: number = 0;
	const maxOffset: number = 23;

	const [offset, setOffset] = React.useState(0);
	const [titleShowing, setTitleShowing] = React.useState(false);
	const [opacity, setOpacity] = React.useState(0);

	const updateOffset = (val: number) => {
		setOffset(withinLimits(val, minOffset, maxOffset));
		setTitleShowing(val > maxOffset);
		setOpacity(withinLimits((val * maxOffset) / 1000, 0, 1));
	};

	return (
		<FlatListContext.Provider
			value={{
				opacity: opacity,
				maxOffset: maxOffset,
				offset: offset,
				titleShowing: titleShowing,
				updateOffset: updateOffset,
			}}
		>
			{props.children}
		</FlatListContext.Provider>
	);
};

export const FlatList = (props: FlatListProps<ProductType>) => {
	const { updateOffset } = useScroller();

	return (
		<FlatListNative
			{...props}
			onScroll={({ nativeEvent }) => {
				updateOffset(nativeEvent.contentOffset.y);
			}}
			scrollEventThrottle={200}
		/>
	);
};

export default FlatListContextProvider;
