import Link from 'next/link';
import { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
	title: 'MemoMine | Login',
};

const Login: React.FC = () => {
	return (
		<>
			<h1 className='text-center text-3xl font-extrabold text-secondary'>
				Login
			</h1>
			<h2 className='text-center text-sm font-extralight'>
				Please login using your credentials
			</h2>
			<LoginForm />
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
