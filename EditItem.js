import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/items/${id}`);
        const item = response.data;
        setTitle(item.title);
        setPrice(item.price);
        setPublishDate(item.publishDate);
        setDescription(item.description);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/items/${id}`, {
        title,
        price: parseInt(price, 10),
        publishDate,
        description,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('아이템이 수정되었습니다!');
        navigate(`/detail/${id}`);
      }
    } catch (error) {
      console.error('아이템 수정 실패:', error);
      alert('아이템 수정에 실패했습니다.');
    }
  };

  return (
    <Container className="my-4">
      <h2>아이템 수정</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="아이템 제목 입력"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>가격</Form.Label>
          <Form.Control
            type="number"
            placeholder="아이템 가격 입력"
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
            placeholder="아이템 설명 입력"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          수정하기
        </Button>
      </Form>
    </Container>
  );
};

export default EditItem;