import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/CartReducer";
import {
  userLoginReducer,
  userDetailsReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  message,
} from "./reducers/userReducer";
import {
  ProductListReducer,
  ProductDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  ProductTopRatedReducer,
} from "./reducers/ProductReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderList,
  allOrderListReducer,
  orderDeliverReducer,
} from "./reducers/OrderReducers";
const reducer = combineReducers({
  ProductList: ProductListReducer,
  ProductDetails: ProductDetailsReducer,
  cartList: cartReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  message,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  allOrders: allOrderListReducer,
  orderDeliver: orderDeliverReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: ProductTopRatedReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : null;
const PaymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cartList: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: PaymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
