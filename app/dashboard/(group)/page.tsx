import GroupList from '@/components/dashboard/group/GroupList';
import BreadCrumb, { BreadcrumbList } from '@/components/dashboard/Breadcrumb';
import SearchBar from '@/components/dashboard/Search';
import FilterSection, {
	FilterList,
} from '@/components/dashboard/FilterSection';
import { Suspense } from 'react';
import { LargeLoaderWithText } from '@/components/common/loader/Loader';
import HeroText from '@/components/common/HeroText';

const breadcrumbList: BreadcrumbList = [{ name: 'Dashboard' }];

const filterItems: FilterList = [
	{
		name: 'All',
		paramName: 'group',
		paramValue: 'all',
	},
	{
		name: 'Created by me',
		paramName: 'group',
		paramValue: 'created',
	},
	{
		name: 'Shared with me',
		paramName: 'group',
		paramValue: 'shared',
	},
];

export type SearchParamType = {
	query?: string;
	page?: string;
	group?: string;
};

type DashBoardProps = {
	searchParams: SearchParamType;
};

const DashBoard: React.FC<DashBoardProps> = async ({
	searchParams,
}: DashBoardProps) => {
	return (
		<>
			<HeroText
				textToDisplay='Discover and
				engage with all the groups you belong to or are a member of.'
				textToHighlight={['Discover', 'engage']}
			/>

			<section className='mt-5'>
				<BreadCrumb breadcrumbList={breadcrumbList} />
			</section>
			<div className='flex justify-between mt-5 gap-5 flex-wrap'>
				<FilterSection filterItems={filterItems} />
				<SearchBar />
			</div>

			<Suspense key={'get-groups'} fallback={<LargeLoaderWithText />}>
				<GroupList
					group={searchParams.group}
					page={searchParams.page}
					query={searchParams.query}
				/>
			</Suspense>
		</>
	);
};

export default DashBoard;
