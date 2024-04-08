import { User, createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const getCurrentUser = async (authToken: string | undefined) => {
	if (!authToken) return null;
	const user: User | null = (await supabase.auth.getUser(authToken)).data
		.user;
	return user;
};
