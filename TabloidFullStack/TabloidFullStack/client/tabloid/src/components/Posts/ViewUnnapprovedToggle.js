import { Container, Form, FormGroup, Input, Label } from "reactstrap";

export const ViewUnapprovedToggle = ({ setViewUnapproved, viewUnapproved }) => {
	return (
		<Container
			className='mt-4 d-flex flex-row-reverse'
			style={{
				width: "40rem",
			}}
		>
			<Form>
				<FormGroup switch>
					<Input
						type='switch'
						role='switch'
						checked={viewUnapproved}
						onChange={() => {
							setViewUnapproved(!viewUnapproved);
						}}
					/>
					<Label check>View Unapproved Posts</Label>
				</FormGroup>
			</Form>
		</Container>
	);
};
