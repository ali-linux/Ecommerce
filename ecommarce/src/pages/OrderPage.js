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
import { PayPalButton } from "react-paypal-button-v2";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { url } from "../domainUrl";
import { getOrderDetails, payOrder } from "../actions/OrderAction";
import Spinner from "../components/Spinner";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

function OrderPage({ match }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { success: successPay, loading: loadingPay } = useSelector(
    (state) => state.orderPay
  );

  if (!loading && !error) {
    order.ItemsPrice = order.orderItems
      .reduce((acc, item) => Number(acc + item.price * item.qty), 0)
      .toFixed(2);
  }
  // AdRQIbZWaarj_yDJQEbnAlPTDuewkj6kZPK33EwpGVpUD8Lut-k27wT8Sr0ofSndxsv9nXq4TzzoR1Uu
  const [sdkReady, setSdkReady] = useState(false);
  const addPayPallScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AdRQIbZWaarj_yDJQEbnAlPTDuewkj6kZPK33EwpGVpUD8Lut-k27wT8Sr0ofSndxsv9nXq4TzzoR1Uu";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  useEffect(() => {
    if (!order || successPay || order._id !== Number(orderId)) {
      dispatch(getOrderDetails(orderId));
      dispatch({ type: ORDER_PAY_RESET });
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPallScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
    dispatch(getOrderDetails(orderId));
  };
  return loading ? (
    <Spinner />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong> Shipping:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}
                {"  "}
                {order.shippingAddress.postalCode}
                {"  "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  {" "}
                  Delivered on ${order.deliveredAt}
                </Message>
              ) : (
                <Message variant="info"> Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="info">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
                  <Col>${order.ItemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Spinner />}
                  {!sdkReady ? (
                    <Spinner />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
            <div className="paypal-button"></div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderPage;
