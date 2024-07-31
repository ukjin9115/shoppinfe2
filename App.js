import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import SearchBar from './components/SearchBar';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import Register from './components/Register';
import Login from './components/Login';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const handleSearch = (search) => {
    setSearchText(search);
  };

  const location = useLocation();
  const hideComponents = ['/register'].includes(location.pathname);

  return (
    <div className='App'>
      <NavbarComponent />
      {!hideComponents && <div className="main-bg"></div>}
      {!hideComponents && <SearchBar onSearch={handleSearch} />}
      
      <Container>
        <Routes>
          <Route path="/" element={<ItemList searchText={searchText} />} />
          <Route path="/detail/:id" element={<ItemDetail />} />
          <Route path="/edit-item/:id" element={<EditItem />} />
          <Route path="*" element={<div>없는 페이지에요</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-item" element={<AddItem />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
