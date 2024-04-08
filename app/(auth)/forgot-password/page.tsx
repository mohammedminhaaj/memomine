import Link from 'next/link';
import { Metadata } from 'next';
import PasswordResetForm from '@/components/auth/PasswordResetForm';

export const metadata: Metadata = {
	title: 'MemoMine | Forgot Password',
};

const ForgotPassword: React.FC = () => {
	return (
		<>
			<h1 className='text-center text-3xl font-extrabold text-secondary'>
				Forgot Password
			</h1>
			<h2 className='text-center text-sm font-extralight'>
				Please enter your email address
			</h2>
			<PasswordResetForm />
			<Link
				href='/login'
				className='text-xs text-center text-secondary focus:outline-primary'>
				Go back
			</Link>
		</>
	);
};

export default ForgotPassword;
