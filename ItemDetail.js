import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

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
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
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
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://localhost:8080/comments/create/${id}`, { content: newComment }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewComment("");
      setComments([...comments, response.data]); // Add new comment to state
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
      setComments(comments.filter(comment => comment.id !== commentId)); // Remove deleted comment from state
    } catch (error) {
      console.error('Error deleting comment:', error);
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

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8080/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      <Alert variant="success">
      <Alert.Heading>아이템추가 성공!</Alert.Heading>
      <p>
        Aww yeah, you successfully read this important alert message. This
        example text is going to run a bit longer so that you can see how
        spacing within an alert works with this kind of content.
      </p>
      <hr />
      <p className="mb-0">
        Whenever you need to, be sure to use margin utilities to keep things
        nice and tidy.
      </p>
    </Alert>
      navigate('/');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('아이템 삭제에 실패했습니다.');
    }
  };

  const handleEdit = () => {
    navigate(`/edit-item/${id}`);
  };

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <img src={imageUrl} width="100%" alt={item.title} style={imageStyle} />
        </Col>
        <Col md={6}>
          <h2>{item.title}</h2>
          <p>{item.price}원</p>
          <p>판매자: {item.author?.username}</p> {/* Display author information */}
          <button className="btn btn-danger">주문하기</button>
          <p>{item.description}</p>

          {isLoggedIn && (
            <>
              <Button variant="primary" onClick={handleEdit}>✏️ 수정</Button>
              <Button variant="danger" onClick={handleDelete}>🗑️ 삭제</Button>
            </>
          )}

          <h3>댓글</h3>
          <div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="4"
              cols="50"
            />
            <Button variant="primary" onClick={handleAddComment}>댓글 작성</Button>
          </div>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                <strong>{comment.username}: </strong>
                {comment.content}
                {isLoggedIn && (
                  <Button variant="danger" size="sm" onClick={() => handleDeleteComment(comment.id)}> 삭제</Button>
                )}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemDetail;
