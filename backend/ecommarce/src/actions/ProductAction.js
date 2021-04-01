import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../constants/productConstants";
import { url } from "../domainUrl";

export const listProducts = (keyword = "") => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    const { data } = await axios.get(`${url}/api/products${keyword}`);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};

export const ProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`${url}/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const usr = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${usr.token}`,
      },
    };
    await axios.delete(`${url}/api/products/delete/${id}/`, config);
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.details,
    });
  }
};

export const createProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const usr = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${usr.token}`,
      },
    };
    const { data } = await axios.post(
      `${url}/api/products/create/`,
      {},
      config
    );
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.details,
    });
  }
};

export const updateProduct = (product) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const usr = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${usr.token}`,
      },
    };
    const { data } = await axios.put(
      `${url}/api/products/update/${product._id}/`,
      product,
      config
    );
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};

export const createProductReview = (id, review) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });

    const usr = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${usr.token}`,
      },
    };
    const { data } = await axios.post(
      `${url}/api/products/${id}/reviews/`,
      review,
      config
    );
    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_TOP_REQUEST,
    });
    const { data } = await axios.get(`${url}/api/products/top/`);
    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};
