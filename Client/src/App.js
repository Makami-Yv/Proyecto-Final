import './App.css';
import Navbar from './components/navbar/navbar';
import Products from './components/products/products';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/products?search=:search" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
