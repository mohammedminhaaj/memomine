export interface IFormResponse {
	code: number | string;
	message: string;
	payload?: any;
}

export const formatErrorMessage: (error: string) => string = (
	error: string
) => {
	return error
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};
