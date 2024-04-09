import { getGroups } from '@/actions/group';
import CreateGroupButton from './CreateGroup';
import GroupCard from './GroupCard';
import Pagination from '../Pagination';
import { SearchParamType } from '@/app/dashboard/(group)/page';


const GroupList: React.FC<SearchParamType> = async ({
	page,
	query,
	group,
}: SearchParamType) => {

	const { groups, count, currentUserId } = await getGroups(
		page,
		query,
		group
	);

	return (
		<>
			<section className='mt-5 border md:border-2 border-dashed rounded-xl p-5 border-primary grid grid-cols-1 md:grid-cols-3 gap-4 shadow-xl'>
				<CreateGroupButton />
				{groups.map((item) => (
					<GroupCard
						key={item.id}
						group={item}
						currentUserId={currentUserId}
					/>
				))}
			</section>
			{count! > 0 && <Pagination totalRecords={count!} />}
		</>
	);
};

export default GroupList;
