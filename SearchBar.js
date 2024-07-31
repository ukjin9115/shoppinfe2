import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText);
    }
  };

  return (
    <div className="d-flex justify-content-center my-3">
      <InputGroup className="mb-3" style={{ width: '50%', height: '40px' }}>
        <Form.Control
          placeholder="무엇을 찾아드릴까요?"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <InputGroup.Text id="basic-addon2" onClick={handleSearch}>검색하기</InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
