import React, { Fragment, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/ProductAction";
import { MESSAGE_FAIL } from "../reducers/userReducer";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function ProductListPage({ history, match }) {
  const dispatch = useDispatch();
  const { loading, error, products, pages, page } = useSelector(
    (state) => state.ProductList
  );
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.productDelete);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = useSelector((state) => state.productCreate);
  const { userInfo } = useSelector((state) => state.userLogin);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    // console.log("Are you sure you want to delete this user");
    dispatch(createProduct());
  };

  let keyword = history.location.search;
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    dispatch({ type: MESSAGE_FAIL });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}`);
    } else {
      dispatch(listProducts(keyword));
    }
  }, [
    dispatch,
    userInfo,
    history,
    successDelete,
    successCreate,
    createdProduct,
    keyword,
  ]);
  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>

        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Spinner />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Spinner />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <LinkContainer to={`/admin/product/${product._id}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </div>
      )}
    </div>
  );
}

export default ProductListPage;
