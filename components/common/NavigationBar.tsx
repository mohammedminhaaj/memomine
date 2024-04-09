'use server';

import { Suspense } from 'react';
import AuthAction from '../auth/AuthAction';
import Logo from './Logo';
import { SmallLoader } from './loader/Loader';

const NavigationBar: React.FC = async () => {
	return (
		<header className='w-full fixed h-fit z-30'>
			<nav className='rounded-2xl mt-5 mx-auto w-11/12 flex items-center justify-between p-5 shadow-lg bg-white backdrop-filter backdrop-blur-sm bg-opacity-5'>
				<Logo />
				<Suspense key={'get-user'} fallback={<SmallLoader />}>
					<AuthAction />
				</Suspense>
			</nav>
		</header>
	);
};

export default NavigationBar;
