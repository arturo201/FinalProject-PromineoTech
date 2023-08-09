import React from "react";
import { useParams, Link } from "react-router-dom";
import EditProfile from "./EditProfile";

function UserProfiles({ users, updateUser }) {
  const { userId } = useParams();

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return <div>User not found!</div>;
  }

  return (
    <div className="profile-container">
      <div className="user-card">
        <img className="profile-pic" src={user.profilePic} alt={user.fullName} />
        <h2 className="user-name">{user.fullName}</h2>
        <p className="user-name">Username: {user.username}</p>
        <p className="user-bio">{user.bio}</p>
        <EditProfile users={users} updateUser={updateUser} />
      </div>
      <h4 className="otherusers-header">Other Users:</h4>
      <div className="user-list">
        {users &&
          users.map((user) => (
            <div key={user.id} className="user-card">
              <Link to={`/profile/${user.id}`}>
                <img className="profile-pic" src={user.profilePic} alt={user.fullName} />
              </Link>
              <h3 className="user-name">{user.fullName}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserProfiles;
