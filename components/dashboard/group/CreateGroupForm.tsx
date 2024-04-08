'use client';

import { Check, Info, Minus } from 'react-feather';
import TimebombInput from '../TimebombInput';
import DynamicSelect, { SelectedItem } from '../../common/DynamicSelect';
import { ChangeEvent, memo, useCallback, useRef, useState } from 'react';
import { SmallLoader } from '../../common/loader/Loader';
import Image from 'next/image';
import { useAuthContext } from '@/store/AuthProvider';
import { z } from 'zod';
import { GroupSchema } from '@/lib/schema';
import { IFormResponse, parseZodErrors } from '@/lib/formHelpers';
import useToast from '@/hooks/useToast';
import { MessageType } from '@/store/MessageProvider';
import {
	createGroup,
	getPreviousMembers,
	validateGroupThumbnail,
} from '@/actions/group';
import { useRouter } from 'next/navigation';

export type Group = z.infer<typeof GroupSchema>;

type GroupThumbnailProps = {
	updateThumbnail: (value: string | null) => void;
	defaultValue?: string;
};

const AddGroupThumbnail: React.FC<GroupThumbnailProps> = memo(
	({ updateThumbnail, defaultValue }: GroupThumbnailProps) => {
		const inputRef = useRef<HTMLInputElement>(null);
		const [image, setImage] = useState<string | null>(defaultValue ?? null);
		const [imageLoading, setImageLoading] = useState<boolean>(false);
		const toast = useToast();

		const onImageSelected = useCallback(
			async (event: ChangeEvent<HTMLInputElement>) => {
				const file = event.target.files ? event.target.files[0] : null;

				if (file) {
					setImageLoading(true);
					const { valid, message } = await validateGroupThumbnail(
						file.type,
						file.size
					);

					if (!valid) {
						toast(message!, MessageType.ERROR);
						setImageLoading(false);
						if (inputRef.current) inputRef.current.value = '';
						return;
					}
					const reader = new FileReader();
					reader.onload = (loadEvent) => {
						const result = loadEvent.target?.result;
						if (result) {
							const formattedResult: string = result.toString();
							setImage(formattedResult);
							updateThumbnail(formattedResult);
							setImageLoading(false);
						}
					};
					reader.readAsDataURL(file);
				}
			},
			[]
		);

		return (
			<div className='md:col-span-2 relative my-1 border rounded py-4 px-2 flex items-center gap-4'>
				<div
					onClick={() => {
						inputRef.current && inputRef.current.click();
					}}
					className='relative w-full h-28 cursor-pointer rounded bg-gray-200 text-xs flex items-center justify-center'>
					{imageLoading ? (
						<SmallLoader />
					) : image ? (
						<>
							<Image
								style={{
									objectFit: 'cover',
									objectPosition: 'center',
								}}
								src={image}
								alt='Group Thumbnail'
								fill
								className='rounded'
							/>
							<button
								onClick={(event) => {
									event.stopPropagation();
									setImage(null);
									updateThumbnail(null);
									if (inputRef.current) {
										inputRef.current.value = '';
									}
								}}
								type='button'
								title='Remove thumbnail'
								className='bg-red-500 transition-colors duration-300 hover:bg-red-700 rounded-full absolute -top-1 -right-1'>
								<Minus size={15} className='text-white' />
							</button>
						</>
					) : (
						<p className='text-center'>No Image Selected</p>
					)}
				</div>
				<input
					id='group-thumbnail'
					type='file'
					onChange={(event) => {
						onImageSelected(event);
					}}
					accept='image/png, image/jpeg, image/jpg'
					className='hidden'
					ref={inputRef}
				/>
				<label
					htmlFor='group-thumbnail'
					className='absolute -top-2 left-2 text-gray-400 bg-white px-1 text-xs'>
					Thumbnail (Optional)
				</label>
			</div>
		);
	}
);

type CreateGroupFormProps = {
	onClose: () => void;
	group?: Group;
};

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({
	onClose,
	group,
}: CreateGroupFormProps) => {
	const { user } = useAuthContext();

	const groupNameRef = useRef<HTMLInputElement>(null);
	const groupDescriptionRef = useRef<HTMLTextAreaElement>(null);

	const [timebombValue, setTimebombValue] = useState<string | null>(
		group?.available_at ?? null
	);

	const [members, setMembers] = useState<SelectedItem>(
		group?.members ?? null
	);

	const [thumbnail, setThumbnail] = useState<string | null>(
		group?.thumbnail ?? null
	);

	const [errorDict, setErrorDict] = useState<{
		[key: string]: string;
	}>({});

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const updateTimebomb = useCallback((value: string | null) => {
		setTimebombValue(value);
	}, []);

	const updateThumbail = useCallback((value: string | null) => {
		setThumbnail(value);
	}, []);

	const updateMembers = useCallback((value: SelectedItem) => {
		setMembers(value);
	}, []);

	const toast = useToast();

	const { refresh } = useRouter();

	const onFormSubmit = async () => {
		setIsSubmitting(true);

		const formData: Group = {
			created_by: user?.id!,
			name: groupNameRef.current?.value!,
			description: groupDescriptionRef.current?.value!,
			available_at: timebombValue,
			thumbnail: thumbnail,
			members: members as string[],
		};

		const result = GroupSchema.safeParse(formData);

		if (!result.success) {
			setErrorDict(parseZodErrors(result.error));
		} else {
			!!Object.keys(errorDict).length && setErrorDict({});
			const response: IFormResponse = await createGroup(
				formData,
				group ? 'MODIFY' : 'CREATE',
				group ? group.id : undefined
			);
			if ((response.code as number) >= 400)
				toast(response.message, MessageType.ERROR);
			else {
				toast(response.message);
				onClose();
				refresh();
			}
		}
		setIsSubmitting(false);
	};

	const customValidationForMembers = useCallback((value: string) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	}, []);

	const groupNameHasError: boolean = 'name' in errorDict;
	const groupDescriptionHasError: boolean = 'description' in errorDict;
	const timebombHasError: boolean = 'available_at' in errorDict;
	const membersHasError: boolean = 'members' in errorDict;
	const thumbnailHasError: boolean = 'thumbnail' in errorDict;

	return (
		<form className='py-2 grid grid-cols-1 md:grid-cols-2 gap-3'>
			<div className='relative md:col-span-2'>
				<input
					id='group-name'
					required
					className={`form-input peer ${
						groupNameHasError && 'error'
					}`}
					defaultValue={group?.name ?? undefined}
					ref={groupNameRef}
					title='Group Name'
					type='text'
				/>
				<label
					className={`form-label ${groupNameHasError && 'error'}`}
					htmlFor='group-name'>
					Group Name
				</label>
			</div>
			{groupNameHasError && (
				<p className='text-xs text-red-500 md:col-span-2'>
					{errorDict.name}
				</p>
			)}
			<div className='relative md:col-span-2'>
				<textarea
					id='group-description'
					required
					className={`form-input peer ${
						groupDescriptionHasError && 'error'
					}`}
					defaultValue={group?.description ?? undefined}
					title='Group Description'
					ref={groupDescriptionRef}
					rows={4}
				/>
				<label
					className={`form-label ${
						groupDescriptionHasError && 'error'
					}`}
					htmlFor='group-description'>
					Group Description (Optional)
				</label>
			</div>
			{groupDescriptionHasError && (
				<p className='text-xs text-red-500 md:col-span-2'>
					{errorDict.description}
				</p>
			)}
			<TimebombInput
				defaultValue={group?.available_at ?? undefined}
				updateTimebomb={updateTimebomb}
				errorMessage={
					timebombHasError ? errorDict.available_at : undefined
				}
			/>

			<DynamicSelect
				className='md:col-span-2 my-1'
				label='Add Member'
				defaultValue={group?.members ?? undefined}
				multiple
				onSelect={updateMembers}
				customValidation={customValidationForMembers}
				cacheFunction={() => {
					return getPreviousMembers(user?.id!);
				}}
				hasError={membersHasError}
			/>
			{membersHasError && (
				<p className='text-xs text-red-500 md:col-span-2'>
					{errorDict.members}
				</p>
			)}
			<AddGroupThumbnail
				updateThumbnail={updateThumbail}
				defaultValue={group?.thumbnail ?? undefined}
			/>
			{thumbnailHasError && (
				<p className='text-xs text-red-500 md:col-span-2'>
					{errorDict.thumbnail}
				</p>
			)}
			<div className='md:col-span-2 flex gap-2 items-center justify-center w-full text-gray-400 text-xs'>
				<Info size={18} />
				<p>
					Only image formats such as .jpg, .jpeg, and .png, with a
					maximum file size of 1MB are supported.
				</p>
			</div>
			<button
				onClick={onFormSubmit}
				disabled={isSubmitting}
				type='button'
				title='Create group'
				className='primary-button md:col-start-2'>
				{isSubmitting ? (
					<SmallLoader />
				) : (
					<>
						<Check size={20} />
						<p>{group ? 'Modify' : 'Save'}</p>
					</>
				)}
			</button>
		</form>
	);
};

export default CreateGroupForm;
