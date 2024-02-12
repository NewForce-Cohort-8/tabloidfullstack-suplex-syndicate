import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export const TagRow = ({ tag, post }) => {
	const navigate = useNavigate();
	const handleNavigate = (e) => {
		e.preventDefault();
		const [, tagId] = e.target.id.split("--");
		if (e.target.id.startsWith("delete-tag")) {
			navigate(`/Tags/Delete/${tagId}`);
		}
		if (e.target.id.startsWith("edit-tag")) {
			navigate(`/Tags/Edit/${tagId}`);
		}
	};

	return (
		<tr>
			<th scope='row'>{tag.id}</th>
			<td>{tag.name}</td>
			<td>
				<Button
					id={`delete-tag--${tag.id}`}
					color='danger'
					onClick={(e) => handleNavigate(e)}
				>
					Delete
				</Button>
				<Button id={`edit-tag--${tag.id}`} onClick={(e) => handleNavigate(e)}>
					Edit
				</Button>
			</td>
		</tr>
	);
};
