'use server';

import { overTheRainbow } from '@/app/layout';
import Link from 'next/link';

const Logo: React.FC = async () => (
	<Link
		href='/'
		className={`${overTheRainbow.className} text-3xl font-extrabold transition-colors duration-300 hover:text-primary`}>
		<span className='hidden md:block'>Memomine</span>
		<span className='md:hidden'>m</span>
	</Link>
);

export default Logo;
