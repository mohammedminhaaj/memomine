import './Loader.css';

type DefaultLoaderProps = {
	className?: string;
};

type LargeLoaderProps = {
	width?: number;
	height?: number;
} & DefaultLoaderProps;

export enum SmallLoaderColors {
	WHITE = '#fff',
	PRIMARY = '#22577A',
	SECONDARY = '#38A3A5',
	TERTIARY = '#57CC99',
}

type SmallLoaderProps = {
	color?: SmallLoaderColors;
} & DefaultLoaderProps;

export const LargeLoader: React.FC<LargeLoaderProps> = ({
	width = 40,
	height = 60,
	className,
}: LargeLoaderProps) => (
	<div
		className={`large-loader ${className}`}
		style={{ width: width, height: height }}></div>
);

export const SmallLoader: React.FC<SmallLoaderProps> = ({
	color = SmallLoaderColors.WHITE,
	className,
}: SmallLoaderProps) => (
	<div
		className={`small-loader ${className}`}
		style={{ borderRightColor: color }}></div>
);

export const LargeLoaderWithText: React.FC<{ loadingText?: string }> = ({
	loadingText = 'Please Wait...',
}: {
	loadingText?: string;
}) => {
	return (
		<div className='h-full w-full flex flex-col justify-center items-center gap-8 p-10'>
			<LargeLoader />
			<h1>{loadingText}</h1>
		</div>
	);
};

export const LargeLoaderFullScreen: React.FC<{ loadingText?: string }> = ({
	loadingText = 'Please Wait...',
}: {
	loadingText?: string;
}) => {
	return (
		<div className='h-screen'>
			<LargeLoaderWithText loadingText={loadingText} />
		</div>
	);
};
