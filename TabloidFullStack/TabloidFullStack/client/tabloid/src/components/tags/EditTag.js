import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTagById, updateTag } from "../../Managers/TagManager";
import {
	Button,
	Container,
	Input,
	InputGroup,
	InputGroupText,
} from "reactstrap";

export const EditTag = () => {
	const { id } = useParams();
	const [tag, setTag] = useState({
		id: id,
		name: "",
	});
	const navigate = useNavigate();
	const handleUpdate = (e) => {
		e.preventDefault();
		const copy = { ...tag };
		updateTag(copy).then((res) => navigate("/Tags"));
	};
	useEffect(() => {
		getTagById(id).then((res) => setTag(res));
	}, [id]);
	return (
		<Container>
			<InputGroup>
				<InputGroupText>Name</InputGroupText>
				<Input
					placeholder='Name'
					value={tag.name}
					onChange={(e) => {
						const copy = { ...tag };
						copy.name = e.target.value;
						setTag(copy);
					}}
				/>
			</InputGroup>
			<Button color='primary' onClick={(e) => handleUpdate(e)}>
				Save
			</Button>
			<Button
				outline
				onClick={(e) => {
					e.preventDefault();
					navigate("/Tags");
				}}
			>
				Cancel
			</Button>
		</Container>
	);
};
