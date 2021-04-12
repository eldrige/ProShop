import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { getUserDetails, updateUserProfile } from '../actions/userActions.js';
import { userRegisterReducer } from '../reducers/userReducers.js';

const ProfileScreen = ({ history }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  console.log(userInfo);
  React.useEffect(() => {
    // since we dnt want loggedin users to see the signin screen
    if (!userInfo) {
      // redirect to sigin page
      history.push('/login');
    } else {
      if (!userInfo.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);
      }
    }
    return () => {};
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: userInfo._id, name, email, password }));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {/* {error && <Message variant="danger">{error}</Message>} */}
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {/* {loading && <Loader />} */}
        <Form onSubmit={submitHandler}>
          <Form.Group controlid="email">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlid="email">
            <Form.Label>Email Adrress</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlid="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlid="password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
