import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import theme from "../config/theme";
import UserAvatar from "../../assets/icons/avatar.svg";
import useStore from "../hooks/useStore";
import CustomButton from "../components/CustomButton";
import useLogoutMutation from "../hooks/useLogout";

const { height } = Dimensions.get("window");

export default function ProfileScreen() {
	const appStore = useStore();
	const { user } = appStore;

	const logoutMutation = useLogoutMutation();

	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: theme.white }}
			contentContainerStyle={styles.container}
		>
			<UserAvatar width={130} height={130} />
			<Text style={styles.userName}>{user?.displayName}</Text>
			<Text style={styles.userEmail}>{user?.email}</Text>
			<CustomButton
				label="Log out"
				isLoading={logoutMutation.isLoading}
				style={styles.logoutButton}
				onPress={() => logoutMutation.mutate()}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		height,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	userName: {
		marginTop: 32,
		color: theme.primary,
		fontFamily: theme.fontBold,
		fontSize: 28,
		textAlign: "center",
		letterSpacing: -1,
	},
	userEmail: {
		marginTop: 10,
		color: theme.primary,
		fontFamily: theme.fontMedium,
		fontSize: 18,
		textAlign: "center",
	},
	logoutButton: {
		marginTop: 100,
	},
});
