import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardText,
	CardTitle,
	Col,
	Row,
} from "reactstrap";

export const Comment = ({ comment, postId }) => {
	const [date] = comment.createDateTime.split("T");
	const [year, month, day] = date.split("-");
	const formattedDate = `${month}/${day}/${year}`;
	const user = JSON.parse(localStorage.getItem("userProfile"));
	const navigate = useNavigate();

	const handleNavigate = (e) => {
		e.preventDefault();
		const [, commentId] = e.target.id.split("--");
		if (e.target.id.startsWith("delete-comment")) {
			navigate(`/post/${postId}/Comments/Delete/${commentId}`);
		}
		if (e.target.id.startsWith("edit-comment")) {
			navigate(`/post/${postId}/Comments/Edit/${commentId}`);
		}
	};
	return (
		<Card className='mb-4'>
			<CardHeader>
				<Row>
					<Col>{comment?.userProfile?.displayName}</Col>
					<Col className='text-end'>{formattedDate}</Col>
				</Row>
			</CardHeader>
			<CardBody>
				<CardTitle tag='h5'>{comment.subject}</CardTitle>
				<CardText>{comment.content}</CardText>
			</CardBody>
			{user.id == comment.userProfileId ? (
				<CardFooter className='d-flex justify-content-end'>
					<Button
						id={`edit-comment--${comment.id}`}
						onClick={(e) => handleNavigate(e)}
						className='me-2'
					>
						Edit
					</Button>
					<Button
						color='danger'
						id={`delete-comment--${comment.id}`}
						onClick={(e) => handleNavigate(e)}
					>
						Delete
					</Button>
				</CardFooter>
			) : (
				""
			)}
		</Card>
	);
};
