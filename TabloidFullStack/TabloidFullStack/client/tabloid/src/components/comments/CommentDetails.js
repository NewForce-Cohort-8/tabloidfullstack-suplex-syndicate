import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { Comment } from "./Comment";
import { getCommentById } from "../../Managers/CommentManager";
import { getPost } from "../../Managers/PostManager";

export const CommentDetails = () => {
	const { postId } = useParams();
	const { commentId } = useParams();
	const [comment, setComment] = useState({
		id: 0,
		userProfileId: 0,
		postId: postId,
		subject: "",
		content: "",
		createDateTime: "",
	});
	const [post, setPost] = useState([]);

	const getComment = () => {
		return getCommentById(commentId).then((comment) => setComment(comment));
	};

	const getThisPost = () => {
		return getPost(postId).then((post) => setPost(post));
	};

	useEffect(() => {
		getComment();
		getThisPost();
	}, [commentId, postId]);

	return (
		<Container>
			<h4 className='my-4'>
				Viewing comment: {comment.subject} for post: {post.title}
			</h4>
			<Comment comment={comment} postId={postId} />
			<Link to={`/Post/${post.id}/Comments`}>Back to comments</Link>
		</Container>
	);
};
