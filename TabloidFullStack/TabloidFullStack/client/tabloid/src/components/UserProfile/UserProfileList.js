import React, { useEffect, useState } from "react";
import { getAllUserProfiles } from "../../Managers/UserProfileManager";
import { Link } from "react-router-dom";
import { Container, Table } from "reactstrap";
import { UserProfileRow } from "./UserProfileRow";

export default function UserProfileList() {
	const [userProfiles, setUserProfiles] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [viewActive, setViewActive] = useState(false);
	const [viewDeactivated, setViewDeactivated] = useState(false);

	useEffect(() => {
		getAllUserProfiles().then((users) => setUserProfiles(users));
	}, []);

	useEffect(() => {
		if (viewDeactivated && !viewActive) {
			const deactivatedUsers = userProfiles.filter(
				(user) => user.userStatusId == 2
			);
			setFilteredUsers(deactivatedUsers);
		}
		if (viewActive && !viewDeactivated) {
			const activeUsers = userProfiles.filter((user) => user.userStatusId == 1);
			setFilteredUsers(activeUsers);
		}
		if (!viewActive && !viewDeactivated) {
			setFilteredUsers(userProfiles);
		}
	}, [userProfiles, viewActive, viewDeactivated]);

	return (
		<Container>
			<h2>User Profiles</h2>
			<Link
				className='me-2'
				onClick={(e) => {
					e.preventDefault();
					setViewActive(false);
					setViewDeactivated(false);
				}}
			>
				View All
			</Link>
			{"|"}
			<Link
				className='mx-2'
				onClick={(e) => {
					e.preventDefault();
					setViewDeactivated(false);
					setViewActive(true);
				}}
			>
				View Active
			</Link>
			{"|"}
			<Link
				className='ms-2'
				onClick={(e) => {
					e.preventDefault();
					setViewDeactivated(true);
					setViewActive(false);
				}}
			>
				View Deactivated
			</Link>
			<Table>
				<thead>
					<tr>
						<th>Full Name</th>
						<th>Display Name</th>
						<th>User Type</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map((user) => (
						<UserProfileRow user={user} key={user.id} />
					))}
				</tbody>
			</Table>
		</Container>
	);
}
