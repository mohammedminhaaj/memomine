import RedirectIfLoggedIn from '@/components/auth/RedirectIfLoggedIn';
import Logo from '@/components/common/Logo';

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<RedirectIfLoggedIn>
			<header className='flex p-5'>
				<Logo />
			</header>
			<main className='flex flex-col mx-auto w-11/12 md:w-5/12 lg:4/12 gap-10'>
				<div className='flex flex-col gap-5 shadow-xl p-10 rounded-xl'>
					{children}
				</div>
				<div className='flex flex-row items-center justify-center gap-2 text-secondary text-sm'>
					<p>Terms of use</p>
					<p className='text-black'>|</p>
					<p>Privacy Policy</p>
				</div>
			</main>
		</RedirectIfLoggedIn>
	);
};

export default AuthLayout;
