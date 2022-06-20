import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { parseISO, formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { format, isAfter } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';

import {
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_UPDATE_RESET,
} from '../constants/productConstants';
import {
  listProductDetails,
  updateProduct,
  createProductReview,
} from '../actions/productActions';

const ProductScreen = ({ history, match }) => {
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successReview, error: errorReview } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const formatDate = (date) => {
    // let novelDate = parseISO(date);
    // let timePeriod = formatDistanceToNow(novelDate);
    // console.log(timePeriod);
    const parsedDate = new Date(date);
    return parsedDate.toDateString();

    // return format(parsedDate, 'MM/dd/yyyy');
  };

  const checkIfIsAbtToExpire = (dateToCompare) => {
    let today = new Date();
    // 28 => One Month
    let twoWeeksFromToday = today.setDate(today.getDate() + 28);
    let result = isAfter(twoWeeksFromToday, dateToCompare);
    return result;
  };

  const isAbtToExpire = checkIfIsAbtToExpire(product?.expiryDate);

  const handlePurchaseProduct = () => {
    const newCountInStock = product.countInStock - qty;
    dispatch(
      updateProduct({
        _id: product._id,
        countInStock: newCountInStock,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        description: product.description,
        category: product.category,
      })
    );
    toast("You've purchased the drug");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (successReview) {
      alert('Review submitted');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successReview]);

  const addToCartHandler = () => {
    // ? history.push just redirects to the given path
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/');
    }
  }, [successUpdate]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading || loadingUpdate ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {successUpdate && <Message>Drug Purchased</Message>}
          {isAbtToExpire && <Message variant="danger">soon expiring</Message>}
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Count : {product.countInStock}</ListGroup.Item>
                <ListGroup.Item>Price : {product.price} XAF</ListGroup.Item>
                <ListGroup.Item>
                  Description : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Expiry Date:</Col>
                      <Col>{formatDate(product?.expiryDate)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option value={x + 1} key={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={handlePurchaseProduct}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Purchase
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorReview && <Message>{errorReview}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please
                      <Link to="/login"> sign in </Link>
                      to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
