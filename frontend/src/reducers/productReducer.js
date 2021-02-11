import {
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';

// !reducers take the initial state, and the action
export const productListReducer = (state = { products: [] }, action) => {
  // ? evaluate type in the product object
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
