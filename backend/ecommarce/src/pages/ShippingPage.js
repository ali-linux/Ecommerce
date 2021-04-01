import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";
import { saveShippingAddress } from "../actions/CartAction";
function ShippingPage({ history }) {
  const { shippingAddress } = useSelector((state) => state.cartList);
  const [address, setAddress] = useState(
    shippingAddress ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress ? shippingAddress.postalCode : ""
  );
  const [country, setCountry] = useState(
    shippingAddress ? shippingAddress.country : ""
  );
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <h1 className="py-3">Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="City">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter City"
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="PostalCode">
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter PostalCode"
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="Country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Country"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingPage;
