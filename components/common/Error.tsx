import { RefreshCw } from 'react-feather';

const Error = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return (
		<div className='flex flex-col gap-5 items-center justify-center'>
			<h2 className='text-5xl font-bold text-primary'>Oops!</h2>
			<h3 className='text-2xl'>Something went wrong</h3>
			<h4 className='font-extralight text-sm'>{error.message}</h4>
			<button
				title='Try Again'
				type='button'
				className='primary-button'
				onClick={() => reset()}>
				<RefreshCw />
				Try again
			</button>
		</div>
	);
};

export default Error;
