import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "reactstrap";
import { getPostTagbyTagIdAndPostId } from "../../Managers/PostTagManager";

export const RemovePostTagRow = ({ tag }) => {
	const { postId } = useParams();
	const [postTag, setPostTag] = useState([]);
	const getThisPostTag = () => {
		return getPostTagbyTagIdAndPostId(tag.id, postId).then((postTag) =>
			setPostTag(postTag)
		);
	};
	useEffect(() => {
		getThisPostTag();
	}, [postId, tag]);
	return (
		<tr>
			<th scope='row'>{tag.id}</th>
			<td>{tag.name}</td>
			<td>
				<Input type='checkbox' id={`delete--${postTag.id}`} />
			</td>
		</tr>
	);
};
