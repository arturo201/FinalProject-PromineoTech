import React, { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";

const NavBar = ({ onLogout }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Navbar id="navbar" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>MicroBlog</Navbar.Brand>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link to="/">Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/posts">
            <Nav.Link>Posts</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/notifications">
            <Nav.Link>Notifications</Nav.Link>
          </LinkContainer>
          <button className="signout-btn" onClick={onLogout}>
            Sign Out
          </button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
