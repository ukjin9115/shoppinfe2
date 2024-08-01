// src/components/OrderPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const OrderPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch item details
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/items/${id}`);
        setItem(response.data);
        setTotalPrice(response.data.price);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };
    fetchItem();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10)); // Prevent negative values and ensure a minimum of 1
    setQuantity(value);
    setTotalPrice(item.price * value);
  };

  const handleOrder = async () => {
    // Handle order logic here
    console.log('Order placed:', { itemId: id, quantity });
  };

  if (!item) return <div>Loading...</div>;

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <img src={`http://localhost:8080/${item.filePath}`} width="100%" alt={item.title} style={{ width: '400px', height: '400px', objectFit: 'cover' }} />
        </Col>
        <Col md={6}>
          <h2>{item.title}</h2>
          <p>가격: {item.price}원</p>
          <Form>
            <Form.Group controlId="quantity">
              <Form.Label>수량</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                min="1"
                onChange={handleQuantityChange}
              />
            </Form.Group>
            <h4>총 금액: {totalPrice}원</h4>
            <Button variant="primary" onClick={handleOrder}>주문하기</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPage;
