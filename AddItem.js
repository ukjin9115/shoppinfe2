import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const AddItem = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);

    const token = localStorage.getItem('token'); // 토큰 가져오기

    try {
      const response = await axios.post('http://localhost:8080/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}` // 인증 헤더 추가
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
        {/* Form contents */}
      </Form>
    </Container>
  );
};

export default AddItem;
