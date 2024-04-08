'use client';

import { useAuthContext } from '@/store/AuthProvider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { LargeLoaderFullScreen } from '../common/loader/Loader';

const ProtectedRoute: React.FC<{
	children: React.ReactNode;
}> = ({ children }: { children: React.ReactNode }) => {
	const { user, authReady } = useAuthContext();
	const { replace } = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();

	useLayoutEffect(() => {
		if (authReady && !user) {
			const params = new URLSearchParams(searchParams);
			params.set('next', pathName);
			replace(`/login?${params.toString()}`);
		}
	}, [authReady, user]);

	if (!authReady || !user) {
		return <LargeLoaderFullScreen />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
