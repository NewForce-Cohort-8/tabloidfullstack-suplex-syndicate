import { Button } from "reactstrap";

export const TagRow = ({ tag }) => {
	return (
		<tr>
			<th scope='row'>{tag.id}</th>
			<td>{tag.name}</td>
			<td>
				<Button id={`delete-tag--${tag.id}`} color='danger'>
					Delete
				</Button>
			</td>
		</tr>
	);
};
