// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        alert('회원가입에 성공했습니다.');
        navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
      } else {
        const errorData = await response.text(); // JSON 형식이 아닐 수 있으므로 text()로 응답을 받음
        alert(`회원가입에 실패했습니다: ${errorData}`);
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입에 실패했습니다.');
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
          <Form.Text className="text-muted">
            패스워드를 타인과 공유하지 마세요.
          </Form.Text>
        </Form.Group>


        <Button variant="primary" type="submit">
          가입하기
        </Button>
      </Form>
    </div>
  );
};

export default Register;
