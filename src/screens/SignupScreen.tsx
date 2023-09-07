import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

export default function SignupScreen() {
	return (
		<View>
			<Text>SignupScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
