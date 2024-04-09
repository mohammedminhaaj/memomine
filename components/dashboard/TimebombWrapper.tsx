'use client';

import { DateTime, Duration } from 'luxon';
import { useEffect, useState } from 'react';
import { Lock } from 'react-feather';

type TimebombWrapperType = {
	availableAt?: string | null;
	isOwner: boolean;
	children: React.ReactNode;
};

const TimebombWrapper: React.FC<TimebombWrapperType> = ({
	availableAt,
	isOwner,
	children,
}: TimebombWrapperType) => {
	const parsedAvailableAt: DateTime<true> | DateTime<false> | null =
		availableAt ? DateTime.fromISO(availableAt) : null;

	const now: DateTime<true> = DateTime.now();

	const initialSeconds =
		!isOwner && parsedAvailableAt && parsedAvailableAt > now
			? parsedAvailableAt.diff(now, 'seconds').seconds
			: 0;

	const [seconds, setSeconds] = useState<number>(initialSeconds);

	useEffect(() => {
		if (seconds <= 0) {
			return;
		}

		const intervalId = setInterval(() => {
			setSeconds((prevSeconds) => prevSeconds - 1);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [seconds]);

	const remainingDuration = Duration.fromObject({ seconds });

	const { days, hours, minutes } = remainingDuration.shiftTo(
		'days',
		'hours',
		'minutes'
	);

	const dayString = days && days > 0 ? `${Math.floor(days)}d ` : '';
	const hourString = hours && hours > 0 ? `${Math.floor(hours)}h and ` : '';
	const minuteString =
		minutes && minutes > 0 ? `${Math.floor(minutes)}m` : '';
	const secondString =
		hours === 0 && minutes === 0 ? 'Few more seconds to go' : '';

	return !isOwner && seconds > 0 ? (
		<div className='flex justify-center gap-2 items-center w-full h-full flex-col relative font-bold text-white'>
			<Lock size={20} />
			<p
				className='text-center'
				suppressHydrationWarning={
					true
				}>{`${dayString}${hourString}${minuteString}${secondString}`}</p>
		</div>
	) : (
		<>{children}</>
	);
};

export default TimebombWrapper;
