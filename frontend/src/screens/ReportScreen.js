import React, { useEffect } from 'react';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { getProductStats } from '../actions/productActions';

const ReportScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const productStats = useSelector((state) => state.productStats);

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return parsedDate.toDateString();
  };

  const { loading, error, products, count, productTotalValue } = productStats;

  console.log(productStats, 'From report screen');

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const cart = useSelector((state) => state.cart);
  // calculate prices
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.ItemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice).toFixed(2));
  cart.totalPrice =
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice);

  useEffect(() => {
    dispatch(getProductStats());
  }, []);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  const calculatePercentageSold = (initialAmt, countInStock) => {
    let percentage = (countInStock / initialAmt) * 100;
    return percentage;
  };

  return (
    <>
      <Row>
        <Col md={10}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Report</h2>
              {/* <p>
                <strong>
                  
                </strong>
              </p> */}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Detailed Report</h2>
              {/* <ListGroup variant="flush">
                {!!products &&
                  products.map((product, idx) => (
                    <ListGroup.Item key={idx}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={product.image}
                            alt={product.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${product}`}>{product.name}</Link>
                        </Col>
                        <Col md={4}>
                          {product.countInStock} x {product.price} XAF ={' '}
                          {product.countInStock * product.price} XAF
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
              </ListGroup> */}
            </ListGroup.Item>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Number</th>
                  <th>Name</th>
                  <th>Reference</th>
                  <th>Price (XAF)</th>
                  <th>Initial Count</th>
                  <th>In Stock</th>
                  <th>Items Sold</th>
                  <th>Expiry Date</th>
                  <th>Percentage sold (%)</th>{' '}
                </tr>
              </thead>
              <tbody>
                {!!products &&
                  products.map((product, idx) => (
                    <tr key={product._id}>
                      {/* <td>{product._id.substr(1, 4)}</td> */}
                      <td>{idx + 1}</td>
                      <td>{product.name}</td>
                      <td>{product._id.split(0, 9)}</td>
                      <td>{product.price.toFixed(0)}</td>
                      <td>20</td>
                      <td>{product.countInStock}</td>
                      <td>{20 - product.countInStock}</td>
                      <td>{formatDate(product?.expiryDate)}</td>
                      <td>
                        {calculatePercentageSold(20, product?.countInStock)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ListGroup>
        </Col>
        <Col md={2}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Current Income</Col>
                  <Col> 75000 XAF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Expected Income</Col>
                  <Col>{productTotalValue}XAF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Drug count</Col>
                  <Col>{count}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Profit</Col>
                  <Col> 45 %</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                ></Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ReportScreen;
