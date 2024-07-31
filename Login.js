// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token); // JWT 토큰 저장
        alert('로그인 성공');
        navigate('/'); // 로그인 성공 시 홈 페이지로 이동
      } else {
        const errorData = await response.text(); // JSON 형식이 아닐 수 있으므로 text()로 응답을 받음
        alert(`로그인 실패: ${errorData}`);
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Form onSubmit={handleSubmit} style={{ width: '30%' }}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>패스워드</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          로그인
        </Button>
      </Form>
    </div>
  );
};

export default Login;
