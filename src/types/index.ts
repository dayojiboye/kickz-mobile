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
	loginUser: (user: UserData) => void;
	logoutUser: () => void;
	setInitApp: (value: boolean) => void;
	addFavoriteProduct: (product: ProductType) => void;
	removeFavoriteProduct: (product: ProductType) => void;
};

export type RootStackParamList = {
	Login: undefined;
	Signup: undefined;
	Home:
		| undefined
		| { screen: string; params: { screen: string; params: { product: ProductType } } };
	Profile: undefined;
	HomeScreen: undefined | { screen: string; params: { product: ProductType } };
	OrdersScreen: undefined;
	Favorites: undefined;
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
	Checkout: undefined;
};
