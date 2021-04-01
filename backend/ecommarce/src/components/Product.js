import React from "react";
import { Card } from "react-bootstrap";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
function Product({ product }) {
  return (
    <Card className="my-3 m- p-3 rounded" style={{ minHeight: 450 }}>
      <Link to={`products/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`products/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div
            className="my-3"
            style={{
              color: "var(--muted)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Rating
              precision={0.5}
              name="read-only"
              value={parseInt(product.rating)}
              readOnly
              style={{ fontSize: 19, paddingTop: 2 }}
            />
            <span style={{ margin: 0, marginLeft: 7 }}>
              {product.numReviews} Reviews
            </span>
          </div>
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
