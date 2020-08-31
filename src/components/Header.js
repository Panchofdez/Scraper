import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../store/actions/auth";

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.token);
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand>Job Scraper</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/favorites">Favorites</Nav.Link>
          </Nav>
          {userToken ? (
            <Nav>
              <Nav.Link
                onClick={() => {
                  dispatch(signout());
                  history.push("/");
                  window.location.reload();
                }}
              >
                Signout
              </Nav.Link>
            </Nav>
          ) : (
            <>
              <Nav>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withRouter(Header);
