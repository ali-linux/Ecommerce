import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { signup } from "../actions/userAction";

function SignupPage({ Location, history }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
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
    if (password !== password2) {
      setMessage("Passwords do not match");
    } else {
      setMessage("");
      dispatch(signup(email, username, password, firstName, lastName));
    }
  };

  return (
    <FormContainer>
      <h1> Sign up </h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Spinner height="100" width="100" />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter a unique username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <Form.Group controlId="email">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Sign up
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          have an Account?
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default SignupPage;
