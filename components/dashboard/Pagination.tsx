'use client';

import { PAGINATION_ITEMS } from '@/lib/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'react-feather';

const Pagination: React.FC<{ totalRecords: number }> = ({
	totalRecords,
}: {
	totalRecords: number;
}) => {
	const pathName = usePathname();
	const { replace } = useRouter();
	const searchParams = useSearchParams();

	const numberOfPages: number = Math.ceil(totalRecords / PAGINATION_ITEMS);

	const buttons: JSX.Element[] = [];

	const params = new URLSearchParams(searchParams);

	const getActivePage: () => number = () => {
		for (let i: number = 1; i <= numberOfPages; i++) {
			const isPagePresent: boolean = searchParams.has('page');
			const isActive: boolean =
				(i === 1 && !isPagePresent) ||
				(isPagePresent && searchParams.get('page') === i.toString());
			if (isActive) return i;
		}
		return -1;
	};

	const activePage: number = getActivePage();

	let startPage = activePage - 2;
	let endPage = activePage + 2;

	if (startPage < 1) {
		endPage = Math.min(endPage + (1 - startPage), numberOfPages);
		startPage = 1;
	}
	if (endPage > numberOfPages) {
		startPage = Math.max(1, startPage - (endPage - numberOfPages));
		endPage = numberOfPages;
	}

	for (let i: number = startPage; i <= endPage; i++) {
		const isActive: boolean = i === activePage;
		buttons.push(
			<button
				type='button'
				disabled={isActive}
				title={`Go to page ${i}`}
				onClick={() => {
					handlePageClick(i);
				}}
				className={`px-4 py-1 rounded-lg text-sm transition-colors duration-300 ${
					isActive
						? 'bg-primary text-white'
						: 'hover:bg-primary hover:text-white'
				}`}
				key={`page-${i}`}>
				{i}
			</button>
		);
	}

	const handlePageClick = (page: number) => {
		page === 1
			? params.delete('page')
			: params.set('page', page.toString());
		replace(`${pathName}?${params.toString()}`);
	};

	const handlePreviousClick = () => {
		activePage !== 1 &&
			(activePage - 1 === 1
				? params.delete('page')
				: params.set('page', (activePage - 1).toString()));
		replace(`${pathName}?${params.toString()}`);
	};

	const handleNextClick = () => {
		activePage !== numberOfPages &&
			params.set('page', (activePage + 1).toString());
		replace(`${pathName}?${params.toString()}`);
	};

	return (
		<section className='py-5 flex justify-center items-center md:justify-end'>
			<div className='flex gap-2'>
				<button
					onClick={handlePreviousClick}
					type='button'
					title='Previous'
					disabled={activePage === startPage}
					className='text-primary p-1 rounded-lg transition-colors duration-300 hover:bg-primary hover:text-white disabled:text-gray-500 disabled:hover:bg-transparent'>
					<ChevronLeft size={20} />
				</button>
				{buttons}
				<button
					onClick={handleNextClick}
					disabled={activePage === endPage}
					type='button'
					title='Next'
					className='text-primary p-1 rounded-lg transition-colors duration-300 hover:bg-primary hover:text-white disabled:text-gray-500 disabled:hover:bg-transparent'>
					<ChevronRight size={20} />
				</button>
			</div>
		</section>
	);
};

export default Pagination;
