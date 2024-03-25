import NavigationBar from '@/components/common/NavigationBar';
import { overTheRainbow } from './layout';
import { ArrowRight } from 'react-feather';

export default function Home() {
	return (
		<>
			<NavigationBar />
			<main className='bg-gradient-to-tr from-secondary to-tertiary'>
				<section className='flex items-center justify-center px-16 pb-16 pt-32'>
					<div className='flex flex-col gap-10'>
						<div
							className={`font-extrabold text-white text-7xl md:text-8xl space-y-10 ${overTheRainbow.className}`}>
							<p>Create,</p>
							<p>Upload,</p>
							<div className='bg-primary rounded-2xl px-8 py-4 -rotate-6 hover:rotate-0 transition'>
								<p>Share</p>
							</div>
							<div className='absolute rotate-6 transform hover:rotate-0 duration-150 translate-x-40 md:translate-x-56 -translate-y-20 text-sm md:text-lg bg-secondary rounded-2xl px-8 py-4'>
								<p>Memories.</p>
							</div>
						</div>
						<button
							type='button'
							title='get started'
							className='font-extrabold transition-all ease-in duration-150 hover:bg-white hover:text-secondary px-4 md:px-8 py-2 md:py-4 text-white md:text-2xl rounded-lg hover:gap-5 flex gap-2 items-center justify-center'>
							<p>Get Started</p> <ArrowRight />
						</button>
					</div>
				</section>
			</main>
		</>
	);
}
