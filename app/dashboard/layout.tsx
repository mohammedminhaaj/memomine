import NavigationBar from '@/components/common/NavigationBar';
import { LargeLoaderFullScreen } from '@/components/common/loader/Loader';
import DashboardWrapper from '@/components/dashboard/DashboardWrapper';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'MemoMine | Dashboard',
};

const DashboardLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<Suspense
			key={'redirect-if-not-loggedin'}
			fallback={<LargeLoaderFullScreen />}>
			<NavigationBar />
			<DashboardWrapper>{children}</DashboardWrapper>
		</Suspense>
	);
};

export default DashboardLayout;
