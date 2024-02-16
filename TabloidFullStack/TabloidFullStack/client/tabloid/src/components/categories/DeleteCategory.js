import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCategory, getCategoryById } from "../../Managers/CategoryManager";
import { Button, Container } from "reactstrap";

export const DeleteCategory = () => {
	const { id } = useParams();
	const [category, setCategory] = useState({
		id: 0,
		name: "",
	});
	const navigate = useNavigate();

	const handleDeletion = (e) => {
		e.preventDefault();
		deleteCategory(category.id).then(() => navigate("/Categories"));
	};
	useEffect(() => {
		getCategoryById(id).then((res) => setCategory(res));
	}, [id]);
	return (
		<Container>
			<h3>
				Delete Category #{category.id}: {category.name}?
			</h3>
			<Button color='danger' onClick={(e) => handleDeletion(e)}>
				Confirm Delete
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
