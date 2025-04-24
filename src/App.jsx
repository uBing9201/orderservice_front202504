import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import MemberCreate from './components/MemberCreate';
import { AuthContextProvider } from './context/UserContext';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <AuthContextProvider>
      <div className='App'>
        <Header />
        <div className='content-wrapper'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/member/create' element={<MemberCreate />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthContextProvider>
  );
};

export default App;
