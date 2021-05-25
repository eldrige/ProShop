import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegistrationScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentsScreen from './screens/PaymentsScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';

const App = () => {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          {/* <HomeScreen /> */}
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payments" component={PaymentsScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/admin/productlist" component={ProductListScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/users/:id/edit" component={UserEditScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" component={HomeScreen} exact />
          {/* the ? makes it optional */}
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
