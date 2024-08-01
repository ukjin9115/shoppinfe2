import React from 'react';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const CardComponent = ({ item, index }) => {
  const defaultImage = 'https://via.placeholder.com/150'; // Placeholder image
  const imageUrl = item.filePath ? `http://localhost:8080/${item.filePath}` : defaultImage;

  const cardStyle = {
    position: 'relative',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '20px',
  };

  const imageStyle = {
    width: '340px',
    height: '300px',
    objectFit: 'cover',
  };

  const numberStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  };

  return (
    <Col md={4} className="mb-4">
      <div style={cardStyle}>
        <Link to={`/detail/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={numberStyle}>{index + 1}</div>
          <img src={imageUrl} alt={item.title} style={imageStyle} />
          <div style={{ padding: '10px' }}>
            <h4 style={{ marginTop: '10px', fontSize: '1.3rem' }}>{item.title}</h4>
            <p style={{ margin: 0, fontWeight: 'bold' }}>{item.price.toLocaleString()}원</p>
            <p style={{marginTop:'15px'}}>판매자: {item.author?.username}</p> {/* Display author information */}
          </div>
        </Link>
      </div>
    </Col>
  );
};

export default CardComponent;
