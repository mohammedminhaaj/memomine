import { getUser } from '@/actions/auth';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

const AuthWrapper = async ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	const supabase = createClient();
	const { user } = await getUser(supabase);
	if (user) redirect('/dashboard');
	return (
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
	);
};

export default AuthWrapper;
