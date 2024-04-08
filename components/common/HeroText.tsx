import { overTheRainbow } from '@/app/layout';

const HeroText: React.FC<{
	textToDisplay: string;
	textToHighlight: string[];
}> = ({
	textToDisplay,
	textToHighlight,
}: {
	textToDisplay: string;
	textToHighlight: string[];
}) => {
	return (
		<section>
			<h1
				className={`${overTheRainbow.className} text-4xl md:text-6xl font-extrabold text-primary`}>
				Hello
			</h1>
			<h2 className='mt-3 font-extralight text-sm'>
				{textToDisplay.split(' ').map((item: string, index: number) =>
					textToHighlight.includes(item) ? (
						<span
							key={`${item}-${index}`}
							className='text-secondary font-bold'>
							{item}{' '}
						</span>
					) : (
						item + ' '
					)
				)}
			</h2>
		</section>
	);
};

export default HeroText;
