// src/components/NavbarComponent.js
import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const NavbarComponent = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentIsLoggedIn, setCurrentIsLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    setCurrentIsLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleOrderHistoryClick = () => {
    if (currentIsLoggedIn) {
      navigate('/order-history');
    } else {
      navigate('/login');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" className="sticky-navbar">
      <Container>
        <Navbar.Brand href="/">욱진Mall</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          {currentIsLoggedIn && (
            <Nav.Link onClick={handleOrderHistoryClick}>주문내역</Nav.Link>
          )}
        </Nav>
        {currentIsLoggedIn ? (
          <Nav>
            <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link href="/login">로그인하기</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
