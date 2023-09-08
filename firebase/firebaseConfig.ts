import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
	FIREBASE_API_KEY,
	FIREBASE_AUTH_DOMAIN,
	FIREBASE_PROJECT_ID,
	FIREBASE_STORAGE_BUCKET,
	FIREBASE_MESSAGING_SENDER_ID,
	FIREBASE_APP_ID,
	FIREBASE_DATA_URL,
} from "@env";

// Initialize Firebase
const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: FIREBASE_AUTH_DOMAIN,
	databaseURL: FIREBASE_DATA_URL,
	projectId: FIREBASE_PROJECT_ID,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
	appId: FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

import * as firebaseAuth from "firebase/auth";
import "firebase/firestore";

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
const db = getFirestore(app);

export const auth = firebaseAuth.initializeAuth(app, {
	persistence: reactNativePersistence(AsyncStorage),
});
export default db;
