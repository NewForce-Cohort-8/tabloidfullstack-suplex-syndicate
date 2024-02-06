import { useState } from "react";
import { Container, Input, InputGroup, Button } from "reactstrap";
import { addTag } from "../../Managers/TagManager";
import { useNavigate } from "react-router-dom";

export const AddTag = () => {
	const [tag, setTag] = useState({
		name: "",
	});
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		return addTag(tag).then(() => navigate("/Tags"));
	};
	return (
		<Container>
			<InputGroup>
				<Input
					placeholder='Name'
					onChange={(e) => {
						const copy = { ...tag };
						copy.name = e.target.value;
						setTag(copy);
					}}
				/>
				<Button color='primary' onClick={(e) => handleSubmit(e)}>
					Save
				</Button>
			</InputGroup>
		</Container>
	);
};
