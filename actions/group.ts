'use server';

import { IFormResponse, parseZodErrors } from '@/lib/formHelpers';
import { GroupSchema } from '@/lib/schema';

import { Group } from '@/components/dashboard/group/CreateGroupForm';

import { COOKIE_NAME, PAGINATION_ITEMS } from '@/lib/constants';
import { User } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { getUser } from './auth';

export const getGroups = async (
	page: string | undefined,
	searchQuery: string | undefined,
	group: string | undefined
) => {
	const supabase = createClient();

	const { user } = await getUser(supabase);

	const parsedPage: number = page ? parseInt(page) : 1;
	const startLimit: number = PAGINATION_ITEMS * parsedPage - PAGINATION_ITEMS;
	const endLimit: number = PAGINATION_ITEMS * parsedPage - 1;

	let query = supabase
		.from('group')
		.select('*', { count: 'exact' })
		.order('created_at', { ascending: false })
		.range(startLimit, endLimit);
	if (searchQuery) {
		query = query.or(
			`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
		);
	}
	if (group === 'created') {
		query = query.eq('created_by', user.id);
	} else if (group === 'shared') {
		query = query.contains('members', [user.email]);
	} else {
		query = query.or(`created_by.eq.${user.id},members.cs.{${user.email}}`);
	}

	const { error, data, count } = await query;
	if (error) throw new Error(error.message);
	return { groups: data as Group[], count, currentUserId: user.id };
};

export const createGroup: (
	formData: Group,
	method: 'CREATE' | 'MODIFY',
	id?: string
) => Promise<IFormResponse> = async (formData, method, id) => {
	const supabase = createClient();
	const result = GroupSchema.safeParse(formData);

	if (!result.success) {
		const parsedErrors = parseZodErrors(result.error);
		return {
			code: 400,
			message: Object.values(parsedErrors)[0] as string,
		};
	} else {
		try {
			const availableAt: Date | null = formData.available_at
				? new Date(formData.available_at)
				: null;
			const data = {
				created_by: formData.created_by,
				name: formData.name,
				description:
					formData.description === ''
						? null
						: (formData.description as string),
				available_at: availableAt,
				thumbnail: formData.thumbnail,
				members: formData.members,
			};
			const { error } =
				method === 'CREATE'
					? await supabase.from('group').insert(data)
					: await supabase
							.from('group')
							.update(formData)
							.eq('id', id);
			if (error) {
				return {
					code: 400,
					message: error.message,
				};
			}
			return {
				code: 200,
				message: `Group ${
					method === 'CREATE' ? 'Created' : 'Modified'
				} Successfully`,
			};
		} catch (error) {
			return {
				code: 500,
				message: 'Something went wrong',
			};
		}
	}
};

export const deleteGroup: (groupId: string) => Promise<IFormResponse> = async (
	groupId: string
) => {
	const supabase = createClient();
	const { user } = await getUser(supabase);
	try {
		const { error } = await supabase
			.from('group')
			.delete()
			.eq('id', groupId)
			.eq('created_by', user.id);
		if (error) {
			return {
				code: 400,
				message: error.message,
			};
		}
		return {
			code: 200,
			message: 'Group Deleted Successfully',
		};
	} catch (error) {
		return {
			code: 500,
			message: 'Something went wrong',
		};
	}
};

export const getPreviousMembers = async () => {
	const supabase = createClient();
	let memberArray: string[] = [];
	const { user } = await getUser(supabase);
	try {
		const { error, data } = await supabase
			.from('group')
			.select('members')
			.eq('created_by', user.id);

		if (error) return memberArray;

		const memberSet = new Set(data.flatMap((group) => group.members || []));

		return Array.from(memberSet);
	} catch {
		return memberArray;
	}
};

export const validateGroupThumbnail: (
	fileType: string,
	fileSize: number
) => Promise<{
	valid: boolean;
	message: string | null;
}> = async (fileType: string, fileSize: number) => {
	if (!['image/png', 'image/jpg', 'image/jpeg'].includes(fileType))
		return { valid: false, message: 'Unsupported file type' };
	else if (fileSize >= 1_048_576)
		return { valid: false, message: 'File too large' };
	else return { valid: true, message: null };
};
