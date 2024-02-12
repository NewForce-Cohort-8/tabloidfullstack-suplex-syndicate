import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteComment, getCommentById } from "../../Managers/CommentManager";
import { getPost } from "../../Managers/PostManager";
import { Button, Container } from "reactstrap";
import { useEffect, useState } from "react";

export const DeleteComment = () => {
	const { commentId } = useParams();
	const { postId } = useParams();
	const [post, setPost] = useState([]);
	const [comment, setComment] = useState([]);
	const user = JSON.parse(localStorage.getItem("userProfile"));
	const navigate = useNavigate();

	const getComment = () => {
		return getCommentById(commentId).then((comment) => setComment(comment));
	};

	const getThisPost = () => {
		return getPost(postId).then((post) => setPost(post));
	};

	const handleDeletion = (e) => {
		e.preventDefault();
		deleteComment(comment.id).then(() => navigate(`/Post/${post.id}/Comments`));
	};
	useEffect(() => {
		getComment();
		getThisPost();
	}, [commentId, postId]);

	if (user.id == comment.userProfileId) {
		return (
			<Container>
				<h3 className='my-4'>Delete your comment for post: {post.title}?</h3>
				<div className='mb-4'>Subject: {comment.subject}</div>
				<div className='mb-4'>Content: {comment.content}</div>
				<Button
					color='danger'
					onClick={(e) => handleDeletion(e)}
					className='me-2'
				>
					Confirm Delete
				</Button>
				<Button
					outline
					onClick={(e) => {
						e.preventDefault();
						navigate(`/Post/${post.id}/Comments`);
					}}
				>
					Cancel
				</Button>
			</Container>
		);
	} else {
		return (
			<Container>
				<h3>Must be the author of the comment to delete the comment</h3>
				<Link to={`/Post/${post.id}/Comments`}>Back to comments</Link>
			</Container>
		);
	}
};
