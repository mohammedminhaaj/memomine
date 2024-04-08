import NavigationBar from '@/components/common/NavigationBar';
import { Metadata } from 'next';
import { overTheRainbow } from '../layout';
import ProtectedRoute from '@/components/dashboard/ProtectedRoute';

export const metadata: Metadata = {
	title: 'MemoMine | Dashboard',
};

const DashboardLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<ProtectedRoute>
			<NavigationBar />
			<main className='bg-gradient-to-tr h-full from-gray-50 via-gray-100 to-gray-300 px-10 md:px-16 pb-16 pt-32'>
				{children}
			</main>
		</ProtectedRoute>
	);
};

export default DashboardLayout;
