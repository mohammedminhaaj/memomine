import type { Metadata } from 'next';
import { Over_the_Rainbow, Poppins } from 'next/font/google';
import './globals.css';
import { NextFont } from 'next/dist/compiled/@next/font';
import { Providers } from '@/store/Providers';
import Toast from '@/components/common/Toast';

export const overTheRainbow: NextFont = Over_the_Rainbow({
	weight: '400',
	subsets: ['latin'],
});

export const poppins: NextFont = Poppins({
	weight: '400',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Welcome to MemoMine',
	description:
		"MemoMine let's you create, upload and share memories with your loved one's",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={poppins.className}>
				<Providers>
					<div id='overlays'>
						<Toast />
					</div>
					{children}
				</Providers>
			</body>
		</html>
	);
}
