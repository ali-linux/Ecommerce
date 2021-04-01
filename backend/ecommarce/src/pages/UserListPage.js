import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { getUsers, deleteUser } from "../actions/userAction";
import { USER_DELETE_RESET } from "../constants/userConstants";
import { MESSAGE_FAIL } from "../reducers/userReducer";

function UserListPage({ history }) {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.userList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: successDelete } = useSelector((state) => state.userDelete);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user")) {
      dispatch(deleteUser(id));
      dispatch({ type: USER_DELETE_RESET });
    }
  };
  useEffect(() => {
    dispatch({ type: MESSAGE_FAIL });
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, successDelete]);
  return (
    <div>
      <h1>USERS</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/user/${user._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit" style={{ color: "black" }}></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash" style={{ color: "black" }}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserListPage;
