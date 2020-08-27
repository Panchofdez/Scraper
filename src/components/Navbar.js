import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { signout } from "../store/actions/auth";

const Header = () => {
  const userToken = useSelector((state) => state.auth.token);
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand>Job Scraper</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/history">History</Nav.Link>
          </Nav>
          {userToken ? (
            <Nav>
              <Nav.Link href="/" onClick={() => signout()}>
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

export default Header;
