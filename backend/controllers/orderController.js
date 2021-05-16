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

export { addOrderItems };

// ! controllers just encapsulate the logic
