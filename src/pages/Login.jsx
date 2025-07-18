import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginHistory, setLoginHistory] = useState([]);
  const navigate = useNavigate();

  // Load login history on mount
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('loginHistory')) || [];
    setLoginHistory(storedHistory);
  }, []);

  // Save and redirect on login
  const handleLogin = (e) => {
    //e.preventDefault();

    if (email && password) {
      const newEntry = {
        email,
        password,
        timestamp: new Date().toISOString()
      };

      const updatedHistory = [...loginHistory, newEntry];
      localStorage.setItem('loginHistory', JSON.stringify(updatedHistory));
      setLoginHistory(updatedHistory);

      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      alert('Please enter valid credentials.');
    }
  };

  // Autofill selected login entry
  const handleSelectChange = (e) => {
    const index = e.target.value;
    if (index !== '') {
      const selected = loginHistory[index];
      setEmail(selected.email);
      setPassword(selected.password);
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>

      {/* Dropdown of login history */}
      {loginHistory.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          <label>Select Previous Login:</label>
          <select onChange={handleSelectChange} defaultValue="">
            <option value="" disabled>Choose...</option>
            {loginHistory.map((entry, index) => (
              <option key={index} value={index}>
                {entry.email} ({new Date(entry.timestamp).toLocaleString()})
              </option>
            ))}
          </select>
        </div>
      )}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
