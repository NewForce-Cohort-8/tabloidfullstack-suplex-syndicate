import { useEffect } from "react";
import { useState } from "react";
import { getAllTags } from "../../Managers/TagManager.js";
import { Container, Table } from "reactstrap";
import { TagRow } from "./TagRow.js";

export const TagList = () => {
	const [tags, setTags] = useState([]);

	const getTags = () => {
		return getAllTags().then((tags) => setTags(tags));
	};
	useEffect(() => {
		getTags();
	}, []);

	return (
		<Container>
			<h2>Tags</h2>
			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{tags.map((tag) => (
						<TagRow key={tag.id} tag={tag} />
					))}
				</tbody>
			</Table>
		</Container>
	);
};
