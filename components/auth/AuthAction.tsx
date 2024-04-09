import Link from 'next/link';
import NavItems from '../common/NavItems';
import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/actions/auth';

const LoginButton: React.FC = () => (
	<Link
		href='/login'
		type='button'
		className='rounded-xl font-extrabold text-primary bg-white px-4 py-2 transition-colors hover:bg-primary hover:text-white duration-500'>
		Sign In
	</Link>
);

const AuthAction: React.FC = async () => {
	const supabase = createClient();
	const { user } = await getUser(supabase);
	return user ? <NavItems userEmail={user.email!} /> : <LoginButton />;
};

export default AuthAction;
