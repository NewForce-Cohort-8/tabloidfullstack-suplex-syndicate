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
    <div className=
)