'use client';

import { IFormResponse } from '@/lib/formHelpers';
import { getCurrentUser, supabase } from '@/lib/supabaseConfig';
import { AuthError, AuthResponse, User } from '@supabase/supabase-js';
import {
	useContext,
	createContext,
	useState,
	useEffect,
	useCallback,
} from 'react';

interface AuthContextProps {
	user: User | null;
	authReady: boolean;
	signup: (email: string, password: string) => Promise<IFormResponse>;
	login: (email: string, password: string) => Promise<IFormResponse>;
	passwordReset: (email: string) => Promise<IFormResponse>;
	logout: () => Promise<IFormResponse>;
}

const AuthContext = createContext<AuthContextProps>({
	user: null,
	authReady: false,
	signup: async () => Promise.resolve({ code: 0, message: '' }),
	login: async () => Promise.resolve({ code: 0, message: '' }),
	passwordReset: async () => Promise.resolve({ code: 0, message: '' }),
	logout: async () => Promise.resolve({ code: 0, message: '' }),
});

export const AuthProvider = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const [user, setUser] = useState<User | null>(null);
	const [authReady, setAuthReady] = useState<boolean>(false);

	const signup = useCallback(async (email: string, password: string) => {
		return supabase.auth
			.signUp({
				email: email,
				password: password,
			})
			.then((response: AuthResponse) => {
				if (response.error) {
					const error: AuthError = response.error;
					return {
						code: 400,
						message: error.message,
					};
				}
				const user: User | null = response.data.user;
				setUser(user);
				return {
					code: 200,
					message: 'Account Created Successfully',
				};
			})
			.catch((error: any) => {
				return {
					code: 500,
					message: 'Something went wrong!',
				};
			});
	}, []);

	const login = useCallback(async (email: string, password: string) => {
		return supabase.auth
			.signInWithPassword({ email: email, password: password })
			.then((response: AuthResponse) => {
				if (response.error) {
					const error: AuthError = response.error;
					return {
						code: 400,
						message: error.message,
					};
				}
				const user: User | null = response.data.user;
				setUser(user);
				return {
					code: 200,
					message: 'User Logged In',
				};
			})
			.catch((error: any) => {
				return {
					code: 500,
					message: 'Something went wrong!',
				};
			});
	}, []);

	const passwordReset = useCallback(async (email: string) => {
		return supabase.auth
			.resetPasswordForEmail(email)
			.then((response) => {
				if (response.error) {
					const error: AuthError = response.error;
					return {
						code: 400,
						message: error.message,
					};
				}
				return {
					code: 200,
					message: 'Password Reset Email Sent',
				};
			})
			.catch((error: any) => {
				return {
					code: 500,
					message: 'Something went wrong!',
				};
			});
	}, []);

	const logout = useCallback(async () => {
		return supabase.auth
			.signOut()
			.then((response) => {
				if (response.error) {
					const error: AuthError = response.error;
					return {
						code: 400,
						message: error.message,
					};
				}
				setUser(null);
				return {
					code: 200,
					message: 'User Logged Out',
				};
			})
			.catch((error: any) => {
				return {
					code: 500,
					message: 'Something went wrong!',
				};
			});
	}, []);

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT') {
				setUser(null);
			} else {
				try {
					const currentUser: User | null = await getCurrentUser(
						session?.access_token
					);
					setUser(currentUser);
				} catch {
					setUser(null);
				}
			}
			// await storeAuthToken(session ? session.access_token : null);
			!authReady && setAuthReady(true);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				authReady,
				signup,
				login,
				passwordReset,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext: () => AuthContextProps = () =>
	useContext(AuthContext);
