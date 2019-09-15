import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Header.css';
function Header() {
    return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">UFree</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/myProfile">My profile</Nav.Link>
          <Nav.Link href="/ingreso">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    
  
  
    );
  }

  export default Header;
