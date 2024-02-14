import { Badge } from "reactstrap";

export const PostTagBadge = ({ postTag }) => {
	return (
		<Badge pill color='info' className='me-2'>
			<span className='align-middle'>{postTag.tag.name}</span>
		</Badge>
	);
};
