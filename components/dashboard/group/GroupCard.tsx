'use client';

import Image from 'next/image';
import { Group } from './CreateGroupForm';
import { Clock, Users } from 'react-feather';
import GroupCardAction from './GroupCardAction';
import TimebombWrapper from '../TimebombWrapper';
import GroupCardThumbnail from './GroupCardThumbnail';

const GroupCard: React.FC<{ group: Group; currentUserId: string }> = ({
	group,
	currentUserId,
}: {
	group: Group;
	currentUserId: string;
}) => {
	return (
		<div className='group flex items-start justify-between flex-col gap-3 relative border h-60 md:h-32 rounded-lg shadow-lg p-5 transition duration-300 hover:scale-95'>
			<GroupCardThumbnail thumbnail={group.thumbnail} />
			<TimebombWrapper
				availableAt={group.available_at}
				isOwner={group.created_by === currentUserId}>
				<>
					<div className='relative text-white flex items-center justify-between gap-3 w-full'>
						<div className='scale-125 md:scale-100 flex items-center justify-center gap-1'>
							<Users
								size={12}
								className='text-white relative'
								fill='#fff'
							/>
							<p className='text-xs'>{group.members?.length}</p>
							{group.available_at && (
								<Clock
									size={12}
									className='text-white relative ml-2'
								/>
							)}
						</div>
						<GroupCardAction group={group} />
					</div>
					<p className='relative whitespace-nowrap transition duration-300 group-hover:whitespace-normal max-w-full text-ellipsis overflow-hidden font-bold text-white'>
						{group.name}
					</p>
				</>
			</TimebombWrapper>
		</div>
	);
};

export default GroupCard;
