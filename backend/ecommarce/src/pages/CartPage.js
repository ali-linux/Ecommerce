import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Form,
  Image,
  Button,
  Card,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, deleteCart } from "../actions/CartAction";
import { url } from "../domainUrl";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CartPage({ match, Location, history }) {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cartList);
  const { cartItems } = carts;

  const removeCart = (id) => {
    dispatch(deleteCart(id));
  };

  const checkOut = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) history.push("/shipping");
    else history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
      <h1>Shopping Cart</h1>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message variant="info">
              You don't have any item in your cart
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid />
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(
                            addToCart(item.product, parseInt(e.target.value))
                          );
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeCart(item.product)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card style={{ padding: 20 }}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  SUBTOTAL( {cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                  ) ITEMS
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>

              <ListGroup.Item>
                <button
                  type="button"
                  className="btn-block btn-dark p-2"
                  disabled={cartItems.length === 0}
                  onClick={checkOut}
                >
                  Proceed to Checkout
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}

export default CartPage;
