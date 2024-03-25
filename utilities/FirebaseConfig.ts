import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';

type FirebaseConfigValue = string | undefined;

type FirebaseConfig = {
	apiKey: FirebaseConfigValue;
	authDomain: FirebaseConfigValue;
	projectId: FirebaseConfigValue;
	storageBucket: FirebaseConfigValue;
	messagingSenderId: FirebaseConfigValue;
	appId: FirebaseConfigValue;
};

const firebaseConfig: FirebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app: FirebaseApp = initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);

export { app, auth };
