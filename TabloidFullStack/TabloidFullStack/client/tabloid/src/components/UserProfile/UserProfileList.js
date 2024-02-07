import React, { useEffect, useState } from "react";
import { getAllUserProfiles } from "../../Managers/UserProfileManager";

export default function UserProfileList() {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    getAllUserProfiles().then(setUserProfiles);
  }, []);

  return (
    <div>
      <h2>User Profiles</h2>
      <ul>
        {userProfiles.map((user) => (
          <li key={user.id}>
            {user.fullName} - {user.displayName} - {user.userType.name}
          </li>
        ))}
      </ul>
    </div>
  );
}