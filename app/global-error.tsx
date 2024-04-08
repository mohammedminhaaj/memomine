'use client';

import Error from '@/components/common/Error';
import NavigationBar from '@/components/common/NavigationBar';

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html lang='en'>
			<body>
				<NavigationBar />
				<main className='h-screen flex justify-center items-center w-full'>
					<Error error={error} reset={reset} />
				</main>
			</body>
		</html>
	);
}
