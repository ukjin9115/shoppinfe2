// src/components/OrderPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    try {
      const token = localStorage.getItem('token'); // Assuming you store the JWT in localStorage
      const response = await axios.post(
        'http://localhost:8080/orders/create',
        { itemId: id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('주문이 접수되었습니다.');
      navigate('/order-history'); // Redirect to the order history page
    } catch (error) {
      console.error('Error placing order:', error);
      alert('주문접수에 실패했습니다.');
    }
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
            <h4>총 금액: {totalPrice.toLocaleString()}원</h4>
            <Button variant="primary" onClick={handleOrder}>주문하기</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPage;
