import React from "react";
import Header from "./components/Header";
import { HashRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import UserListPage from "./pages/UserListPage";
import { useSelector } from "react-redux";
import UserEditPage from "./pages/UserEditPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import OrderListPage from "./pages/OrderListPage";

function App() {
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <Router>
      <Header />
      <main className="container">
        <Route path="/" component={HomePage} exact />
        <Route path="/products/:id" component={ProductDetailPage} />
        <Route path="/login" component={LoginPage} />
        {userInfo && <Route path="/profile" component={ProfilePage} />}
        <Route path="/shipping" component={ShippingPage} />
        <Route path="/payment" component={PaymentPage} />
        <Route path="/placeorder" component={PlaceOrderPage} />
        <Route path="/order/:id" component={OrderPage} />
        <Route path="/shoppingcart/:id?" component={CartPage} />
        <Route path="/signup" component={SignupPage} exact />
        <Route path="/admin/users" component={UserListPage} exact />
        <Route path="/admin/user/:id" component={UserEditPage} exact />
        <Route path="/admin/products" component={ProductListPage} exact />
        <Route path="/admin/product/:id" component={ProductEditPage} exact />
        <Route path="/admin/orders" component={OrderListPage} exact />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
