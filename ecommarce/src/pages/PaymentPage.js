import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";
import { savePaymentMethod } from "../actions/CartAction";

function PaymentPage({ history }) {
  const { shippingAddress } = useSelector((state) => state.cartList);
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  if (!shippingAddress.address) {
    history.push("/shipping");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          {" "}
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentPage;
