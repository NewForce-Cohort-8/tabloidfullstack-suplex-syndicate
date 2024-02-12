import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCommentById, updateComment } from "../../Managers/CommentManager";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { getPost } from "../../Managers/PostManager";

export const EditComment = () => {
	const { postId } = useParams();
	const { commentId } = useParams();
	const [comment, setComment] = useState({
		id: 0,
		userProfileId: 0,
		postId: 0,
		subject: "",
		content: "",
		createDateTime: "",
	});
	const [post, setPost] = useState([]);
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("userProfile"));
	const getComment = () => {
		return getCommentById(commentId).then((comment) => setComment(comment));
	};
	const getThisPost = () => {
		return getPost(postId).then((post) => setPost(post));
	};
	const handleUpdateComment = (e) => {
		e.preventDefault();
		const commentToUpdate = {
			id: comment.id,
			postId: post.id,
			userProfileId: comment.userProfileId,
			subject: comment.subject,
			content: comment.content,
			createDateTime: comment.createDateTime,
		};
		return updateComment(commentToUpdate).then((res) =>
			navigate(`/Post/${post.id}/Comments/${commentToUpdate.id}`)
		);
	};
	useEffect(() => {
		getComment();
		getThisPost();
	}, [commentId, postId]);

	const copy = { ...comment };
	console.log(copy);
	if (user.id == comment.userProfileId) {
		return (
			<Container>
				<h3 className='my-4'>Editing your comment for post: {post.title}</h3>
				<Form>
					<FormGroup className='mb-4'>
						<Label for='subject'>Subject</Label>
						<Input
							id='subject'
							name='subject'
							type='text'
							value={comment.subject}
							onChange={(e) => {
								e.preventDefault();
								const copy = { ...comment };
								copy.subject = e.target.value;
								setComment(copy);
							}}
						/>
					</FormGroup>
					<FormGroup className='mb-4'>
						<Label for='content'>Content</Label>
						<Input
							id='content'
							name='content'
							type='textarea'
							value={comment.content}
							onChange={(e) => {
								e.preventDefault();
								const copy = { ...comment };
								copy.content = e.target.value;
								setComment(copy);
							}}
						/>
					</FormGroup>
					<Button
						color='primary'
						onClick={(e) => {
							return handleUpdateComment(e);
						}}
						className='me-2'
					>
						Save
					</Button>
					<Button
						outline
						onClick={(e) => {
							e.preventDefault();
							navigate(`/post/${postId}/Comments`);
						}}
					>
						Cancel
					</Button>
				</Form>
			</Container>
		);
	} else {
		return (
			<Container>
				<h3>Must be the author of the comment to edit the comment</h3>
				<Link to={`/Post/${post.id}/Comments`}>Back to comments</Link>
			</Container>
		);
	}
};
