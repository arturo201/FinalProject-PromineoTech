import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [regNotification, setRegNotification] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = (username, password) => {

    onRegister(username, password);
    setRegNotification('Thanks for registering, now you can sign in');
    navigate("/login");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
        setRegNotification("Both username and password are required!");
        return;
      }

    handleRegister(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="register-container">
    {regNotification && <p className="reg-notification-error">{regNotification}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Register</h2>
        <input
          className="register-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input className="register-btn" type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
