export const TagRow = ({ tag }) => {
	return (
		<tr>
			<th scope='row'>{tag.id}</th>
			<td>{tag.name}</td>
		</tr>
	);
};
