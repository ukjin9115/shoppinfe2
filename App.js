// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { AuthProvider } from './contexts/AuthContext';
import NavbarComponent from './components/NavbarComponent';
import SearchBar from './components/SearchBar';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import Register from './components/Register';
import Login from './components/Login';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import OrderPage from './components/OrderPage';
import OrderHistory from './components/OrderHistory';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState('');
  const handleSearch = (search) => {
    setSearchText(search);
  };
  const navigate = useNavigate();
  const location = useLocation();
  
  // Function to check if current path matches any of the given patterns
  const isHidePath = (pathname) => {
    // Patterns to hide components
    const hidePatterns = [
      '/register',
      '/login',
      '/order-history',
      /^\/detail\/\d+/, // Matches /detail/:id where :id is a number
      /^\/order\/\d+/   // Matches /order/:id where :id is a number
    ];
    return hidePatterns.some(pattern => {
      return typeof pattern === 'string' ? pathname === pattern : pattern.test(pathname);
    });
  };

  const hideComponents = isHidePath(location.pathname);

  return (
    <AuthProvider>
      <div className='App'>
        <NavbarComponent />
        {!hideComponents && <div className="main-bg"></div>}
        {!hideComponents && <SearchBar onSearch={handleSearch} />}
        {!hideComponents &&<Button variant="success" style={{marginLeft: "80%"}}
         onClick={() => navigate('/add-item')}>판매하기</Button>}
        <Container style={{marginTop:"30px"}}>
          <Routes>
            <Route path="/" element={<ItemList searchText={searchText} />} />
            <Route path="/detail/:id" element={<ItemDetail />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/order-history" element={<OrderHistory/>} />
            <Route path="/edit-item/:id" element={<EditItem />} />
            <Route path="*" element={<div>없는 페이지에요</div>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-item" element={<AddItem />} />
          </Routes>
        </Container>
      </div>
    </AuthProvider>
  );
}

export default App;
