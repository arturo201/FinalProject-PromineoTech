import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import myImage from "../images/me.jpeg";
import son from "../images/son.jpeg";

const Home = ({ authenticated, userProfile }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [authenticated, navigate]);

  return (
    <div className="home-container">
      <h1 className="home-header">Home</h1>
      <p className="home-header">Welcome to MicroBlog. Here's my profile:</p>
          <div className="user-card">
            <img src={myImage} alt="me" className="profile-pic-me" />
            <h2 className="main-user-name">Arturo Eslava</h2>
            <p>
              Hi, this is my final project for Promineo Tech. I hope you like.
            </p>
          </div>
          <div className="user-card">
          <h3 className="bestfriend-header">My Best Friend</h3>
            <Link to="/best-friend-profile">
              <img className="profile-pic-1" src={son} alt="My Best Friend"></img>
            </Link>
            <p className="user-name">Arturo Fabian Eslava</p>
          </div>
          <h4>Other Users:</h4>
          <div className="user-list">
            {userProfile &&
              userProfile.map((user) => (
                <div key={user.id} className="user-card">
                  <Link to={`/profile/${user.id}`}>
                    <img
                      className="profile-pic"
                      src={user.profilePic}
                      alt={user.fullName}></img>
                  </Link>
                  <h3 className="user-name">{user.fullName}</h3>
                </div>
              ))}
          </div>
    </div>
  );
};

export default Home;
