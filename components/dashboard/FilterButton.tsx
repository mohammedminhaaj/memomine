'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

type FilterButtonProps = {
	children: React.ReactNode;
	paramName: string;
	paramValue: string;
};

const FilterButtonButton: React.FC<FilterButtonProps> = ({
	children,
	paramName,
	paramValue,
}: FilterButtonProps) => {
	const searchParams = useSearchParams();
	const pathName = usePathname();
	const { replace } = useRouter();

	const handleOnClick = () => {
		const params = new URLSearchParams(searchParams);
		paramValue === 'all'
			? params.delete(paramName)
			: params.set(paramName, paramValue);
		replace(`${pathName}?${params.toString()}`);
	};

	const isActive: boolean =
		(searchParams.has(paramName) &&
			searchParams.get(paramName) === paramValue) ||
		(!searchParams.has(paramName) && paramValue === 'all');

	return (
		<div className='relative'>
			<button
				type='button'
				title={paramName}
				onClick={handleOnClick}
				disabled={isActive}
				className={`transition duration-300 hover:scale-105 ${
					isActive && 'font-bold text-white px-2 py-1'
				}`}>
				{isActive && (
					<motion.div
						layoutId='active-pill'
						className='absolute rounded-lg inset-0 bg-primary'></motion.div>
				)}
				<span className='relative'>{children}</span>
			</button>
		</div>
	);
};

export default FilterButtonButton;
