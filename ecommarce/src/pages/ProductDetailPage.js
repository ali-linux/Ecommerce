import React, { Fragment, useState, useEffect } from "react";
// import products from "../products";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ProductDetails } from "../actions/ProductAction";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { addToCart } from "../actions/CartAction";

function ProductDetailPage({ match, history }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { error, product, loading } = useSelector(
    (state) => state.ProductDetails
  );

  useEffect(() => {
    dispatch(ProductDetails(parseInt(match.params.id)));
  }, [match.params.id, dispatch]);

  const productId = match.params.id;

  const addToCartHandler = () => {
    dispatch(addToCart(productId, qty));
    history.push(`/shoppingcart/`);
  };
  return (
    <Fragment>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Spinner></Spinner>
      ) : error ? (
        <Message variant="warning">
          {"The item you are looking for is not available"}
        </Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  precision={0.5}
                  name="read-only"
                  value={parseInt(product.rating)}
                  readOnly
                  style={{ fontSize: 19, paddingTop: 2 }}
                />
              </ListGroup.Item>

              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => {
                            console.log({ qty });
                            setQty(parseInt(e.target.value));
                            console.log({ qty });
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block bg-dark  "
                    disabled={product.countInStock === 0}
                    type="button"
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Fragment>
  );
}

export default ProductDetailPage;
