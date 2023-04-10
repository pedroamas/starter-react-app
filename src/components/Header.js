import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header(props)  {
  return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">To-do list</Nav.Link>
              <Nav.Link href="/#/chess">Chess</Nav.Link>
              <Nav.Link href="/#/minesweeper">Minesweeper</Nav.Link>
              <Nav.Link href="/#/snake">Snake</Nav.Link>
              {/* <Nav.Link href="/freecell">FreeCell</Nav.Link> */}
              {/* <Nav.Link href="/streaming">Streaming</Nav.Link> */}
              {/* <Nav.Link href="/about">About</Nav.Link> */}
              
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
      </>
    );
}
 
export default Header;