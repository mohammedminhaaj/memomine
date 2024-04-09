'use client';
import { deleteGroup } from '@/actions/group';
import Modal from '@/components/common/Modal';
import useToast from '@/hooks/useToast';
import { IFormResponse } from '@/lib/formHelpers';
import { MessageType } from '@/store/MessageProvider';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { forwardRef, useState } from 'react';

const GroupDeleteAction = forwardRef<
	HTMLDivElement,
	{ groupId: string; handleToggleActions: () => void; isDisabled: boolean }
>(
	(
		{
			groupId,
			handleToggleActions,
			isDisabled,
		}: {
			groupId: string;
			handleToggleActions: () => void;
			isDisabled: boolean;
		},
		ref
	) => {
		const [toggleDeleteModal, setToggleDeleteModal] =
			useState<boolean>(false);
		const [isDeleting, setIsDeleting] = useState<boolean>(false);
		const toast = useToast();
		const { refresh } = useRouter();
		const handleToggleDeleteModal = () => {
			setToggleDeleteModal((prev: boolean) => !prev);
		};

		const handleDeleteGroup = async () => {
			setIsDeleting(true);
			const response: IFormResponse = await deleteGroup(groupId);
			if ((response.code as number) >= 400)
				toast(response.message, MessageType.ERROR);
			else {
				toast(response.message);
				refresh();
				handleToggleActions();
				handleToggleDeleteModal();
			}
			setIsDeleting(false);
		};
		return (
			<>
				<li>
					<button
						title='Delete group'
						type='button'
						disabled={isDisabled}
						onClick={handleToggleDeleteModal}
						className='px-2 w-full disabled:text-gray-400 disabled:hover:bg-transparent transition-colors duration-300 hover:bg-red-500 rounded-sm hover:text-white'>
						Delete
					</button>
				</li>
				<AnimatePresence>
					{toggleDeleteModal && (
						<Modal
							ref={ref}
							key={'group-delete-modal'}
							title='Confirm Delete?'
							onClose={handleToggleDeleteModal}>
							<div className='flex flex-col gap-5 items-start'>
								<p>
									Are you sure you want to delete this group?
									This action cannot be reversed.
								</p>
								<div className='flex gap-2 justify-end w-full items-center'>
									<button
										onClick={handleToggleDeleteModal}
										type='button'
										title='Cancel delete group'
										className='secondary-button'>
										Cancel
									</button>
									<button
										onClick={handleDeleteGroup}
										title='Delete group'
										type='button'
										className='rounded-lg text-red-500 font-bold transition-colors duration-300 hover:bg-red-500 hover:text-white px-4 py-2'>
										{!isDeleting ? 'Delete' : 'Deleting...'}
									</button>
								</div>
							</div>
						</Modal>
					)}
				</AnimatePresence>
			</>
		);
	}
);

export default GroupDeleteAction;
