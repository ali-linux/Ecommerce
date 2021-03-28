import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUserPlus,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userAction";
import { useHistory } from "react-router-dom";

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
            <input type="text" placeholder="Eg. Shirt, jeans" />
            <button type="submit">
              <FontAwesomeIcon
                icon={faSearch}
                style={{ color: "var(--primaryColor)" }}
              />
            </button>
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
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
