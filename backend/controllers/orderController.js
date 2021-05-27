import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc Create new Order
// @route POST /api/orders
// @access private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    //   400 means bad request
    // this  means that if there is nothing in the cart, return "No order items"
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    return res.status(201).json(createdOrder);
  }
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access private
const getOrderById = asyncHandler(async (req, res) => {
  // * the populate method is to extract the nested mongo objects from our Model
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      // the fllwin data is returned from the paypal api
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc Get loggedIn user orders
// @route GET /api/orders/myorders
// @access private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
  });

  res.json(orders);
});

// @desc Get All user orders
// @route GET /api/orders/allorders
// @access private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
};

// ! controllers just encapsulate the logic
