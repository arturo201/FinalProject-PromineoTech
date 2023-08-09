import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Posts from "./Components/Posts";
import Notifications from "./Components/Notifications";
import NavBar from "./Components/NavBar";
import axios from "axios";
import CreatePost from "./Components/CreatePost";
import Register from "./Components/Register";
import Login from "./Components/Login";
import UserProfiles from "./Components/UserProfiles";
import BestFriendProfile from "./Components/BestFriendProfile";
import "./App.css";

const POSTS_API = "https://64c9ad71b2980cec85c25890.mockapi.io/posts";
const NAMES_API = "https://64c9ad71b2980cec85c25890.mockapi.io/names";
const USER_PROFILE = "https://64c9ad71b2980cec85c25890.mockapi.io/userprofile";

export default function App() {
  //storing the posts from the API
  const [posts, setPosts] = useState([]);

  // check if user is authenticated
  const [authenticated, setAuthenticated] = useState(false);

  //diplays notification
  const [notification, setNotification] = useState("");

  // this is to generate different names in the comment section
  const [names, setNames] = useState([]);

  // user profiles
  const [userProfile, setUserProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    axios
      .get(POSTS_API)
      .then((resp) => {
        setPosts(resp.data);
      })
      .catch((err) => {
        console.error(`Error fetching data: ${err}`);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // fetch names from API
  const fetchNames = () => {
    axios
      .get(NAMES_API)
      .then((resp) => {
        setNames(resp.data);
      })
      .catch((err) => {
        console.error(`Error fetching names: ${err}`);
      });
  };

  useEffect(() => {
    fetchNames();
  }, []);

  const deletePost = (id) => {
    axios
      .delete(`${POSTS_API}/${id}`)
      .then((resp) => {
        fetchPosts();
      })
      .catch((err) => {
        console.error(`Error deleting post: ${err}`);
      });
  };

  // Authentication
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    fetchPosts();
  }, []);

  const handleLogin = (inputUsername, inputPassword, navigate) => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (inputUsername === storedUsername && inputPassword === storedPassword) {
      setAuthenticated(true);
      navigate("/"); // navigate to home
    } else {
      setNotification("Incorrect username or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setAuthenticated(false);
  };

  const handleRegistration = (username, password) => {
    // if (!username.trim() || !password.trim()) {
    //   setNotification('');
    //   setRegNotification("Both username and password are required for registration!")
    //   return;
    // }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    setNotification('');
  };

  const handleLike = (postId) => {
    const postToLike = posts.find((post) => post.id === postId);
    if (postToLike) {
      const updatedLikes = postToLike.likes + 1;
      // Make API call to update the post
      axios
        .put(`${POSTS_API}/${postId}`, { ...postToLike, likes: updatedLikes })
        .then(() => {
          fetchPosts(); // Refetch the posts to reflect the updated like count.
        })
        .catch((err) => {
          console.error(`Error updating post likes: ${err}`);
        });
    }
  };

  const fetchUserProfile = () => {
    axios
      .get(USER_PROFILE)
      .then((resp) => {
        setUserProfile(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        console.err(`Error fetching user profile: ${err}`);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  function updateUser(updatedUser) {
    setUserProfile((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  }

  const resetNotification = () => {
    setNotification('');
  }

  return (
    <Router>
      <NavBar onLogout={handleLogout} authenticated={authenticated} />
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} notification={notification} onResetNotification={resetNotification} />}
        />
        <Route
          path="/register"
          element={
            <Register
              onRegister={handleRegistration}

            />
          }
        />

        <Route
          path="/"
          element={
            <Home authenticated={authenticated} userProfile={userProfile} />
          }
        />
        <Route path="/best-friend-profile" element={<BestFriendProfile users={userProfile} />} />

        {authenticated && !loading && (
          <Route
            path="/profile/:userId"
            element={
              <UserProfiles users={userProfile} updateUser={updateUser} />
            }
          />
        )}

        {authenticated && (
          <>
            <Route
              path="/posts"
              element={
                <Posts
                  posts={posts}
                  refreshPosts={fetchPosts}
                  handleLike={handleLike}
                  deletePost={deletePost}
                  authenticated={authenticated}
                  names={names}
                />
              }
            />
            <Route
              path="/createpost"
              element={
                <CreatePost
                  refreshPosts={fetchPosts}
                  authenticated={authenticated}
                />
              }
            />
            <Route
              path="/notifications"
              element={<Notifications authenticated={authenticated} />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
}
