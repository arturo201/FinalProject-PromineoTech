import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin, notification, onResetNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    onLogin(username, password, navigate);
    
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if(notification) {
        onResetNotification();
    }
  }, []);


  return (
    <div className="login-container">
      {notification && <p className="login-notification">{notification}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <p className="demo-acct">
          Demo Account: <br />
          Username: test1  <br />
          Password: test123
        </p>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="login-btn" type="submit" value="Login" />
        <h6 className="new-text">New Here?</h6>
        <Link className="create-account" to="/register">
          <p>Create an account</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
