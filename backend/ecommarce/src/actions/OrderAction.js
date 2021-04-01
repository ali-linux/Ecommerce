import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import axios from "axios";
import { url } from "../domainUrl";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const usr = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${usr.token}`,
      },
    };
    const { data } = await axios.post(`${url}/api/add/order`, order, config);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const usr = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${usr.token}`,
      },
    };
    const { data } = await axios.get(`${url}/api/order/${id}`, config);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const usr = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${usr.token}`,
      },
    };
    const { data } = await axios.put(
      `${url}/api/order/${id}/pay`,
      paymentResult,
      config
    );
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.message,
    });
  }
};

export const getOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const usr = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${usr.token}`,
      },
    };
    const { data } = await axios.get(`${url}/api/order/myorders`, config);
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.message,
    });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const usr = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${usr.token}`,
      },
    };
    const { data } = await axios.get(`${url}/api/orders`, config);
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.message,
    });
  }
};

export const deliverOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const usr = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${usr.token}`,
      },
    };
    const { data } = await axios.put(
      `${url}/api/order/delivered/${id}`,
      {},
      config
    );
    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.message,
    });
  }
};
