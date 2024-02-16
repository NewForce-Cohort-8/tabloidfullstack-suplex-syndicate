import { Container, Input } from "reactstrap";

export const SearchByTag = ({ setSearchTerms }) => {
	return (
		<Container
			fluid
			className='my-4'
			style={{
				width: "40rem",
			}}
		>
			<Input
				type='text'
				placeholder='Search by tag...'
				onChange={(e) => {
					e.preventDefault();
					setSearchTerms(e.target.value);
				}}
			/>
		</Container>
	);
};
