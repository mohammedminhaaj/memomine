'use client';

import Error from '@/components/common/Error';

const GroupError = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return <Error error={error} reset={reset} />;
};

export default GroupError;
