'use client';

import Modal from '@/components/common/Modal';
import { AnimatePresence } from 'framer-motion';
import { forwardRef, useState } from 'react';
import CreateGroupForm, { Group } from './CreateGroupForm';

const GroupEditAction = forwardRef<
	HTMLDivElement,
	{ group: Group; handleToggleActions: () => void; isDisabled: boolean }
>(
	(
		{
			group,
			handleToggleActions,
			isDisabled,
		}: {
			group: Group;
			handleToggleActions: () => void;
			isDisabled: boolean;
		},
		ref
	) => {
		const [toggleEditModal, setToggleEditModal] = useState<boolean>(false);

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
						disabled={isDisabled}
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
