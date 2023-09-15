import React from "react";
import { AppContextValue, CartItemType, ProductType, UserData } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleAddToCart, handleReduceCartItem, handleRemoveCartItem } from "../utils/helpers";

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

const _storeFavorites = async (value: ProductType[]) => {
	try {
		await AsyncStorage.setItem("favorites", JSON.stringify(value));
	} catch (err) {
		__DEV__ && console.log("Something went wrong saving favorites", err);
	}
};

const _storeCart = async (value: CartItemType[]) => {
	try {
		await AsyncStorage.setItem("cart", JSON.stringify(value));
	} catch (err) {
		__DEV__ && console.log("Something went wrong saving product to cart", err);
	}
};

type AppContextAction =
	| { type: "login_user"; payload: UserData }
	| { type: "logout_user" }
	| { type: "init_app"; payload: boolean }
	| { type: "add_fav"; payload: ProductType }
	| { type: "remove_fav"; payload: ProductType }
	| { type: "add_to_cart"; payload: CartItemType }
	| { type: "remove_cart_item"; payload: string }
	| { type: "reduce_cart_item"; payload: CartItemType }
	| { type: "clear_cart" }
	| { type: "load_favorites"; payload: ProductType[] }
	| { type: "load_cart"; payload: CartItemType[] };

const initialState: {
	user: UserData | null;
	isInitializing: boolean;
	isAuth: boolean;
	favoriteProducts: ProductType[];
	cart: CartItemType[];
} = {
	user: null,
	isInitializing: true,
	isAuth: false,
	favoriteProducts: [],
	cart: [],
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

		case "load_favorites":
			return {
				...state,
				favoriteProducts: action.payload,
			};

		case "add_fav":
			const updatedFavorites = [action.payload, ...state.favoriteProducts];
			_storeFavorites(updatedFavorites);

			return {
				...state,
				favoriteProducts: updatedFavorites,
			};

		case "remove_fav":
			const updatedFavoritesAfterRemoval = state.favoriteProducts.filter(
				(prod) => prod.documentID !== action.payload.documentID
			);
			_storeFavorites(updatedFavoritesAfterRemoval);

			return {
				...state,
				favoriteProducts: updatedFavoritesAfterRemoval,
			};

		case "load_cart":
			return {
				...state,
				cart: action.payload,
			};

		case "add_to_cart":
			const updatedCart = handleAddToCart(state.cart, action.payload);
			_storeCart(updatedCart);

			return {
				...state,
				cart: updatedCart,
			};

		case "remove_cart_item":
			const updatedCartAfterRemoval = handleRemoveCartItem(state.cart, action.payload);
			_storeCart(updatedCartAfterRemoval);

			return {
				...state,
				cart: updatedCartAfterRemoval,
			};

		case "reduce_cart_item":
			const updatedCartAfterReduction = handleReduceCartItem(state.cart, action.payload);
			_storeCart(updatedCartAfterReduction);

			return {
				...state,
				cart: updatedCartAfterReduction,
			};

		case "clear_cart":
			_storeCart([]);

			return {
				...state,
				cart: [],
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

		const loadFavorites = (value: ProductType[]) => {
			dispatch({ type: "load_favorites", payload: value });
		};

		const addFavoriteProduct = (value: ProductType) => {
			dispatch({ type: "add_fav", payload: value });
		};

		const removeFavoriteProduct = (value: ProductType) => {
			dispatch({ type: "remove_fav", payload: value });
		};

		const loadCart = (value: CartItemType[]) => {
			dispatch({ type: "load_cart", payload: value });
		};

		const addToCart = (value: CartItemType) => {
			dispatch({ type: "add_to_cart", payload: value });
		};

		const removeCartItem = (value: string) => {
			dispatch({ type: "remove_cart_item", payload: value });
		};

		const reduceCartItem = (value: CartItemType) => {
			dispatch({ type: "reduce_cart_item", payload: value });
		};

		const clearCart = () => {
			dispatch({ type: "clear_cart" });
		};

		return {
			user: state.user,
			isInitializing: state.isInitializing,
			isAuth: state.isAuth,
			favoriteProducts: state.favoriteProducts,
			cart: state.cart,
			loginUser,
			logoutUser,
			setInitApp,
			addFavoriteProduct,
			removeFavoriteProduct,
			addToCart,
			removeCartItem,
			reduceCartItem,
			clearCart,
			loadCart,
			loadFavorites,
		};
	}, [state.user, state.isInitializing, state.isAuth, state.favoriteProducts, state.cart]);

	return <AppContext.Provider value={value} {...props} />;
}
