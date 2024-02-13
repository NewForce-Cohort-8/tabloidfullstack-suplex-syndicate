import React, { useEffect, useState } from "react";
import { getAllUserProfiles } from "../../Managers/UserProfileManager";
import { Link } from "react-router-dom";
import { Container, Table } from "reactstrap";
import { UserProfileRow } from "./UserProfileRow";

export default function UserProfileList() {
	const [userProfiles, setUserProfiles] = useState([]);

	useEffect(() => {
		getAllUserProfiles().then((users) => setUserProfiles(users));
	}, []);

	return (
		<Container>
			<h2>User Profiles</h2>
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
					{userProfiles.map((user) => (
						<UserProfileRow user={user} key={user.id} />
					))}
				</tbody>
			</Table>
		</Container>
	);
}
