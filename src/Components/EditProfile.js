import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const USER_PROFILE = "https://64c9ad71b2980cec85c25890.mockapi.io/userprofile";

function EditProfile({ users, updateUser }) {
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const foundUser = users.find((u) => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      setProfilePic(foundUser.profilePic);
      setBio(foundUser.bio);
    }
  }, [users, userId]);

  const handleEdit = () => {
    axios
      .put(`${USER_PROFILE}/${userId}`, { profilePic, bio })
      .then((resp) => {
        const updatedUser = { ...user, profilePic, bio };
        setUser(updatedUser);
        updateUser(updatedUser);
        setIsModalOpen(false);
        navigate(`/profile/${userId}`);
      })
      .catch((err) => {
        console.error(`There was an error updating the profile, ${err}`);
      });
  };

  return (
    <>
      <Button id="edit-profile-btn" onClick={() => setIsModalOpen(true)}>Edit Profile</Button>
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Profile Picture URL:</Form.Label>
              <Form.Control
                type="text"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Message:</Form.Label>
              <Form.Control
                as="textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProfile;
