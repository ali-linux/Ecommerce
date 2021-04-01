import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails, UpdateUser } from "../actions/userAction";
import { MESSAGE_SUCCESS } from "../reducers/userReducer";
import { USER_UPDATE_RESET } from "../constants/userConstants";
function UserEditPage({ match }) {
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector((state) => state.userDetails);
  const { success: successMessage } = useSelector((state) => state.message);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = useSelector((state) => state.userUpdate);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [message, setMessage] = useState("");
  const userId = match.params.id;
  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: USER_UPDATE_RESET,
      });
    } else {
      if (!user.name || user._id !== Number(userId)) {
        dispatch(getUserDetails(userId));
      } else {
        setUsername(user.username);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, userId, successUpdate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(UpdateUser({ _id: user._id, username, email, isAdmin }));
    dispatch({ type: MESSAGE_SUCCESS });
  };

  return (
    <div>
      <Link to="/admin/users">Go Back</Link>
      <FormContainer>
        <h1> Edit User </h1>
        {loadingUpdate && <Spinner />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {successMessage && (
          <Message variant="success">user Updated successfully</Message>
        )}
        {loading ? (
          <Spinner />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a unique username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <Form.Group controlId="isadmin">
              <Form.Label>Password </Form.Label>
              <Form.Check
                type="checkbox"
                label="is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              {" "}
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default UserEditPage;
