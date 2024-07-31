import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Outlet } from 'react-router-dom'

const NavbarComponent = () => {
  let navigate = useNavigate()
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">욱진Mall</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=> {navigate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={()=> {navigate('/')}}>Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Navbar.Brand href="/login">로그인하기</Navbar.Brand>


      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
