export const CategoryRow = ({ category }) => {
	return (
		<tr>
			<th scope='category'>{category.id}</th>
			<td>{category.name}</td>
		</tr>
	);
};