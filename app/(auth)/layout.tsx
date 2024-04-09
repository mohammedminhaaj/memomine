import AuthWrapper from '@/components/auth/AuthWrapper';
import Logo from '@/components/common/Logo';
import { LargeLoaderFullScreen } from '@/components/common/loader/Loader';
import { Suspense } from 'react';

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<Suspense
				key={'redirect-if-loggedin'}
				fallback={<LargeLoaderFullScreen />}>
				<header className='flex p-5'>
					<Logo />
				</header>
				<AuthWrapper>{children}</AuthWrapper>
			</Suspense>
		</>
	);
};

export default AuthLayout;
