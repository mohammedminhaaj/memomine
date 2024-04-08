'use client';

import { useAuthContext } from '@/store/AuthProvider';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { LargeLoaderFullScreen } from '../common/loader/Loader';

const RedirectIfLoggedIn = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	const { user, authReady } = useAuthContext();
	const { push } = useRouter();

	useLayoutEffect(() => {
		if (authReady && user) {
			push('/dashboard');
		}
	}, [user, authReady]);

	if (!authReady || user) return <LargeLoaderFullScreen />;

	return <>{children}</>;
};

export default RedirectIfLoggedIn;
