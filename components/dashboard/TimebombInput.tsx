'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { memo, useState } from 'react';
import { Info } from 'react-feather';
import { DateTime } from 'luxon';

type TimbombInputProps = {
	updateTimebomb: (value: string | null) => void;
	errorMessage?: string;
	defaultValue?: string;
};

const TimebombInput: React.FC<TimbombInputProps> = ({
	updateTimebomb,
	errorMessage,
	defaultValue,
}: TimbombInputProps) => {
	const [isChecked, setIsChecked] = useState<boolean>(
		defaultValue ? true : false
	);

	return (
		<>
			<div className='flex gap-1 items-center'>
				<input
					onChange={(event) => {
						const isChecked = event.target.checked;
						setIsChecked(isChecked);
						updateTimebomb(isChecked ? '' : null);
					}}
					id='timebomb-checkbox'
					type='checkbox'
					checked={Boolean(
						(defaultValue && isChecked) ||
							(!defaultValue && isChecked)
					)}
					className='accent-primary focus:outline-primary'
				/>
				<label
					htmlFor='timebomb-checkbox'
					className='text-gray-500 text-xs'>
					Timebomb
				</label>
			</div>
			<AnimatePresence mode='sync'>
				{isChecked && (
					<>
						<motion.input
							key={'timebomb-input'}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							type='datetime-local'
							className={`form-input ${errorMessage && 'error'}`}
							defaultValue={
								defaultValue
									? DateTime.fromISO(defaultValue).toFormat(
											`y-LL-dd'T'HH:mm`
									  )
									: ''
							}
							id='timebomb-datetime'
							onChange={(event) => {
								try {
									updateTimebomb(
										new Date(
											event.target.value
										).toISOString()
									);
								} catch {
									updateTimebomb('');
								}
							}}
						/>
						{errorMessage && (
							<p className='text-xs text-red-500 md:col-span-2 md:place-self-end'>
								{errorMessage}
							</p>
						)}
						<motion.span
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className='text-xs text-gray-400 flex gap-1 items-center md:col-span-2 justify-center'>
							<Info size={12} />
							<p>
								The group will be accessible at the above date
								and time
							</p>
						</motion.span>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

export default memo(TimebombInput);
