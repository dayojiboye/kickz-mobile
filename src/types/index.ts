export type UserData =
	| {
			displayName: string;
			email: string | null;
			uid: string;
			createdDate: string;
			userRoles: string;
	  }
	| undefined;

export type AppContextValue = {
	user: UserData | null;
	isInitializing: boolean;
	isAuth: boolean;
	loginUser: (user: UserData) => void;
	logoutUser: () => void;
	setInitApp: (value: boolean) => void;
};

export type RootStackParamList = {
	Login: undefined;
	Signup: undefined;
	Home: undefined;
	Profile: undefined;
	HomeScreen: undefined;
};
