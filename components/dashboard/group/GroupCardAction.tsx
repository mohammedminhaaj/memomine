'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { MoreVertical } from 'react-feather';
import { Group } from './CreateGroupForm';
import GroupDeleteAction from './GroupDeleteAction';
import GroupEditAction from './GroupEditAction';

const GroupCardAction: React.FC<{ group: Group }> = ({
	group,
}: {
	group: Group;
}) => {
	const [toggleActions, setToggleActions] = useState<boolean>(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const deleteModalRef = useRef<HTMLDivElement>(null);
	const editModalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node) &&
				!deleteModalRef.current &&
				!editModalRef.current
			) {
				setToggleActions(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleToggleActions = () => {
		setToggleActions((prev: boolean) => !prev);
	};
	return (
		<div ref={wrapperRef} className='relative'>
			<button
				onClick={(event) => {
					event.stopPropagation();
					handleToggleActions();
				}}
				type='button'
				title='Group options'
				className='text-white scale-125 md:scale-100'>
				<MoreVertical size={12} />
			</button>
			<AnimatePresence>
				{toggleActions && (
					<motion.div
						key='group-actions'
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0 }}
						className='absolute z-10 p-2 bg-white top-6 right-0 rounded-md text-black'>
						<ul className='flex flex-col gap-2 text-sm'>
							<GroupEditAction
								ref={editModalRef}
								group={group}
								handleToggleActions={handleToggleActions}
							/>
							<GroupDeleteAction
								ref={deleteModalRef}
								groupId={group.id!}
								created_by_id={group.created_by}
								handleToggleActions={handleToggleActions}
							/>
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default GroupCardAction;
