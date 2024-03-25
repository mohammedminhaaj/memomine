import { LargeLoader, SmallLoader } from "@/components/common/loader/Loader";

const DashBoard: () => JSX.Element = () => {
	return (
		<>
			<LargeLoader />
			<SmallLoader color='#22577A' />
		</>
	);
};

export default DashBoard;
