import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom'; // useParams import 추가
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const ItemDetail = () => {
  const { id } = useParams(); // URL 파라미터에서 아이템 ID를 추출합니다.
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:8080/items/${id}`)
      .then(response => response.json())
      .then(data => setItem(data))
      .catch(error => console.error('Error fetching item:', error));
  }, [id]);
  if (!item) return <div>그런아이템 없음</div>;

  const defaultImage = 'https://via.placeholder.com/150';
  const imageUrl = item.filePath ? `http://localhost:8080/uploads/${item.filePath}` : defaultImage;
  const imageStyle = {
    width: '400px',
    height: '400px',
    objectFit: 'cover',
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/items/${id}`);
      alert('아이템이 삭제되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('아이템 삭제에 실패했습니다.');
    }
  };

  const handleEdit = () => {
    navigate(`/edit-item/${id}`);
  };

  if (!item) {
    return <div>로딩 중...</div>;
  }
  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <img src={imageUrl} width="100%" alt={item.title} style={imageStyle} />
        </Col>
        <Col md={6}>
          <h2>{item.title}</h2>
          <p>{item.price}원</p>
          <button className="btn btn-danger">주문하기</button> 
          <p>{item.description}</p>

          <Button variant="primary" onClick={handleEdit}>✏️ 수정</Button>
          <Button variant="danger" onClick={handleDelete}>🗑️ 삭제</Button>
        </Col>
      </Row>
    </Container>
  );
};
  

export default ItemDetail;
