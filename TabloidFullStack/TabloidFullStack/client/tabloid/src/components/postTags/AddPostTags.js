import { Table } from "reactstrap";

import { PostTagRow } from "./PostTagRow";

export const AddPostTags = ({ post, notTagged }) => {
	if (notTagged.length) {
		return (
			<>
				<h4>Add Tags to Post</h4>
				<Table striped>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Select</th>
						</tr>
					</thead>
					<tbody>
						{notTagged.map((tag) => (
							<PostTagRow key={tag.id} tag={tag} />
						))}
					</tbody>
				</Table>
			</>
		);
	}
};
