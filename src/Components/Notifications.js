import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NOTIFICATIONS_API =
  "https://64c9ad71b2980cec85c25890.mockapi.io/notifications";

const Notifications = ({ authenticated }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  const fetchNotifications = () => {
    axios
      .get(NOTIFICATIONS_API)
      .then((resp) => {
        setNotifications(resp.data);
      })
      .catch((err) => {
        console.error(`Error fetching notifications ${err}`);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="notification-container">
      <h1 className="notification-header">Notifications</h1>
      {notifications.map((notification) => (
        <div key={notification.id} className="notification-style">
          <p className="notification-text">
            <strong>{notification.username}</strong> {notification.type} your
            post at {notification.time}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
