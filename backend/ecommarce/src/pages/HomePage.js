import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
// import products from "../products";
import { listProducts } from "../actions/ProductAction";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { Fragment } from "react";
import ProductCarousel from "../components/ProductCarousel";

// import Paginate from "../components/Paginate";

function HomePage({ history }) {
  const dispatch = useDispatch();
  const { error, products, loading, page, pages } = useSelector(
    (state) => state.ProductList
  );
  let keyword = history.location.search;
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);
  return (
    <div>
      <ProductCarousel />
      <h1 className="mt-3">Latest Products</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger"> {error} </Message>
      ) : (
        <Fragment>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </Fragment>
      )}
    </div>
  );
}

export default HomePage;
