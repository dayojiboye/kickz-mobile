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
	shippingInfo: ShippingInfoType;
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
	setShippingInfo: (info: ShippingInfoType) => void;
};

export type RootStackParamList = {
	Login: undefined;
	Signup: undefined;
	Home:
		| undefined
		| {
				screen: string;
		  };
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
	ShippingInfo: undefined;
	Checkout: undefined;
	CartProduct: { product: ProductType };
};

export type OrdersStackParamList = {
	Orders: undefined;
	Order: { order: OrderType };
};

export type CartItemType = {
	quantity: number;
	size: number;
} & ProductType;

export type ShippingInfoType = {
	firstName?: string;
	lastName?: string;
	email?: string;
	address?: string;
	city?: string;
	state?: string;
	postalCode?: string;
};

export type OrderType = {
	orderUserID: string | undefined;
	orderCreatedDate: string | Date;
	orderTotal: number;
	orderItems: {
		documentID: string;
		thumbnail: string;
		name: string;
		price: number;
		quantity: number;
	}[];
	documentID?: string;
};
