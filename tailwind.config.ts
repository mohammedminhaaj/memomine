import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#22577A',
				secondary: '#38A3A5',
				tertiary: '#57CC99',
				base: '#80ED99',
				'base-light': '#C7F9CC',
			},
		},
	},
	plugins: [],
};
export default config;
