import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import MemberCreate from './components/MemberCreate';
import { AuthContextProvider } from './context/UserContext';
import LoginPage from './components/LoginPage';
import ProductList from './components/ProductList';
import './App.css';
import { CartContextProvider } from './context/CartContext';
import OrderPage from './components/OrderPage';

const App = () => {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <div className='App'>
          <Header />
          <div className='content-wrapper'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/member/create' element={<MemberCreate />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/product/list' element={<ProductList />} />
              <Route path='/order/cart' element={<OrderPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </CartContextProvider>
    </AuthContextProvider>
  );
};

export default App;
