import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
} from './reducers/orderReducers';

// ! whenever you create a reducer, import it to ur store
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// const userDetailsFromStorage = localStorage.getItem('userDetails')
//   ? JSON.parse(localStorage.getItem('userDetails'))
//   : null;

const shippingAddresFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const middleware = [thunk];

// * our base initial state
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddresFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  // userDetails: userDetailsFromStorage,
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
