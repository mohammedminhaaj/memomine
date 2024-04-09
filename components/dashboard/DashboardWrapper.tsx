import { getUser } from '@/actions/auth';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

const DashboardWrapper = async ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	const supabase = createClient();
	const { user } = await getUser(supabase);
	if (!user) redirect('/login');
	return (
		<main className='bg-gradient-to-tr h-full from-gray-50 via-gray-100 to-gray-300 px-10 md:px-16 pb-16 pt-32'>
			{children}
		</main>
	);
};

export default DashboardWrapper;
