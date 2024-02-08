import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostComments } from "../../Managers/CommentManager";
import { Col, Container, Row } from "reactstrap";
import { Comment } from "./Comment";
import { getPost } from "../../Managers/PostManager";

export const CommentList = () => {
	const { postId } = useParams();
	const [comments, setComments] = useState([]);
	const [post, setPost] = useState([]);
	const getThisPost = () => {
		return getPost(postId).then((post) => setPost(post));
	};
	const getComments = () => {
		return getPostComments(postId).then((comments) => setComments(comments));
	};
	useEffect(() => {
		getComments();
		getThisPost();
	}, [postId]);

	return (
		<Container>
			<Row className='my-4'>
				<Col>
					<h3>Comments for: {post.title}</h3>
				</Col>
				<Col className='text-end'>
					<Link to={`/post/${postId}`}>Back to post</Link>
				</Col>
			</Row>

			{comments.map((comment) => (
				<Comment comment={comment} key={comment.id} />
			))}
		</Container>
	);
};
