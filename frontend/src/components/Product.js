import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Card.Title as="div">
            <strong>
              Count:{' '}
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              >
                {product.countInStock}
              </span>
            </strong>
          </Card.Title>
        </Card.Text>

        <Card.Text as="h3">{product.price.toFixed(0)} XAF</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
