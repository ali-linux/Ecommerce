import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userAction";

function LoginPage({ Location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const redirect = Location ? Location.search.split("=")[1] : "/";
  const { error, loading, userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    console.log({ password }, { email });
  };

  return (
    <FormContainer>
      <h1> Login </h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Spinner height="100" width="100" />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          {" "}
          Login
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Don't have an Account?
          <Link to={redirect ? `/signup?redirect=${redirect}` : "/signup"}>
            Sign Up
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginPage;
