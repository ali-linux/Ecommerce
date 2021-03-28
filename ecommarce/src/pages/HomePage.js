import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
// import products from "../products";
import { listProducts } from "../actions/ProductAction";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

function HomePage() {
  const dispatch = useDispatch();
  const { error, products, loading } = useSelector(
    (state) => state.ProductList
  );
  useEffect(() => {
    dispatch(listProducts());
  }, []);
  return (
    <div>
      <h1 className="mt-3">Latest Products</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger"> {error} </Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomePage;
