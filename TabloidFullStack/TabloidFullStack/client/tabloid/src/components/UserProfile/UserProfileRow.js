import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export const UserProfileRow = ({ user }) => {
	const navigate = useNavigate();

	const handleNavigate = (e) => {
		e.preventDefault();
		const [, userId] = e.target.id.split("--");
		if (e.target.id.startsWith("details")) {
			navigate(`/userprofiles/${userId}`);
		}
		if (e.target.id.startsWith("deactivate")) {
			navigate(`/UserProfiles/${userId}/Deactivate`);
		}
	};
	return (
		<tr>
			<td>{user.fullName}</td>
			<td>{user.displayName}</td>
			<td>{user?.userType?.name}</td>
			<td>
				<Button
					color='primary'
					id={`details--${user.id}`}
					className='me-2'
					onClick={(e) => handleNavigate(e)}
				>
					View Details
				</Button>
				{user?.userStatus?.name == "Active" ? (
					<Button
						color='danger'
						id={`deactivate--${user.id}`}
						onClick={(e) => handleNavigate(e)}
					>
						Deactivate
					</Button>
				) : (
					""
				)}
			</td>
		</tr>
	);
};
