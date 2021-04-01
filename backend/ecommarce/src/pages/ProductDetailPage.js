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
import { ProductDetails, createProductReview } from "../actions/ProductAction";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { addToCart } from "../actions/CartAction";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

function ProductDetailPage({ match, history }) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { error, product, loading } = useSelector(
    (state) => state.ProductDetails
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    error: errorReview,
    success: successReview,
    loading: loadingReview,
  } = useSelector((state) => state.productReviewCreate);

  useEffect(() => {
    if (successReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(ProductDetails(parseInt(match.params.id)));
  }, [match.params.id, dispatch, successReview]);

  const productId = match.params.id;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
    console.log("submit");
  };
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
        <div>
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
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
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
          <Row>
            <Col md={6}>
              <h4>Reviews</h4>
              {product.reviews.length === 0 && (
                <Message variant="info">No Reviews</Message>
              )}

              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating
                      value={review.rating}
                      color="#f8e825"
                      precision={0.5}
                      name="read-only"
                      readOnly
                      style={{ fontSize: 19, paddingTop: 2 }}
                    />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h4>Write a review</h4>

                  {loadingReview && <Spinner />}
                  {successReview && (
                    <Message variant="success">Review Submitted</Message>
                  )}
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment">
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        disabled={loadingReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      Please <Link to="/login">login</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </Fragment>
  );
}

export default ProductDetailPage;
