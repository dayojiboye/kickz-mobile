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
	Home: undefined;
	Profile: undefined;
	Login: undefined;
	Signup: undefined;
};
