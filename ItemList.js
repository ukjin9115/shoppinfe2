import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import CardComponent from './CardComponent';
import axios from 'axios';

const ItemList = ({ searchText }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems(searchText);
  }, [searchText]);

  const fetchItems = async (search = '') => {
    const url = search
      ? `http://localhost:8080/items?title=${search}`
      : 'http://localhost:8080/items';

    try {
      const response = await axios.get(url);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Row>
      {items.map((item, i) => (
        <CardComponent item={item} key={i} index={i} />
      ))}
    </Row>
  );
};

export default ItemList;
