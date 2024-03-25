'use client';

import useToast from '@/hooks/useToast';
import { useAuthContext } from '@/store/AuthProvider';
import { MessageType } from '@/store/MessageProvider';
import { IFormResponse } from '@/utilities/FormHelpers';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SmallLoader } from '../common/loader/Loader';

export type SignUpFormInput = {
	email: string;
	password: string;
	confirmPassword: string;
};

const SignUpForm: () => JSX.Element = () => {
	const {
		register,
		watch,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<SignUpFormInput>();

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const toast = useToast();

	const { signup } = useAuthContext();

	const matchPasswords: (value: any) => boolean | string = (value: string) =>
		watch('password') === value || "Passwords don't match";

	const onSubmit: SubmitHandler<SignUpFormInput> = async (data) => {
		setIsSubmitting(true);
		const response: IFormResponse = await signup(data.email, data.password);
		if (response.code === 200) {
			toast(response.message);
		} else {
			toast(response.code.toString(), MessageType.ERROR);
			reset({
				password: '',
				confirmPassword: '',
			});
		}

		setIsSubmitting(false);
	};

	return (
		<form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
			<div className='relative'>
				<input
					id='email-field'
					required
					{...register('email', {
						required: 'This field is required',
						pattern: {
							value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
							message: 'Please enter a valid email',
						},
					})}
					className={`floating-input peer ${errors.email && 'error'}`}
					title='Email'
					type='text'
				/>
				<label
					className={`floating-label ${errors.email && 'error'}`}
					htmlFor='email-field'>
					Email
				</label>
			</div>
			{errors.email && (
				<p className='text-xs text-red-500'>{errors.email.message}</p>
			)}
			<div className='relative'>
				<input
					id='password-field'
					required
					{...register('password', {
						required: 'This field is required',
						minLength: {
							value: 6,
							message:
								'Password should contain atleast 6 characters',
						},
					})}
					className={`floating-input peer ${
						errors.password && 'error'
					}`}
					title='Password'
					type='password'
				/>
				<label
					htmlFor='password-field'
					className={`floating-label ${errors.password && 'error'}`}>
					Password
				</label>
			</div>
			{errors.password && (
				<p className='text-xs text-red-500'>
					{errors.password.message}
				</p>
			)}
			<div className='relative'>
				<input
					id='confirm-password-field'
					required
					{...register('confirmPassword', {
						required: 'This field is required',
						minLength: {
							value: 6,
							message:
								'Confirm password should contain atleast 6 characters',
						},
						validate: matchPasswords,
					})}
					className={`floating-input peer ${
						errors.confirmPassword && 'error'
					}`}
					title='Confirm Password'
					type='password'
				/>
				<label
					htmlFor='confirm-password-field'
					className={`floating-label ${
						errors.confirmPassword && 'error'
					}`}>
					Confirm Password
				</label>
			</div>
			{errors.confirmPassword && (
				<p className='text-xs text-red-500'>
					{errors.confirmPassword.message}
				</p>
			)}

			<button
				title='Create Account'
				type='submit'
				disabled={isSubmitting}
				className='px-4 py-2 bg-secondary transition-colors hover:bg-primary duration-200 focus:outline-primary disabled:bg-gray-400 disabled:hover:bg-gray-500 text-white rounded text-center'>
				{isSubmitting ? <SmallLoader /> : 'Create Account'}
			</button>
		</form>
	);
};

export default SignUpForm;
