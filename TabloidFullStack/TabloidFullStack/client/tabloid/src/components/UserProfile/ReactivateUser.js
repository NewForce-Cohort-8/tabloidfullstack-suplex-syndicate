import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	getUserProfileById,
	updateUserStatus,
} from "../../Managers/UserProfileManager";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardTitle,
	Container,
	ListGroup,
	ListGroupItem,
} from "reactstrap";

export const ReactivateUser = () => {
	const { userId } = useParams();
	const [user, setUser] = useState([]);
	const [date, setDate] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		getUserProfileById(userId).then((user) => {
			setUser(user);
			const [date] = user.createDateTime.split("T");
			const [year, month, day] = date.split("-");
			const formattedDate = `${month}/${day}/${year}`;
			setDate(formattedDate);
		});
	}, [userId]);

	const handleReactivate = (e) => {
		e.preventDefault();
		const userToUpdate = {
			id: user.id,
			firstName: user.firstName,
			imageLocation: user.imageLocation,
			lastName: user.lastName,
			displayName: user.displayName,
			email: user.email,
			createDateTime: user.createDateTime,
			userTypeId: user.userTypeId,
			userStatusId: 1,
		};
		return updateUserStatus(userToUpdate).then(() => navigate(`/UserProfiles`));
	};
	return (
		<Container
			fluid
			className='d-flex flex-column justify-content-center align-items-center'
		>
			<h3>Reactivate this user?</h3>
			<Card
				style={{
					width: "18rem",
				}}
			>
				<img alt='Card' src={user.imageLocation} />
				<CardBody>
					<CardTitle tag='h5' className='text-center'>
						{user.fullName}
					</CardTitle>
				</CardBody>
				<ListGroup flush>
					<ListGroupItem>Display Name: {user.displayName}</ListGroupItem>
					<ListGroupItem>Email: {user.email}</ListGroupItem>
					<ListGroupItem>Type: {user?.userType?.name}</ListGroupItem>
					<ListGroupItem>Joined: {date}</ListGroupItem>
				</ListGroup>
				<CardFooter className='d-flex justify-content-center'>
					<Button
						color='success'
						className='me-2'
						onClick={(e) => {
							return handleReactivate(e);
						}}
					>
						Reactivate
					</Button>
					<Button
						outline
						color='primary'
						onClick={(e) => {
							e.preventDefault();
							navigate("/UserProfiles");
						}}
					>
						Cancel
					</Button>
				</CardFooter>
			</Card>
		</Container>
	);
};
