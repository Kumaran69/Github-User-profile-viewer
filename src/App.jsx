// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './App.css';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="App">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </div>
    </Router>
  );
}

function Header({ isAuthenticated, onLogout }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Sign Up</Link>
      <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
      {isAuthenticated && (
        <button onClick={onLogout} className="logout-btn">Logout</button>
      )}
    </nav>
  );
}

export default App;
