'use client';

import { auth } from '@/utilities/FirebaseConfig';
import { IFormResponse, formatErrorMessage } from '@/utilities/FormHelpers';
import {
	User,
	UserCredential,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';
import { useContext, createContext, useState, useEffect } from 'react';

interface AuthContextProps {
	user: User | null;
	authReady: boolean;
	signup: (email: string, password: string) => Promise<IFormResponse>;
	login: (user: User) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
	user: null,
	authReady: false,
	signup: async () => Promise.resolve({ code: 0, message: '' }),
	login: () => {},
	logout: () => {},
});

export const AuthProvider = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const [user, setUser] = useState<User | null>(null);
	const [authReady, setAuthReady] = useState<boolean>(false);

	const signup: (
		email: string,
		password: string
	) => Promise<IFormResponse> = async (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password)
			.then((response: UserCredential) => {
				setUser(response.user);
				return {
					code: 200,
					message: 'Login Successfull',
				};
			})
			.catch((error: any) => {
				return {
					code: error.code
						? formatErrorMessage(error.code)
						: 'Something went wrong!',
					message: error.message,
				};
			});
	};

	const login = (user: User) => {
		setUser(user);
	};

	const logout = () => {
		setUser(null);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			currentUser ? login(currentUser) : logout();
			setAuthReady(true);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, authReady, signup, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext: () => AuthContextProps = () =>
	useContext(AuthContext);
