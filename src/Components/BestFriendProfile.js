import React from "react";
import { Link } from "react-router-dom";
import son from "../images/son.jpeg";
import "../App.css";

function BestFriendProfile({ users }) {
  return (
    <div className="profile-container">
      <div className="user-card">
        <img className="profile-pic-1" src={son} alt="My Best Friend" />
        <h2 className="user-name">Arturo Fabian Eslava</h2>
        <p className="user-bio">
          My dad is my best friend!
        </p>
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

export default BestFriendProfile;
