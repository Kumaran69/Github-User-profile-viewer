// App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './App.css';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} />
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

// ✅ Header now uses useNavigate for logout
function Header({ isAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login'); // more reliable for SPA routing
  };

  return (
    <nav className="navbar">
      <Link to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Sign Up</Link>
      <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
      {isAuthenticated && (
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      )}
    </nav>
  );
}

export default App;
