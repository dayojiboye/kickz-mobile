import React from "react";
import { AppContextValue, UserData } from "../types";
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

type AppContextAction =
	| { type: "login_user"; payload: UserData }
	| { type: "logout_user" }
	| { type: "init_app"; payload: boolean };

const initialState: {
	user: UserData | null;
	isInitializing: boolean;
	isAuth: boolean;
} = {
	user: null,
	isInitializing: true,
	isAuth: false,
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

		return {
			user: state.user,
			isInitializing: state.isInitializing,
			isAuth: state.isAuth,
			loginUser,
			logoutUser,
			setInitApp,
		};
	}, [state.user, state.isInitializing, state.isAuth]);

	return <AppContext.Provider value={value} {...props} />;
}
