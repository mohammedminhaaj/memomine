'use client';

import { useAuthContext } from '@/store/AuthProvider';
import Link from 'next/link';
import { SmallLoader } from '../common/loader/Loader';
import NavItems from '../common/NavItems';

const LoginButton: React.FC = () => (
	<Link
		href='/login'
		type='button'
		className='rounded-xl font-extrabold text-primary bg-white px-4 py-2 transition-colors hover:bg-primary hover:text-white duration-500'>
		Sign In
	</Link>
);

const AuthAction: React.FC = () => {
	const { user, authReady } = useAuthContext();
	return !authReady ? <SmallLoader /> : user ? <NavItems /> : <LoginButton />;
};

export default AuthAction;
