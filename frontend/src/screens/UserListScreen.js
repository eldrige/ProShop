import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { listUsers, deleteUser } from '../actions/userActions';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);

  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const deleteHandler = (id) => {
    if (window.confirm('sure about this ?')) {
      dispatch(deleteUser(id));
    }
  };

  const fakeNumbers = [
    '673-15-96-85',
    '698-98-37-40',
    '622-90-32-11',
    '623-11-22-75',
  ];

  useEffect(() => {
    // dispatch list all users, only if user is loggedin and is admin
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userInfo]);

  return (
    <>
      <h1>Suppliers</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>TEL</th>
              <th>LOCATION</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>{' '}
                </td>
                <td>{fakeNumbers[idx]}</td>
                <td>Douala</td>
                <td>
                  {'laurellelyvia@gmail.com' === user.email ? (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  ) : (
                    <i
                      className="fas fa-check cursor-pointer"
                      style={{ color: 'green' }}
                    ></i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
