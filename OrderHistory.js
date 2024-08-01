// src/components/OrderHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Fetched orders:', response.data); // 추가된 로그
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-4">
      <h2>주문내역</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>주문번호</th>
              <th>상품명</th>
              <th>수량</th>
              <th>총액</th>
              <th>주문날짜</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.item?.title || 'N/A'}</td> {/* 데이터가 없을 경우 'N/A' 표시 */}
                <td>{order.quantity}</td>
                <td>{order.totalPrice.toLocaleString() || 'N/A'}원</td> {/* 데이터가 없을 경우 'N/A' 표시 */}
                <td>{order.orderDate ? new Date(order.orderDate).toLocaleString() : 'N/A'}</td> {/* 데이터가 없을 경우 'N/A' 표시 */}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default OrderHistory;
