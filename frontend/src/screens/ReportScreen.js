import React, { useEffect } from 'react';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Table,
  Accordion,
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

  const currentBalance = 245000 - +productTotalValue;

  const profit = (currentBalance / 245000) * 100;

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

  const calculatePercentageSold = (countInStock, initialAmt) => {
    let percentage = (countInStock / initialAmt) * 100;
    return 100 - percentage;
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Report</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Detailed Report</h2>
            </ListGroup.Item>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Reference</th>
                  <th>Price (XAF)</th>
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
                      <td>{product.countInStock}</td>
                      <td>{10 - product.countInStock}</td>
                      <td>{formatDate(product?.expiryDate)}</td>
                      <td>
                        {calculatePercentageSold(product?.countInStock, 10)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <div>
            <h4>Expected Income</h4>
            <p>This represents the sum of all the initial stock</p>
          </div>
          <div>
            <h4>Current Income</h4>
            <p>This represents the sum of all the articles sold</p>
          </div>
          <div>
            <h4>Profit</h4>
            <p>
              The profit is a function of the current income versus the expected
              income
            </p>
          </div>
        </Col>
        <Col md={6}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="text-center">Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Current Income</Col>
                  <Col>{currentBalance} XAF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Expected Income</Col>
                  <Col>245000 XAF</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Profit</Col>
                  <Col> {profit} %</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item></ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Download PDF
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ReportScreen;
