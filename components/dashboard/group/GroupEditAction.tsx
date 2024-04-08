'use client';
import Modal from '@/components/common/Modal';
import { AnimatePresence } from 'framer-motion';
import { forwardRef, useState } from 'react';
import CreateGroupForm, { Group } from './CreateGroupForm';
import { useAuthContext } from '@/store/AuthProvider';

const GroupEditAction = forwardRef<
	HTMLDivElement,
	{ group: Group; handleToggleActions: () => void }
>(
	(
		{
			group,
			handleToggleActions,
		}: { group: Group; handleToggleActions: () => void },
		ref
	) => {
		const [toggleEditModal, setToggleEditModal] = useState<boolean>(false);
		const { user } = useAuthContext();

		const handleToggle = () => {
			setToggleEditModal((prev: boolean) => !prev);
		};

		const handleToggleModalAndActions = () => {
			handleToggle();
			handleToggleActions();
		};

		return (
			<>
				<li>
					<button
						title='Edit group'
						type='button'
						disabled={user?.id !== group.created_by}
						onClick={handleToggle}
						className='px-2 w-full disabled:text-gray-400 disabled:hover:bg-transparent transition-colors duration-300 hover:bg-primary rounded-sm hover:text-white'>
						Edit
					</button>
				</li>

				<AnimatePresence>
					{toggleEditModal && (
						<Modal
							ref={ref}
							key={'edit-group-modal'}
							title='Edit Group'
							onClose={handleToggle}>
							<CreateGroupForm
								onClose={handleToggleModalAndActions}
								group={group}
							/>
						</Modal>
					)}
				</AnimatePresence>
			</>
		);
	}
);

export default GroupEditAction;
