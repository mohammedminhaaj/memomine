import Image from 'next/image';

type GroupCardThumbnailType = { thumbnail: string | null | undefined };

const GroupCardThumbnail: React.FC<GroupCardThumbnailType> = ({
	thumbnail,
}: GroupCardThumbnailType) => {
	return (
		<Image
			src={thumbnail ?? '/images/default_group.jpg'}
			alt='group image'
			fill
			style={{
				objectFit: 'cover',
				objectPosition: 'center',
			}}
			className='rounded-lg brightness-50 group-hover:brightness-[.25] transition duration-300'
		/>
	);
};

export default GroupCardThumbnail;
