import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function CheckOutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item className="m-2">
        {step1 ? (
          <Link style={{ color: "var(--primaryColor)" }} to="/login">
            Login-->
          </Link>
        ) : (
          <p style={{ color: "var(--black)" }} className="muted" disabled>
            Login -->
          </p>
        )}
      </Nav.Item>

      <Nav.Item className="m-2">
        {step2 ? (
          <Link style={{ color: "var(--primaryColor)" }} to="/shipping">
            Shipping-->
          </Link>
        ) : (
          <p style={{ color: "var(--black)" }} className="muted" disabled>
            Shipping -->
          </p>
        )}
      </Nav.Item>

      <Nav.Item className="m-2">
        {step3 ? (
          <Link style={{ color: "var(--primaryColor)" }} to="/payment">
            Payment-->
          </Link>
        ) : (
          <p style={{ color: "var(--black)" }} disabled className="muted">
            Payment -->
          </p>
        )}
      </Nav.Item>

      <Nav.Item className="m-2">
        {step4 ? (
          <Link style={{ color: "var(--primaryColor)" }} to="/placeorder">
            Place order
          </Link>
        ) : (
          <p style={{ color: "var(--black)" }} className="muted" disabled>
            Place order
          </p>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckOutSteps;
