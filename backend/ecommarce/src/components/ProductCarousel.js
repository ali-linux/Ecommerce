import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Spinner from "./Spinner";
import Message from "./Message";
import { listTopProducts } from "../actions/ProductAction";

function ProductCarousel() {
  const dispatch = useDispatch();

  const { error, loading, products } = useSelector(
    (state) => state.productTopRated
  );

  useEffect(() => {
    console.log(products);
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Spinner />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark" touch="true">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/products/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel.caption">
              <h4>
                {product.name} (${product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
