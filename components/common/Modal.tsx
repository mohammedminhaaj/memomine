'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'react-feather';

type ModalProps = {
	title: string;
	onClose: () => void;
	children: React.ReactNode;
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(
	({ title, onClose, children }: ModalProps, ref) => {
		return createPortal(
			<>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.7 }}
					className='fixed z-40 w-full h-full backdrop-blur-sm'
					onClick={onClose}></motion.div>
				<div
					ref={ref}
					className='absolute w-full h-full flex justify-center items-center p-5'>
					<motion.section
						initial={{ opacity: 0, y: '-100vh' }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: '-100vh' }}
						transition={{
							duration: 0.7,
							type: 'spring',
							bounce: 0.5,
						}}
						className='fixed bg-white z-40 rounded-2xl p-5 w-11/12 md:w-fit shadow-2xl'>
						<div className='flex justify-between'>
							<h2 className='font-extrabold text-l md:text-2xl'>
								{title}
							</h2>
							<button
								className='transition hover:scale-110'
								type='button'
								title='Close modal'
								onClick={onClose}>
								<X className='md:stroke-[3px]' />
							</button>
						</div>
						<div className='mt-3 max-h-[80vh] md:min-w-[50vw] md:max-w-[60vw] overflow-auto'>
							{children}
						</div>
					</motion.section>
				</div>
			</>,

			document.getElementById('overlays')!
		);
	}
);

export default Modal;
