import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Card,
  Image,
} from 'react-bootstrap';
import { addToCart } from '../actions/cartActions';

// !location is used to get query strings
const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;

  // ? this will help us get our qty param
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;


  //*  ?qty=1 , the above logic is to extract just the number

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return <div>Hello</div>;
};

export default CartScreen;
