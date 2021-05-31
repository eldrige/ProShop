import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc fetch all products
// @route GET /api/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
  //  how many products per page we want
  const pageSize = 2;
  const page = Number(req.query.pageNumber) || 1; // if pageNumber isnt included then we are on page one

  // req.query gets queries (?)
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  // get the total number of products
  const count = await Product.countDocuments({ ...keyword });
  // this will return products based on the pageSize we pass, that is if pageSize is 2, we will get two products
  const products = await Product.find({ ...keyword })
    .limit(pageSize) // limit by page size
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc fetch one products
// @route GET /api/products/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// @desc delete a product
// @route DELETE /api/products/:id
// @access private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// @desc Create a product
// @route POST /api/products/
// @access private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 100,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Create new review
// @route PUT /api/products/:id/review
// @access private/
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    // to check if a user has already reviewed a particular product
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      // 400 means bad request
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({
      message: 'Review Added',
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Update a product
// @route PUT /api/products/:id
// @access private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, description, category, countInStock, brand } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    (product.description = description),
      (product.category = category),
      (product.countInStock = countInStock);

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  createProductReview,
  updateProduct,
};

// ! controllers just encapsulate the logic
