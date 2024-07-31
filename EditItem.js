// src/components/EditItem.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';

const EditItem = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [currentFile, setCurrentFile] = useState('');
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/items/${id}`);
        const { title, price, description, filePath } = response.data;
        setTitle(title);
        setPrice(price);
        setDescription(description);
        setCurrentFile(filePath);
      } catch (error) {
        console.error('아이템을 불러오는 데 실패했습니다:', error);
      }
    };
    fetchItem();
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);

    try {
      const response = await axios.put(`http://localhost:8080/items/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        alert('상품이 수정되었습니다!');
        navigate('/'); // 상품 목록 페이지로 이동
      }
    } catch (error) {
      console.error('상품 수정 실패:', error);
      alert('상품 수정에 실패했습니다.');
    }
  };

  return (
    <Container className="my-4">
      <h2>상품 수정</h2>
      {isLoggedIn ? (
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

          <Form.Group controlId="formFile">
            <Form.Label>이미지</Form.Label>
            {currentFile && (
              <div>
                <img src={`http://localhost:8080/${currentFile}`} alt="Current file" style={{ width: '100px', height: '100px' }} />
              </div>
            )}
            <Form.Control
              type="file"
              onChange={handleFileChange}
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
            수정하기
          </Button>
        </Form>
      ) : (
        <p>로그인 후에 수정할 수 있습니다.</p>
      )}
    </Container>
  );
};

export default EditItem;
