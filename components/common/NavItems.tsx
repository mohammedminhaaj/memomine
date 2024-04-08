'use client';

import useToast from '@/hooks/useToast';
import { useAuthContext } from '@/store/AuthProvider';
import { MessageType } from '@/store/MessageProvider';
import { IFormResponse } from '@/lib/formHelpers';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Edit2, Grid, LogOut, User } from 'react-feather';

const LogoutButton: React.FC<{ className?: string }> = ({
	className,
}: {
	className?: string;
}) => {
	const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
	const { push, refresh } = useRouter();
	const pathname: string = usePathname();
	const { logout } = useAuthContext();
	const toast = useToast();
	const handleLogout: () => void = async () => {
		setIsLoggingOut(true);
		const response: IFormResponse = await logout();
		if (response.code === 200) {
			toast(response.message);
			pathname === '/' ? refresh() : push('/login');
		} else {
			toast(response.code.toString(), MessageType.ERROR);
		}
		setIsLoggingOut(false);
	};
	return (
		<button
			onClick={handleLogout}
			type='button'
			title='Logout'
			disabled={isLoggingOut}
			className={className}>
			<LogOut size={15} />
			<p>{isLoggingOut ? 'Please wait...' : 'Log Out'}</p>
		</button>
	);
};

const ProfileCard: React.FC<{ onClose: () => void }> = ({
	onClose,
}: {
	onClose: () => void;
}) => {
	const { user } = useAuthContext();
	return createPortal(
		<>
			<div onClick={onClose} className='fixed h-full w-full'></div>
			<div className='fixed top-28 md:right-0 w-full md:w-fit z-30'>
				<motion.div
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0 }}
					key={'profile-card'}
					className='bg-gray-100 p-5 rounded-xl shadow-md w-11/12 mx-auto md:w-fit md:ml-auto md:mr-[4vw]'>
					<section className='grid grid-cols-5 grid-rows-2 gap-4 md:gap-2'>
						<picture className='relative rounded-full col-span-1 row-span-2 p-10 place-self-center shadow-md'>
							<Image
								src='/images/default_user.png'
								alt='user image'
								fill
								style={{
									objectFit: 'cover',
									objectPosition: 'center',
								}}
								className='rounded-full'
							/>
						</picture>
						<span className='col-span-4'>
							<p className='text-xs font-extralight'>
								Logged in as:
							</p>
							<p className='text-sm break-words font-bold'>
								{user?.email}
							</p>
						</span>
						<div className='grid grid-cols-subgrid gap-1 col-span-4'>
							<Link
								href='/dashboard/profile'
								title='Edit Profile'
								className='secondary-button text-xs col-span-2'>
								<Edit2 size={15} />
								<p>Edit Profile</p>
							</Link>
							<LogoutButton className='primary-button text-xs col-span-2' />
						</div>
					</section>
				</motion.div>
			</div>
		</>,
		document.getElementById('overlays')!
	);
};

const ProfileButton: React.FC = () => {
	const [showCard, setShowCard] = useState<boolean>(false);
	const onClose: () => void = () => {
		setShowCard((prev: boolean) => !prev);
	};
	return (
		<div className='relative'>
			<button
				type='button'
				title='Profile'
				onClick={onClose}
				className='rounded-full p-1 md:p-2 transition-color bg-primary hover:bg-secondary duration-300 group'>
				<User size={25} className='stroke-white' />
			</button>
			<AnimatePresence>
				{showCard && (
					<ProfileCard key={'profile-card'} onClose={onClose} />
				)}
			</AnimatePresence>
		</div>
	);
};

const NavItems: React.FC = () => {
	const pathname: string = usePathname();
	return (
		<ul className='flex flex-row justify-end items-center gap-6 font-extrabold'>
			<li className='flex items-center gap-1 md:gap-0 justify-center flex-col'>
				<Link
					passHref
					href='/dashboard'
					title='DashBoard'
					className={`${
						pathname.startsWith('/dashboard') && 'text-primary'
					} transition-colors duration-300 hover:text-primary peer`}>
					<span>
						<Grid className='md:hidden' />
						<p className='hidden md:block'>Dashboard</p>
					</span>
				</Link>
				{pathname.startsWith('/dashboard') && (
					<span className='p-1 rounded-full bg-primary transition peer-hover:scale-y-50'></span>
				)}
			</li>
			<li>
				<ProfileButton />
			</li>
		</ul>
	);
};

export default NavItems;
