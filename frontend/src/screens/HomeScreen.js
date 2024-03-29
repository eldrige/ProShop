import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel';

// ! firing off the action, then using the selector to get the state

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  // *useSelector taks our global state, make sure u use the sm name, defined in your state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    // * dispatch calls, our actions
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Drugs</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
