import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";

const POSTS_API = "https://64c9ad71b2980cec85c25890.mockapi.io/posts";

const CreatePost = ({ refreshPosts, authenticated }) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    } else {
      navigate("/CreatePost");
    }
  }, [authenticated, navigate]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    const time = new Date().toLocaleString();

    axios
      .post(POSTS_API, {
        username,
        caption,
        imageUrl,
        time,
      })
      .then((resp) => {
        console.log(resp);
        handleClose();
        refreshPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button
        className="create-post-btn"
        variant="primary"
        onClick={handleShow}>
        Create Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCaption">
              <Form.Label>Caption</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter caption"
                onChange={(e) => setCaption(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreatePost;
