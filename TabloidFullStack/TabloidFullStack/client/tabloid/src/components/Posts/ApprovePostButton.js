import { Button } from "reactstrap";
import {
	getAllPosts,
	getUnapprovedPosts,
	updatePost,
} from "../../Managers/PostManager";

export const ApprovePostButton = ({
	post,
	setUnapprovedPosts,
	setPosts,
	setFilteredPosts,
	setViewUnapproved,
}) => {
	const handleApprove = (e) => {
		e.preventDefault();
		if (e.target.id.startsWith("approve")) {
			const copy = { ...post };
			const postToApprove = {
				id: copy.id,
				userProfileId: copy.userProfileId,
				title: copy.title,
				content: copy.content,
				imageLocation: copy.imageLocation,
				createDateTime: copy.createDateTime,
				publishDateTime: copy.publishDateTime,
				isApproved: true,
				categoryId: copy.categoryId,
			};

			postToApprove.publishDateTime = post.publishDateTime
				? post.publishDateTime
				: null;

			return updatePost(postToApprove).then(() => {
				getAllPosts().then((res) => setPosts(res));
				getUnapprovedPosts().then((posts) => {
					setUnapprovedPosts(posts);
					setFilteredPosts(posts);
				});
			});
		}
	};

	if (post.isApproved) {
		return (
			<Button size='sm' color='danger' id={`unapprove--${post.id}`}>
				Unapprove
			</Button>
		);
	} else if (!post.isApproved) {
		return (
			<Button
				size='sm'
				color='success'
				id={`approve--${post.id}`}
				onClick={(e) => handleApprove(e)}
			>
				Approve
			</Button>
		);
	}
};
