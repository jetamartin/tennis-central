import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import isNil from 'lodash/isNil';



const NavBar = token => {
  console.log("TOKEN VALUE = ", token);
  console.log("NavBar: Is token value nil ", isNil(token))

  // Lodash isNil checks whether an object's value is null or u
  const isLoggedIn = (!isNil(token)) ? true : false;
 
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">TennisCentral</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
         {isLoggedIn ?
          <Nav className="ml-auto">
          <Nav.Link href="Find-A-Partner">Find-a-partner</Nav.Link>
          <Nav.Link href="Partners">Partners</Nav.Link>
          <Nav.Link href="Messages">Messages</Nav.Link>
          <NavDropdown title="MyProfile" id="basic-nav-dropdown">
            <NavDropdown.Item href="AboutMe">About Me</NavDropdown.Item>
            <NavDropdown.Item href="SkillsPrefs">Skills & Prefs</NavDropdown.Item>
            <NavDropdown.Item href="MatchAvail">Match Availabilty</NavDropdown.Item>
         </NavDropdown>
         </Nav>
        //  User is not logged in
         :
         <Nav className="ml-auto">
         <Nav.Link href="login">Login</Nav.Link>
         <Nav.Link href="join">Join</Nav.Link>
       </Nav>
     
         }
    </Navbar.Collapse>
  </Navbar>
  )
}

export default NavBar;