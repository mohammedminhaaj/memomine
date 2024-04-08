'use client';

import Link from 'next/link';
import { ChevronRight } from 'react-feather';
import { motion } from 'framer-motion';

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,

		transition: {
			staggerChildren: 0.3,
		},
	},
};

const listItem = {
	hidden: { opacity: 0, x: -10 },
	show: { opacity: 1, x: 0 },
};

type BreadcrumbItem = {
	name: string;
	url?: string;
};

export type BreadcrumbList = BreadcrumbItem[];

type BreadcrumbProps = {
	breadcrumbList: BreadcrumbList;
};

const BreadCrumb: React.FC<BreadcrumbProps> = ({
	breadcrumbList,
}: BreadcrumbProps) => {
	return (
		<motion.ul
			variants={container}
			initial='hidden'
			animate='show'
			className='flex gap-2 text-sm items-center flex-wrap'>
			{breadcrumbList.map((item: BreadcrumbItem, index: number) => (
				<motion.li
					key={`${item.name}-${index}`}
					variants={listItem}
					className='flex gap-2 items-center last:font-bold group'>
					{item.url ? (
						<Link href={item.url}>{item.name}</Link>
					) : (
						item.name
					)}
					<ChevronRight size={15} className='group-last:hidden' />
				</motion.li>
			))}
		</motion.ul>
	);
};

export default BreadCrumb;
