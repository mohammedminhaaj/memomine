'use client';

import { PlusCircle } from 'react-feather';
import Modal from '../../common/Modal';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import CreateGroupForm from './CreateGroupForm';

const CreateGroupModal: React.FC<{ onClose: () => void }> = ({
	onClose,
}: {
	onClose: () => void;
}) => {
	return (
		<Modal title='Create Group' onClose={onClose}>
			<CreateGroupForm onClose={onClose} />
		</Modal>
	);
};

const CreateGroupButton: React.FC = () => {
	const [toggleForm, setToggleForm] = useState<boolean>(false);
	const onClick: () => void = () => {
		setToggleForm((prev: boolean) => !prev);
	};
	return (
		<>
			<button
				type='button'
				title='Create Group'
				onClick={onClick}
				className='bg-gradient-to-bl h-60 md:h-32 from-gray-50 via-gray-100 to-gray-200 p-5 flex items-center justify-center rounded-lg shadow-lg transition duration-300 hover:scale-95'>
				<span className='border-dotted border-2 border-primary h-full w-full rounded-md flex flex-col items-center justify-center text-primary gap-1 hover:animate-pulse'>
					<PlusCircle />
					<p className='text-sm md:text-md font-bold'>Create Group</p>
				</span>
			</button>
			<AnimatePresence>
				{toggleForm && (
					<CreateGroupModal
						key={'create-group-modal'}
						onClose={onClick}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default CreateGroupButton;
