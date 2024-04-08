'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
	memo,
	useCallback,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';
import { SmallLoader, SmallLoaderColors } from './loader/Loader';
import { ChevronDown, Search, X } from 'react-feather';

export type SelectedItem = string | string[] | null;

type BaseDynamicSelectProps = {
	label: string;
	multiple?: boolean;
	onSelect?: (value: SelectedItem) => void;
	customValidation?: (value: string) => boolean;
	className?: string;
	hasError?: boolean;
	defaultValue?: string | string[];
};

type WithCallbackFunction = {
	callbackFunction: (value: string) => Promise<string[]>;
	cacheFunction?: never;
};

type WithCacheFunction = {
	callbackFunction?: never;
	cacheFunction: () => Promise<string[]>;
};

type DynamicSelectProps = BaseDynamicSelectProps &
	(WithCallbackFunction | WithCacheFunction);

type ReducerAction =
	| {
			type: 'ADD';
			value: string;
	  }
	| {
			type: 'REMOVE';
			index: number;
	  };

const DynamicSelect: React.FC<DynamicSelectProps> = ({
	label,
	multiple = false,
	onSelect,
	callbackFunction,
	cacheFunction,
	customValidation,
	className,
	hasError,
	defaultValue,
}: DynamicSelectProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>('');
	const [loadingValues, setLoadingValues] = useState<boolean>(false);
	const [dynamicValues, setDynamicValues] = useState<string[]>([]);
	const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
		null
	);
	const [cache, setCache] = useState<string[]>([]);

	const wrapperRef = useRef<HTMLDivElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);

	const reducerInitialState: SelectedItem = defaultValue
		? defaultValue
		: multiple
		? []
		: null;

	const reducerFunction = (state: SelectedItem, action: ReducerAction) => {
		switch (action.type) {
			case 'ADD':
				return multiple && Array.isArray(state)
					? [...state, action.value]
					: action.value;

			case 'REMOVE':
				return multiple && Array.isArray(state)
					? [
							...state.filter(
								(_: string, index: number) =>
									index !== action.index
							),
					  ]
					: null;
		}
	};

	const [selectedItemState, selectedItemDispatch] = useReducer(
		reducerFunction,
		reducerInitialState
	);

	const storeCache = useCallback(async () => {
		if (cacheFunction) {
			const cachedResults: string[] = await cacheFunction();
			setCache(cachedResults);
		}
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		storeCache();

		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	useEffect(() => {
		if (onSelect) {
			onSelect(selectedItemState);
		}
	}, [selectedItemState]);

	useEffect(() => {
		if (searchRef.current && isOpen) {
			searchRef.current.focus();
		}
	}, [isOpen]);

	const toggleDropdown = () => {
		setIsOpen((prev: boolean) => !prev);
	};

	const onChangeSearchValue = (value: string) => {
		setSearchValue(value);
		if (cacheFunction && value.length >= 3) {
			const filteredResults = [];
			for (const item of cache) {
				if (item.includes(value)) {
					filteredResults.push(item);
					if (filteredResults.length === 10) break;
				}
			}
			setDynamicValues(filteredResults);
		}

		if (value.length < 3 && !!cache.length) {
			setDynamicValues([]);
		}
	};

	const selectAndCleanUp = useCallback((value: string) => {
		if (value.trim() !== '') {
			selectedItemDispatch({ type: 'ADD', value: value });
			if (searchRef.current) searchRef.current.value = '';
			setSearchValue('');
			!!dynamicValues.length && setDynamicValues([]);
			!multiple && toggleDropdown();
		}
	}, []);

	const loadValues = useCallback(async (currentValue: string) => {
		setLoadingValues(true);
		const fetchedValues: string[] = await callbackFunction!(currentValue);
		setDynamicValues(fetchedValues);
		setLoadingValues(false);
	}, []);

	const loadDynamicValues = useCallback(
		(value: string) => {
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}

			if (callbackFunction && value.length >= 3) {
				const newTimer = setTimeout(() => {
					loadValues(value);
				}, 500);

				setDebounceTimer(newTimer);
			}

			if (value.length < 3 && !!dynamicValues.length) {
				setDynamicValues([]);
			}
		},
		[debounceTimer]
	);

	return (
		<div ref={wrapperRef} className={`${className} relative`}>
			<div
				tabIndex={0}
				aria-haspopup='listbox'
				onClick={toggleDropdown}
				onKeyDown={(event) => {
					if (event.key === 'Enter') {
						toggleDropdown();
					}
				}}
				className={`p-2 text-sm text-gray-500 rounded cursor-pointer ${
					hasError ? 'focus:outline-red-500' : 'focus:outline-primary'
				} focus:border-2 ${
					hasError ? 'focus:border-red-500' : 'focus:border-primary'
				} flex justify-between items-center gap-1 peer ${
					isOpen
						? hasError
							? 'border-red-500 border-2'
							: 'border-primary border-2'
						: 'border'
				}`}>
				<ul className='flex flex-wrap gap-1'>
					{multiple && Array.isArray(selectedItemState) ? (
						selectedItemState.map((item: string, index: number) => {
							const isValid: boolean = customValidation
								? customValidation(item)
								: true;
							return (
								<li
									className={`${
										isValid ? 'bg-primary' : 'bg-red-500'
									}  text-xs rounded flex gap-1 items-center text-white p-1`}
									key={`${item}-${index}`}>
									{item}
									<button
										type='button'
										title='Remove member'
										onClick={(event) => {
											event.stopPropagation();
											selectedItemDispatch({
												type: 'REMOVE',
												index: index,
											});
										}}>
										<X size={15} />
									</button>
								</li>
							);
						})
					) : (
						<li
							className={`${
								customValidation
									? customValidation(
											selectedItemState as string
									  )
										? 'text-black'
										: 'text-red-500'
									: 'text-black'
							}`}>
							{selectedItemState}
						</li>
					)}
				</ul>
				<ChevronDown
					size={20}
					className={`transform duration-300 shrink-0 ${
						isOpen && 'rotate-180'
					} text-gray-500 cursor-pointer`}
				/>
			</div>
			<label
				onClick={toggleDropdown}
				className={`absolute -top-2 text-xs bg-white px-1 left-2 ${
					hasError
						? 'peer-focus:text-red-500'
						: 'peer-focus:text-primary'
				} cursor-pointer ${
					isOpen
						? hasError
							? 'text-red-500'
							: 'text-primary'
						: 'text-gray-400'
				}`}>
				{label}
			</label>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						key={'dynamic-select'}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='absolute max-h-32 z-10 overflow-auto bg-white border rounded p-3 w-full shadow-sm'>
						<ul className='text-sm font-bold space-y-3'>
							<li className='relative'>
								<input
									onChange={(event) => {
										const inputValue: string =
											event.target.value;
										onChangeSearchValue(inputValue);
										loadDynamicValues(inputValue);
									}}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
											selectAndCleanUp(searchValue);
										}
									}}
									ref={searchRef}
									spellCheck={false}
									type='text'
									placeholder='Search here...'
									className='border font-normal placeholder:text-xs rounded w-full py-1 pl-7 focus:outline-primary'
								/>
								<Search
									size={15}
									className='absolute top-2 left-2 text-gray-400'
								/>
							</li>
							{!!searchValue.trim().length && (
								<>
									<li
										onClick={() => {
											selectAndCleanUp(searchValue);
										}}
										title={`select ${searchValue}`}
										className='cursor-pointer transition-colors duration-300 hover:bg-secondary hover:text-white px-2 py-1 rounded'>
										<p>'{searchValue}'</p>
									</li>
									{loadingValues ? (
										<li className='flex justify-center'>
											<SmallLoader
												color={
													SmallLoaderColors.PRIMARY
												}
											/>
										</li>
									) : (
										!!dynamicValues.length &&
										dynamicValues.map(
											(item: string, index: number) => (
												<li
													key={`${item}-${index}`}
													title={`Select '${item}'`}
													onClick={() => {
														selectAndCleanUp(item);
													}}
													className='cursor-pointer transition-colors duration-300 hover:bg-secondary hover:text-white px-2 py-1 rounded'>
													{item}
												</li>
											)
										)
									)}
								</>
							)}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default memo(DynamicSelect);
