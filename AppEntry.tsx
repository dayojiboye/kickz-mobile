import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import * as SplashScreen from "expo-splash-screen";
import useStore from "./src/hooks/useStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import useAuthentication from "./src/hooks/useAuthentication";
import * as firestore from "firebase/firestore";
import { useMutation } from "react-query";
import { UserData } from "./src/types";
import { showToast } from "./src/utils/helpers";
import { toastType } from "./src/enums";
import db from "./firebase/firebaseConfig";
import AppRoutes from "./src/config/routes";

SplashScreen.preventAutoHideAsync();

export default function AppEntry() {
	const appStore = useStore();
	const user = useAuthentication();

	const _getUserFavorites = async () => {
		try {
			const value = await AsyncStorage.getItem("favorites");
			if (value !== null) {
				appStore.loadFavorites(JSON.parse(value));
			}
		} catch (err) {
			__DEV__ && console.log("Something went wrong loading favorites", err);
		}
	};

	const _fetchUserData = useMutation<
		firestore.DocumentSnapshot<firestore.DocumentData, firestore.DocumentData> | undefined
	>(
		async (values) => {
			const userId = await AsyncStorage.getItem("userId");
			if (!userId) {
				return;
			}
			const docRef = firestore.doc(db, "users", userId);
			const docSnap = await firestore.getDoc(docRef);
			return docSnap;
		},
		{
			onSuccess: (data) => {
				if (data?.exists()) {
					const userData: UserData = JSON.parse(JSON.stringify(data.data()));
					appStore.loginUser(userData);
				} else {
					__DEV__ && console.log("No user logged in!");
				}
			},
			onError: (err: any) => {
				__DEV__ && console.log("Error fecthing user data: ", err.message);
				showToast(err.message, toastType.ERROR);
			},
			onSettled: () => {
				setTimeout(() => {
					appStore.setInitApp(false);
				}, 500);
			},
		}
	);

	const [fontsLoaded] = useFonts({
		OSLight: require("./assets/fonts/OpenSans-Light.ttf"),
		OS: require("./assets/fonts/OpenSans-Regular.ttf"),
		OSMedium: require("./assets/fonts/OpenSans-Medium.ttf"),
		OSSemiBold: require("./assets/fonts/OpenSans-SemiBold.ttf"),
		OSBold: require("./assets/fonts/OpenSans-Bold.ttf"),
	});

	React.useEffect(() => {
		_fetchUserData.mutate();
	}, []);

	const onLayoutRootView = React.useCallback(async () => {
		if (fontsLoaded) {
			_getUserFavorites();
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded || appStore.isInitializing) {
		// App is still loading
		return null;
	}

	return (
		<SafeAreaProvider onLayout={onLayoutRootView}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<NavigationContainer>
						<RootSiblingParent>
							<AppRoutes />
						</RootSiblingParent>
					</NavigationContainer>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}
