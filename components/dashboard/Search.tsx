'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useRef } from 'react';
import { Search } from 'react-feather';

const SearchBar: React.FC = () => {
	const pathName = usePathname();
	const { replace } = useRouter();
	const searchParams = useSearchParams();

	const searchRef = useRef<HTMLInputElement>(null);

	const handleSearch = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const params = new URLSearchParams(searchParams);
		const term: string | undefined = searchRef.current?.value;
		term && term !== ''
			? params.set('query', term)
			: params.delete('query');
		replace(`${pathName}?${params.toString()}`);
	};

	return (
		<section>
			<form
				className='relative'
				onSubmit={(event) => {
					handleSearch(event);
				}}>
				<input
					id='group-search'
					ref={searchRef}
					spellCheck={false}
					defaultValue={searchParams.get('query')?.toString()}
					type='text'
					className='rounded focus:outline-primary pr-8 pl-2 py-1 placeholder:text-sm'
					placeholder='Search here...'
				/>
				<button
					type='submit'
					title='Search'
					className='bg-primary rounded-md text-white absolute inset-y-0 right-0 px-2 hover:bg-secondary transition-colors duration-300'>
					<Search size={15} />
				</button>
			</form>
		</section>
	);
};

export default SearchBar;
