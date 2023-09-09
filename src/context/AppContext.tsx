import React from "react";
import { AppContextValue, ProductType, UserData } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const _storeUserId = async (value: string) => {
	try {
		await AsyncStorage.setItem("userId", value);
	} catch (err) {
		__DEV__ && console.log("Something went wrong saving user ID", err);
	}
};

const _removeUserId = async () => {
	try {
		await AsyncStorage.removeItem("userId");
	} catch (err) {
		__DEV__ && console.log("Something went wrong removing user ID", err);
	}
};

const _storeFavorites = async (value: ProductType) => {
	try {
		await AsyncStorage.setItem("favorites", JSON.stringify(value));
	} catch (err) {
		__DEV__ && console.log("Something went wrong saving product", err);
	}
};

type AppContextAction =
	| { type: "login_user"; payload: UserData }
	| { type: "logout_user" }
	| { type: "init_app"; payload: boolean }
	| { type: "add_fav"; payload: ProductType }
	| { type: "remove_fav"; payload: ProductType };

const initialState: {
	user: UserData | null;
	isInitializing: boolean;
	isAuth: boolean;
	favoriteProducts: ProductType[];
} = {
	user: null,
	isInitializing: true,
	isAuth: false,
	favoriteProducts: [],
};

export const AppContext = React.createContext({} as AppContextValue);

const reducer = (state: typeof initialState, action: AppContextAction) => {
	switch (action.type) {
		case "login_user":
			return {
				...state,
				user: action.payload,
				isAuth: true,
			};

		case "logout_user":
			return {
				...state,
				user: null,
				isAuth: false,
			};

		case "init_app":
			return {
				...state,
				isInitializing: action.payload,
			};

		case "add_fav":
			return {
				...state,
				favoriteProducts: [action.payload, ...state.favoriteProducts],
			};

		case "remove_fav":
			return {
				...state,
				favoriteProducts: state.favoriteProducts.filter(
					(prod) => prod.documentID !== action.payload.documentID
				),
			};

		default:
			throw new Error("Unsupported action type for app context");
	}
};

export default function AppProvider(props: React.PropsWithChildren<{}>) {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	const value: AppContextValue = React.useMemo(() => {
		const loginUser = (user: UserData) => {
			dispatch({ type: "login_user", payload: user });
			if (user?.uid) _storeUserId(user?.uid);
		};

		const logoutUser = () => {
			dispatch({ type: "logout_user" });
			_removeUserId();
		};

		const setInitApp = (value: boolean) => {
			dispatch({ type: "init_app", payload: value });
		};

		const addFavoriteProduct = (value: ProductType) => {
			dispatch({ type: "add_fav", payload: value });
			_storeFavorites(value);
		};

		const removeFavoriteProduct = (value: ProductType) => {
			dispatch({ type: "remove_fav", payload: value });
			_storeFavorites(value);
		};

		return {
			user: state.user,
			isInitializing: state.isInitializing,
			isAuth: state.isAuth,
			favoriteProducts: state.favoriteProducts,
			loginUser,
			logoutUser,
			setInitApp,
			addFavoriteProduct,
			removeFavoriteProduct,
		};
	}, [state.user, state.isInitializing, state.isAuth, state.favoriteProducts]);

	return <AppContext.Provider value={value} {...props} />;
}
