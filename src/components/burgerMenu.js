import React from 'react';

import { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';


const BurgerMenu = () => {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Arthur Frost</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/Home">Timeline</Nav.Link>
            <Nav.Link href="/AboutComponent">About</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Groups</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#events">Events</Nav.Link>
            <Nav.Link eventKey={2} href="#teachings">Teachings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };
  
  export default BurgerMenu;