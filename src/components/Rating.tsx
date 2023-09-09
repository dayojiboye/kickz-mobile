import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import theme from "../config/theme";

type Props = {
	rating: number;
};

export default function Rating({ rating }: Props) {
	return (
		<View style={styles.container}>
			{rating > 0 ? (
				<Icon name="star-sharp" color="gold" size={15} />
			) : (
				<Icon name="star-outline" color="gold" size={15} />
			)}
			{rating > 1 ? (
				<Icon name="star-sharp" color="gold" size={15} />
			) : (
				<Icon name="star-outline" color="gold" size={15} />
			)}
			{rating > 2 ? (
				<Icon name="star-sharp" color="gold" size={15} />
			) : (
				<Icon name="star-outline" color="gold" size={15} />
			)}
			{rating > 3 ? (
				<Icon name="star-sharp" color="gold" size={15} />
			) : (
				<Icon name="star-outline" color="gold" size={15} />
			)}
			{rating > 4 ? (
				<Icon name="star-sharp" color="gold" size={15} />
			) : (
				<Icon name="star-outline" color="gold" size={15} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
});
