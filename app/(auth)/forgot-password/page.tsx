import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'MemoMine | Forgot Password',
};

const ForgotPassword: () => JSX.Element = () => {
	return (
		<>
			<h1 className='text-center text-3xl font-extrabold text-secondary'>
				Forgot Password
			</h1>
			<h2 className='text-center text-sm font-extralight'>
				Please enter your email address
			</h2>
			<div className='relative'>
				<input
					id='email-field'
					required
					className='floating-input peer'
					title='Email'
					type='text'
				/>
				<label className='floating-label' htmlFor='email-field'>
					Email
				</label>
			</div>

			<button
				title='Continue'
				type='submit'
				className='px-4 py-2 bg-secondary transition-colors hover:bg-primary duration-200 focus:outline-primary text-white rounded'>
				Continue
			</button>
			<Link
				href='/login'
				className='text-xs text-center text-secondary focus:outline-primary'>
				Go back
			</Link>
			
		</>
	);
};

export default ForgotPassword;
