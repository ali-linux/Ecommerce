import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkContainer } from "react-router-bootstrap";

import {
  faSearch,
  faShoppingCart,
  faUserPlus,
  faUser,
  faUsers,
  faBoxes,
  faSignOutAlt,
  faShippingFast,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userAction";
import { useHistory } from "react-router-dom";
import SearchBox from "./SearchBox";
function Header() {
  let history = useHistory();
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    history.push("/");
    dispatch(logout());
  };

  return (
    <header style={{ background: "#333", color: "white" }}>
      <nav>
        <div className="container">
          <div className="rightSection">
            <Link to="/">
              <span className="primarySpan">Ku</span>Commerce
            </Link>
          </div>
          <div className="middleSection">
            {" "}
            <SearchBox />{" "}
          </div>
          <div className="leftSection">
            <div className="cart">
              <Link to="/shoppingcart">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{ color: "var(--primaryColor)" }}
                />
              </Link>
            </div>
            {userInfo ? (
              <Fragment>
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                  style={{ textTransform: "capitalize" }}
                >
                  <Link
                    className="profile"
                    style={{
                      width: "160px",
                      padding: "10px 25px",
                    }}
                    to="/profile"
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ marginRight: 5, color: "var(--primaryColor)" }}
                    />
                    Profile
                  </Link>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      style={{ marginRight: 5, color: "var(--primaryColor)" }}
                    />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Fragment>
            ) : (
              <Fragment>
                <div className="login">
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ marginRight: 5, color: "var(--primaryColor)" }}
                  />
                  <Link to="/login">Login</Link>
                </div>
                <div className="signUp ">
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    style={{ marginRight: 5, color: "var(--primaryColor)" }}
                  />
                  <Link to="/signup">Sign up</Link>
                </div>
              </Fragment>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown
                title="Admin"
                id="username"
                style={{
                  width: "160px",
                  padding: "10px 25px",
                  textTransform: "capitalize",
                }}
                // onClick={() => dis(display)}
                // onClick={dis}
              >
                <Link
                  className="profile"
                  style={{
                    width: "160px",
                    padding: "10px 25px",
                  }}
                  to="/admin/users"
                >
                  <FontAwesomeIcon
                    className="icon"
                    icon={faUsers}
                    style={{ marginRight: 5, color: "var(--primaryColor)" }}
                  />
                  Users
                </Link>
                <Link
                  className="profile"
                  style={{
                    width: "160px",
                    padding: "10px 25px",
                  }}
                  to="/admin/products"
                >
                  <FontAwesomeIcon
                    className="icon"
                    icon={faBoxes}
                    style={{ marginRight: 5, color: "var(--primaryColor)" }}
                  />
                  products
                </Link>
                <Link
                  className="profile"
                  style={{
                    width: "160px",
                    padding: "10px 25px",
                  }}
                  to="/admin/orders"
                >
                  <FontAwesomeIcon
                    className="icon"
                    icon={faShippingFast}
                    style={{ marginRight: 5, color: "var(--primaryColor)" }}
                  />
                  Orders
                </Link>
              </NavDropdown>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
