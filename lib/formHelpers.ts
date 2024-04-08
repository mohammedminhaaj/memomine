'use client';

import { ZodError } from 'zod';

export interface IFormResponse {
	code: number | string;
	message: string;
	payload?: any;
}

export const parseZodErrors = (error: ZodError) => {
	const errorDict: { [key: string]: string } = {};
	for (let item of error.issues) errorDict[item.path[0]] = item['message'];
	return errorDict;
};
