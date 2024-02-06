import { useEffect } from "react";
import { useState } from "react";
import { getAllCategories} from "../../APIManager/CategoryManager.js";
import { Container, Table } from "reactstrap";
import { CategoryRow } from "./CategoryRow.js";

export const CategoryList = () => {
	const [categories, setCategories] = useState([]);

	const getCategories = () => {
		return getAllCategories().then((categories) => setCategories(categories));
	};
	useEffect(() => {
		getCategories();
	}, []);

	return (
		<Container>
			<h2>Categories</h2>
			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{categories.map((category) => (
						<CategoryRow key={category.id} category={category} />
					))}
				</tbody>
			</Table>
		</Container>
	);
};