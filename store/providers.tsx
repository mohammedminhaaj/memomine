'use client';

import { AuthProvider } from './AuthProvider';
import { MessageProvider } from './MessageProvider';

export const Providers = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<AuthProvider>
			<MessageProvider>{children}</MessageProvider>
		</AuthProvider>
	);
};
