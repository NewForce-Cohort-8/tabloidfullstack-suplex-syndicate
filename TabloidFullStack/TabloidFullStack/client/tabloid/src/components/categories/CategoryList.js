import { useEffect } from "react";
import { useState } from "react";
import { addCategory, getAllCategories} from "../../Managers/CategoryManager.js";
import { Button, Container, Table } from "reactstrap";
import { CategoryRow } from "./CategoryRow.js";
import CategoryForm from "./CategoryForm.js";
import { Navigate, useNavigate } from "react-router-dom";

export const CategoryList = () => {
	const [categories, setCategories] = useState([]);
	const navigate = useNavigate();
	const getCategories = () => {
		return getAllCategories().then((categories) => setCategories(categories));
	};
	useEffect(() => {
		getCategories();
	}, []);



	return (
		<Container>
			<h2>Categories</h2>
			<Button
				color='primary'
				onClick={(e) => {
					e.preventDefault();
					navigate("/Categories/form");
				}}
			>
				Create Category
			</Button>

			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
					</tr>
				</thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
            </tr>
          ))}
        </tbody>
			</Table>

		</Container>
	);
};