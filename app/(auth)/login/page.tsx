import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'MemoMine | Login',
};

const Login: () => JSX.Element = () => {
	return (
		<>
			<h1 className='text-center text-3xl font-extrabold text-secondary'>
				Login
			</h1>
			<h2 className='text-center text-sm font-extralight'>
				Please login using your credentials
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
			<div className='relative'>
				<input
					id='password-field'
					required
					className='floating-input peer'
					title='Password'
					type='password'
				/>
				<label htmlFor='password-field' className='floating-label'>
					Password
				</label>
			</div>

			<button
				title='Sign in'
				type='submit'
				className='px-4 py-2 bg-secondary transition-colors hover:bg-primary duration-200 focus:outline-primary text-white rounded'>
				Sign In
			</button>
			<Link
				href='/forgot-password'
				className='text-xs text-center text-secondary focus:outline-primary'>
				Forgot password?
			</Link>
			<p className='text-xs text-center'>
				Don't have an account?{' '}
				<Link
					href='/sign-up'
					className='text-secondary focus:outline-primary'>
					Sign up
				</Link>
			</p>
		</>
	);
};

export default Login;
