import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import isNil from "lodash/isNil";
import { useHistory } from "react-router-dom";

const NavBar = ({ userInfo, logoutUser }) => {
  console.log('NAVBAR ===>', userInfo);
  
  const history = useHistory();

  // Lodash isNil checks whether an object's value is null or u
  const isLoggedIn = !isNil(userInfo) ? true : false;

  const logoutClicked = (e) => {
    logoutUser();
    history.push("/");
  
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/">TennisCentral</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {isLoggedIn ? (
          <Nav className="ml-auto">
            <Nav.Link href="Find-A-Partner">Find-a-partner</Nav.Link>
            <Nav.Link href="PartnerList">Partners</Nav.Link>
            <Nav.Link href="Messages">Messages</Nav.Link>
            <NavDropdown title="MyProfile" id="basic-nav-dropdown">
              <NavDropdown.Item href="AboutMe">About Me</NavDropdown.Item>
              <NavDropdown.Item href="SkillsPrefs">
                Skills & Prefs
              </NavDropdown.Item>
              <NavDropdown.Item href="MatchAvail">
                Match Availabilty
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link id="logout" onClick={logoutClicked} to="\">
              Logout {userInfo.username}
            </Nav.Link>
            {/* <NavLink id="logout" onClick={logoutClicked} to="\" >Log Out {username}</NavLink> */}
          </Nav>
        ) : (
          //  User is not logged in
          <Nav className="ml-auto">
            <Nav.Link href="login">Login</Nav.Link>
            <Nav.Link href="join">Join</Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
