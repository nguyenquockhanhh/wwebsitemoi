import React from "react";
import {BrowserRouter as Router , Routes , Route  } from 'react-router-dom';
import { CartProvider } from "react-use-cart";


import Home from "./page/home";
import Product from "./page/Product";
import Cart from "./page/shoppingcart";
import Login from "./page/auth/login";
import DangKy from "./page/auth/DangKy";

const App = () => {
  

  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Các route User */}

          <Route path="/" element={<Home />} />

          <Route path="/Product" element={<Product />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/DangKy" element={<DangKy />} />

          {/* Các route cho admin */}

          {/* // router yêu cầu login */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
