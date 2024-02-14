import { Button, Input } from "reactstrap";

export const PostTagRow = ({ tag }) => {
	return (
		<tr>
			<th scope='row'>{tag.id}</th>
			<td>{tag.name}</td>
			<td>
				<Input type='checkbox' id={`add--${tag.id}`} />
			</td>
		</tr>
	);
};
