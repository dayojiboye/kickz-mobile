export type UserData =
	| {
			displayName: string;
			email: string | null;
			uid: string;
			createdDate: string | Date;
			userRoles: string;
	  }
	| undefined;

export type AppContextValue = {
	user: UserData | null;
	isInitializing: boolean;
	isAuth: boolean;
	favoriteProducts: ProductType[];
	cart: CartItemType[];
	loginUser: (user: UserData) => void;
	logoutUser: () => void;
	setInitApp: (value: boolean) => void;
	loadFavorites: (favorites: ProductType[]) => void;
	addFavoriteProduct: (product: ProductType) => void;
	removeFavoriteProduct: (product: ProductType) => void;
	loadCart: (cartItems: CartItemType[]) => void;
	addToCart: (cartItem: CartItemType) => void;
	removeCartItem: (id: string) => void;
	reduceCartItem: (cartItem: CartItemType) => void;
	clearCart: () => void;
};

export type RootStackParamList = {
	Login: undefined;
	Signup: undefined;
	Home: undefined;
	Profile: undefined;
	HomeScreen: undefined;
	FavoritesScreen: undefined;
	OrdersScreen: undefined;
	CartScreen: undefined;
};

export type ProductType = {
	adminUserUID: string;
	category: string;
	createdDate: Date | string;
	desc: string;
	name: string;
	price: number;
	thumbnail: string;
	documentID: string;
};

export type ScrollContextType = {
	opacity: number;
	maxOffset: number;
	offset: number;
	titleShowing: boolean;
	updateOffset(val: number): void;
};

export type ChildProps = {
	children: JSX.Element[] | JSX.Element;
};

export type HomeStackParamList = {
	Products: undefined;
	Product: { product: ProductType };
};

export type FavoritesStackParamList = {
	Favorites: undefined;
	FavoriteProduct: { product: ProductType };
};

export type CartStackParamList = {
	Cart: undefined;
	Checkout: undefined;
};

export type CartItemType = {
	quantity: number;
	size: number;
} & ProductType;
