import FilterButton  from './FilterButton';

export type FilterList = {
	name: string;
	paramName: string;
	paramValue: string;
}[];

type FilterSectionProps = {
	filterItems: FilterList;
};

const FilterSection: React.FC<FilterSectionProps> = ({
	filterItems,
}: FilterSectionProps) => {
	return (
		<section className='flex gap-3 items-center justify-center flex-wrap text-sm'>
			{filterItems.map((item) => (
				<FilterButton
					key={`${item.paramName}-${item.paramValue}`}
					paramName={item.paramName}
					paramValue={item.paramValue}>
					{item.name}
				</FilterButton>
			))}
		</section>
	);
};

export default FilterSection;
