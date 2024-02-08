import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTag, getTagById } from "../../Managers/TagManager";
import { Button, Container } from "reactstrap";

export const DeleteTag = () => {
	const { id } = useParams();
	const [tag, setTag] = useState({
		id: 0,
		name: "",
	});
	const navigate = useNavigate();

	const handleDeletion = (e) => {
		e.preventDefault();
		deleteTag(tag.id).then(() => navigate("/Tags"));
	};
	useEffect(() => {
		getTagById(id).then((res) => setTag(res));
	}, [id]);
	return (
		<Container>
			<h3>
				Delete Tag #{tag.id}: {tag.name}?
			</h3>
			<Button color='danger' onClick={(e) => handleDeletion(e)}>
				Confirm Delete
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
