// import './App.css';
import Products from "./components/products/products";
import Login2 from "./components/Login/Login2";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import DetailCard from "./components/detail/detail";
import Stripe from "./components/Stripe/Stripe";
import Formaddcomp from "./components/Formaddcomp/Formaddcomp";
import { LandingPage } from "./components/Landing/landing";
import Cart from "./components/cart/cart";
import UserDetail from "./components/Register/userDetail";
import ForgotPassword from "./components/Login/ForgotPassword";
import Resetpassword from "./components/Login/ResetPassword";
import ProtectedRouter from "./components/router/ProtectedRouter";

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <Routes>
          {/* rutas publicas */}

          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<DetailCard />} />
          <Route path="/login" element={<Login2 />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route
            exact
            path="/resetPassword/:id/:token"
            element={<Resetpassword />}
          />
          {/* rutas privadas */}
          <Route element={<ProtectedRouter />}>
            <Route path="/userDetail" element={<UserDetail />} />
            <Route path="/payment" element={<Stripe />} />
            <Route path="/products/add" element={<Formaddcomp />} />
          </Route>

          {/* <Route path="/detail/:id" element={<DetailCard />} />           */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
