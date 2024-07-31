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

    const response = await fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        displayName,
      }),
    });

    if (response.ok) {
      // navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
      alert('회원가입에 성공했습니다.');
      navigate('/login');
    } else {
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
          />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>패스워드</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">
            패스워드를 타인과 공유하지 마세요.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDisplayName">
          <Form.Label>닉네임</Form.Label>
          <Form.Control
            type="text"
            placeholder="Display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          가입하기
        </Button>
      </Form>
    </div>
  );
};

export default Register;
