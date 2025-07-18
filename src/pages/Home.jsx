// pages/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (!auth) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchUser = async () => {
    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('User not found');
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>GitHub Profile Viewer</h1>
      <div className="search-box">
        <input
          type="text"
          value={username}
          placeholder="Enter GitHub username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchUser}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {userData && (
        <div className="profile">
          <img src={userData.avatar_url} alt="avatar" />
          <h2>{userData.name}</h2>
          <p>{userData.bio}</p>
          <p><strong>Location:</strong> {userData.location || 'N/A'}</p>
          <p><strong>Repositories:</strong> {userData.public_repos}</p>
          <p><strong>Followers:</strong> {userData.followers}</p>
          <p><strong>Following:</strong> {userData.following}</p>
          <a href={userData.html_url} target="_blank" rel="noreferrer">View on GitHub</a>
        </div>
      )}
    </div>
  );
}

export default Home;
