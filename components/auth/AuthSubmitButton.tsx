import { SmallLoader } from '../common/loader/Loader';

type AuthSubmitButtonProps = {
	isSubmitting: boolean;
	text: string;
	textWhenSubmitting: string;
};

const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({
	isSubmitting,
	text,
	textWhenSubmitting,
}: AuthSubmitButtonProps) => (
	<button
		title={text}
		type='submit'
		disabled={isSubmitting}
		className='px-4 py-2 bg-secondary transition-colors hover:bg-primary duration-200 focus:outline-primary disabled:bg-gray-400 disabled:hover:bg-gray-500 text-white rounded'>
		{isSubmitting ? (
			<span className='grid grid-cols-4 w-fit gap-2 mx-auto'>
				<SmallLoader className='col-span-1' />
				<p className='col-span-3'>{textWhenSubmitting}</p>
			</span>
		) : (
			text
		)}
	</button>
);

export default AuthSubmitButton;
