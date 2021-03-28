import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";
import { placeOrderFunc, clearCart } from "../actions/CartAction";
import { url } from "../domainUrl";
import { createOrder } from "../actions/OrderAction";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

function PlaceOrderPage({ history }) {
  const { order, error, success, loading } = useSelector(
    (state) => state.orderCreate
  );

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartList);
  cart.ItemsPrice = cart.cartItems
    .reduce((acc, item) => Number(acc + item.price * item.qty), 0)
    .toFixed(2);

  cart.shippingPrice = Number(cart.ItemsPrice > 100 ? 0 : 10).toFixed(2);
  cart.TaxPrice = Number(cart.ItemsPrice * 0.02).toFixed(2);
  cart.totalPrice = (
    Number(cart.ItemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.TaxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({
        type: ORDER_CREATE_RESET,
      });
      dispatch({
        type: CART_CLEAR_ITEMS,
      });
    }
  }, [success, history]);

  const placeOrder = (e) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        ItemsPrice: cart.ItemsPrice,
        taxPrice: cart.TaxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
    console.log("placed order");
  };
  return (
    <div>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong> Shipping:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                {"  "}
                {cart.shippingAddress.postalCode}
                {"  "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={`${url}${item.image}`}
                            alt={item.name}
                            width="50px"
                            height="50px"
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total items price:</Col>
                  <Col>${cart.ItemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.TaxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block btn-dark"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderPage;
