import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById, updateCategory } from "../../Managers/CategoryManager";
import {
	Button,
	Container,
	Input,
	InputGroup,
	InputGroupText,
} from "reactstrap";

export const EditCategory = () => {
	const { id } = useParams();
	const [category, setCategory] = useState({
		id: id,
		name: "",
	});
	const navigate = useNavigate();
	const handleUpdate = (e) => {
		e.preventDefault();
		const copy = { ...category };
		updateCategory(copy).then((res) => navigate("/Categories"));
	};
	useEffect(() => {
		getCategoryById(id).then((res) => setCategory(res));
	}, [id]);
	return (
		<Container>
			<InputGroup>
				<InputGroupText>Name</InputGroupText>
				<Input
					placeholder='Name'
					value={category.name}
					onChange={(e) => {
						const copy = { ...category };
						copy.name = e.target.value;
						setCategory(copy);
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
					navigate("/Categories");
				}}
			>
				Cancel
			</Button>
		</Container>
	);
};
