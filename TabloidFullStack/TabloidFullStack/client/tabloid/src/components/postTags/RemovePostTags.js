import { Table } from "reactstrap";
import { RemovePostTagRow } from "./RemovePostTagRow";

export const RemovePostTags = ({ tagged }) => {
	if (tagged.length) {
		return (
			<>
				<h4>Remove Tags from Post</h4>
				<Table striped>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Select</th>
						</tr>
					</thead>
					<tbody>
						{tagged.map((tag) => (
							<RemovePostTagRow key={tag.id} tag={tag} />
						))}
					</tbody>
				</Table>
			</>
		);
	}
};
