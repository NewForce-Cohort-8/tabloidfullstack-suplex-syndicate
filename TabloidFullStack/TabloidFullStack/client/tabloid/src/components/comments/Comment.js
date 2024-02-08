import { useEffect } from "react";
import {
	Card,
	CardBody,
	CardHeader,
	CardText,
	CardTitle,
	Col,
	Row,
} from "reactstrap";

export const Comment = ({ comment }) => {
	const [date] = comment.createDateTime.split("T");
	const [year, month, day] = date.split("-");
	const formattedDate = `${month}/${day}/${year}`;
	useEffect(() => {
		console.log(comment);
	}, [comment]);
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
		</Card>
	);
};
