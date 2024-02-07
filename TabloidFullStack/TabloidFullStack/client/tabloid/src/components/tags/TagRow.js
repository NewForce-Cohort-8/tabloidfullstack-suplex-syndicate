import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export const TagRow = ({ tag }) => {
	const navigate = useNavigate();
	const handleNavigate = (e) => {
		e.preventDefault();
		const [, tagId] = e.target.id.split("--");
		navigate(`/Tags/Delete/${tagId}`);
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
			</td>
		</tr>
	);
};
