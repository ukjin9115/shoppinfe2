// src/components/ItemDetail.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };
    fetchItem();
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/comments/item/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (newComment.length > 200) {
      alert('댓글은 최대 200자까지 입력할 수 있습니다.');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://localhost:8080/comments/create/${id}`, { content: newComment }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewComment("");
      setComments([...comments, response.data]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8080/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8080/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  const handleOrder = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(`/order/${id}`);
    } else {
      navigate('/login');
    }
  };

  if (!item) return <div>그런 아이템 없음</div>;

  const defaultImage = 'https://via.placeholder.com/150';
  const imageUrl = item.filePath ? `http://localhost:8080/${item.filePath}` : defaultImage;
  const imageStyle = {
    width: '400px',
    height: '400px',
    objectFit: 'cover',
  };

  return (
    <div>
      <Container className="my-4">
        <Row>
          <Col md={6}>
            <img src={imageUrl} width="100%" alt={item.title} style={imageStyle} />
          </Col>
          <Col md={6}>
            <h2>{item.title}</h2>
            <p>{item.price}원</p>
            <p>판매자: {item.author?.username}</p>
            
            <p>{item.description}</p>

            {isLoggedIn && (
              <>
                <Button variant="primary" onClick={handleEdit}>✏️ 수정</Button>
                <Button variant="danger" onClick={handleDelete}>🗑️ 삭제</Button>
              </>
            )}
          </Col>
          <Button variant="outline-dark"  onClick={handleOrder}>주문하기</Button>
        </Row>
      </Container>

      <Container className="my-4">
        <h3 style={{ textAlign: 'left' }}>리뷰</h3>
        <div>
          {isLoggedIn && (
            <InputGroup className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="리뷰를 작성해주세요! (최대100자)"
                aria-label="댓글 입력"
                rows={2}
                maxLength={100}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button variant="primary" onClick={handleAddComment}>
                리뷰 등록
              </Button>
            </InputGroup>
          )}
          <ListGroup as="ol" numbered>
            {comments.map(comment => (
              <ListGroup.Item
                as="li"
                key={comment.id}
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{comment.username}</div>
                  {comment.content}
                </div>
                {isLoggedIn && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    삭제
                  </Button>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Container>
    </div>
  );
};

export default ItemDetail;
