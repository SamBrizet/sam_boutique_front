import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Home from './pages/Home';
import MainLayout from './layout/MainLayout';
import MainLayoutAdmin from './layout/MainLayoutAdmin';
import ProductDetail from './pages/ProductDetail';
import FavoriteProducto from './pages/clientes/favoriteProducto';
import ProductMaintenance from './pages/admin/ProductMaintenance.jsx';
import EditProduct from './pages/admin/EditProduct.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
        />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={
          <MainLayoutAdmin>
            <Dashboard />
          </MainLayoutAdmin>
        } />
        <Route path="/admin/products" element={
          <MainLayoutAdmin>
            <ProductMaintenance />
          </MainLayoutAdmin>
        } />
        <Route path="/producto/detail/:id" element={
          <MainLayout>
            <ProductDetail />
          </MainLayout>
        } />
        <Route path="/Favoritos" element={
          <MainLayout>
            <FavoriteProducto />
          </MainLayout>
        } />
        <Route path="/admin/product/edit/:id" element={
          <MainLayoutAdmin>
            <EditProduct />
          </MainLayoutAdmin>
        } />
      </Routes>
    </Router>
  );
}

export default App;