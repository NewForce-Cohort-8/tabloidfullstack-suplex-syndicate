import React, { useEffect, useState } from "react";
import { getAllUserProfiles } from "../../Managers/UserProfileManager";
import { Link } from "react-router-dom";

export default function UserProfileList() {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    getAllUserProfiles().then(setUserProfiles);
  }, []);

  return (
    <div>
      <h2>User Profiles</h2>
      <div>
        {userProfiles.map((user) => (
          <>
          <p key={user.id} className="row justify-content-center">
            {user.fullName} - {user.displayName} - {user.userType.name}
          </p>
          <div className="text-center">
          <Link to={`/userprofiles/${user.id}`} className="text-center"> <button className="btn btn-primary">View Details</button> </Link>
          </div>
          <br />
          </>
        ))}
      </div>
    </div>
  );
}