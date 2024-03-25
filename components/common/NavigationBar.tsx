import { overTheRainbow } from '@/app/layout';
import { useAuthContext } from '@/store/AuthProvider';
import Link from 'next/link';
import AuthStatus from '../auth/AuthStatus';

const NavigationBar: () => JSX.Element = () => {
	return (
		<header className='w-full fixed h-fit'>
			<nav className='rounded-2xl mt-5 mx-auto w-11/12 flex items-center justify-between p-5 shadow-lg z-10 bg-white backdrop-filter backdrop-blur-sm bg-opacity-5'>
				<Link
					href='/'
					className={`${overTheRainbow.className} text-3xl font-extrabold transition-colors text-black hover:text-white duration-500`}>
					<span className='hidden md:block'>Memomine</span>
					<span className='md:hidden'>m</span>
				</Link>
				<AuthStatus />
			</nav>
		</header>
	);
};

export default NavigationBar;
