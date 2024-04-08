import { createClient } from '@/lib/supabase/server';
import { AuthError, AuthResponse, SupabaseClient, User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export const userSignUp = async (email: string, password: string) => {
	const supabase = createClient();
	supabase.auth
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
};

export const getUser = async (supabase: SupabaseClient<any, 'public', any>) => {
	const user: User | null = (await supabase.auth.getUser()).data.user;
	if (!user) {
		redirect('/login');
	}
	return { user };
};
