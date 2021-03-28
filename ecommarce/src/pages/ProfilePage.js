import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { userUpdate } from "../actions/userAction";
import { getOrders } from "../actions/OrderAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
function ProfilePage({ history }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { error, loading, userInfo } = useSelector((state) => state.userLogin);
  const { loading: loadingOrders, error: errorOrders, orders } = useSelector(
    (state) => state.orderList
  );
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getOrders());
      setUsername(userInfo.username);
      setEmail(userInfo.email);
      setFirstName(userInfo.first_name);
      setLastName(userInfo.last_name);
    }
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    // if (password !== password2) {
    //   setMessage("Passwords do not match");
    // } else {
    //   setMessage("");
    // }
    dispatch(userUpdate(firstName, lastName, password));
    // const a = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(a.token);
    setUsername(userInfo.username);
    setEmail(userInfo.email);
    setFirstName(userInfo.first_name);
    setLastName(userInfo.last_name);
  };

  return (
    <Row>
      <Col md={4} sm={6} className="py-3">
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              disabled
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email </Form.Label>
            <Form.Control
              type="email"
              disabled
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="first-name">
            <Form.Label>First name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="last-name">
            <Form.Label>Last Name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password1">
            <Form.Label>Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password2">
            <Form.Label>Confirm password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            {" "}
            Update
          </Button>
        </Form>
      </Col>
      <Col md={8} sm={6} className="py-3">
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Spinner />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimes}
                        style={{ color: "red" }}
                      />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfilePage;
