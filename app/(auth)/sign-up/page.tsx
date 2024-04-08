import Link from 'next/link';
import { Metadata } from 'next';
import SignUpForm from '@/components/auth/SignUpForm';

export const metadata: Metadata = {
	title: 'MemoMine | Create Account',
};

const SignUp: React.FC = () => {
	return (
		<>
			<h1 className='text-center text-3xl font-extrabold text-secondary'>
				Create Account
			</h1>
			<h2 className='text-center text-sm font-extralight'>
				Please enter the following details
			</h2>
			<SignUpForm />
			<p className='text-xs text-center'>
				Already have an account?{' '}
				<Link
					href='/login'
					className='text-secondary focus:outline-primary'>
					Log in
				</Link>
			</p>
		</>
	);
};

export default SignUp;
