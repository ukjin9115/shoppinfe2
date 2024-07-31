import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const AddItem = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/items', {
        title,
        price: parseInt(price, 10),
        publishDate,
        description,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('상품이 추가되었습니다!');
        navigate('/'); // 상품 목록 페이지로 이동
      }
    } catch (error) {
      console.error('상품 추가 실패:', error);
      alert('상품 추가에 실패했습니다.');
    }
  };

  return (
    <Container className="my-4">
      <h2>상품 추가</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="상품 제목 입력"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>가격</Form.Label>
          <Form.Control
            type="number"
            placeholder="상품 가격 입력"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

       
        <Form.Group controlId="formDescription">
          <Form.Label>설명</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="상품 설명 입력"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          추가하기
        </Button>
      </Form>
    </Container>
  );
};

export default AddItem;