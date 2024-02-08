import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "../../Managers/PostManager";
import { addComment } from "../../Managers/CommentManager";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

export const AddComment = () => {
	const { postId } = useParams();
	const user = JSON.parse(localStorage.getItem("userProfile"));
	const navigate = useNavigate();
	const [comment, setComment] = useState({
		postId: postId,
		userProfileId: parseInt(user.id),
		subject: "",
		content: "",
		createDateTime: "",
	});
	const [post, setPost] = useState([]);

	const handleAddComment = (e) => {
		e.preventDefault();
		const copy = { ...comment };
		copy.createDateTime = new Date();
		return addComment(copy).then(() => navigate(`/post/${postId}/Comments`));
	};
	useEffect(() => {
		getPost(postId).then((post) => setPost(post));
	}, [postId]);

	return (
		<Container>
			<h3 className='my-4'>Add a new comment to post: {post.title}</h3>
			<Form>
				<FormGroup className='mb-4'>
					<Label for='subject'>Subject</Label>
					<Input
						id='subject'
						name='subject'
						type='text'
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
						onChange={(e) => {
							e.preventDefault();
							const copy = { ...comment };
							copy.content = e.target.value;
							setComment(copy);
						}}
					/>
				</FormGroup>
				<Button color='primary' onClick={(e) => handleAddComment(e)}>
					Save
				</Button>
			</Form>
		</Container>
	);
};
