import React from 'react';
import './App.css'
import {  Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import {HomePage} from './pages/HomePage';
import {Login} from './components/Login';
import {Register} from './components/Register';
import {Favorites} from './components/Favorites';
import { Navbar } from './components/Navbar';
const App = () => {
  return (
    <AuthProvider>
     <Navbar/>
 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      
    </AuthProvider>
  );
};
export default App;
