import './Loader.css';

type LargeLoaderProps = {
	width?: number;
	height?: number;
};

type SmallLoaderProps = {
	color?: string;
};

export const LargeLoader: React.FC<LargeLoaderProps> = ({
	width = 40,
	height = 60,
}: LargeLoaderProps) => (
	<div
		className='large-loader'
		style={{ width: width, height: height }}></div>
);

export const SmallLoader: React.FC<SmallLoaderProps> = ({
	color = '#fff',
}: SmallLoaderProps) => (
	<div className='small-loader' style={{ borderRightColor: color }}></div>
);
