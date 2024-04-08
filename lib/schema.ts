import { z } from 'zod';

export const GroupSchema = z.object({
	id: z.string().optional(),
	created_by: z.string(),
	name: z
		.string()
		.trim()
		.min(1, { message: 'Name cannot be empty' })
		.max(50, { message: 'Name cannot contain more than 50 characters' }),
	description: z
		.string()
		.max(500, {
			message: 'Description cannot contain more than 500 characters',
		})
		.nullable(),
	available_at: z
		.string()
		.datetime({ message: 'Invalid date and time' })
		.nullable(),
	thumbnail: z.string().nullable(),
	members: z
		.array(z.string().email({ message: 'Invalid email(s) passed' }))
		.nullable(),
	created_at: z
		.string()
		.datetime()
		.optional(),
});
