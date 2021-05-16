import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
} from '../constants/orderConstants';
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
  //? we can get our user token, from user info which is found in the getState
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  //? we can get our user token, from user info which is found in the getState
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
