import React, { useEffect, useState} from "react";
import { getAllProfiles } from "../Managers/UserProfileManager"
import { UserProfile } from "./UserProfile"

export const UserProfileList = () => {
        const[profiles, setProfiles] useState([]);
}

const getUserProfiles = () => {
    getallprofiles().then(fetchedProfiles => {
        setProfiles(fetchedProfiles);
    });
};

useEffect(() => {
    getUserProfiles();
}, []);

return (
    <Container>
        <h1> User Profile</h1>
        <tbody>
            <th>Name</th>
            <th>Display Name</th>
            <th>User Type</th>
        </tbody>
    </Container>
)