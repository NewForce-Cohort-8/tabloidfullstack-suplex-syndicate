import { useState } from "react";
import { Container, Input, InputGroup, Button } from "reactstrap";
import { addCategory } from "../../Managers/CategoryManager";
import { useNavigate } from "react-router-dom";
import { CategoryList } from "./CategoryList";

 export const AddCategory = () => {
	const [category, setCategory] = useState({name: "",
	});
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		return addCategory(category).then(() => navigate("/Categories"));
	};
	return (
		<Container>
			<InputGroup>
				<Input
					placeholder='Name'
					onChange={(e) => {
						const copy = { ...category };
						copy.name = e.target.value;
						setCategory(copy);
					}}
				/>
				<Button color='primary' onClick={(e) => handleSubmit(e)}>
					Save
				</Button>
			</InputGroup>
		</Container>
	);
};




