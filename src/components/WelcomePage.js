import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import bankingVideo from '../assets/bankingvid.mp4';
import logo from '../assets/bankinglogo1.png';
import { loginAdmin, loginUser } from '../api/auth'; // ✅ Use API file
import { toast } from 'react-toastify';

const WelcomePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const isAdmin = email === process.env.REACT_APP_ADMIN_EMAIL;
      const res = isAdmin
        ? await loginAdmin(email, password)
        : await loginUser(email, password);

      localStorage.setItem('token', res.data.token);

      if (isAdmin) {
        toast.success('Admin login successful');
        navigate('/admin');
      } else {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        toast.success('User login successful');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="welcome-container">
      <video autoPlay muted loop className="bg-video">
        <source src={bankingVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay" />
      <div className="welcome-content">
        <img src={logo} alt="Banking Logo" className="welcome-logo mb-4" style={{ maxWidth: '180px' }} />
        <h1 className="display-4 text-white mb-4">Welcome to BVA Intercontinental Bank</h1>
        <p className="lead text-white mb-4">Secure. Smart. Reliable. Premium Banking.</p>
        <div className="form-box bg-white p-4 rounded shadow">
          <input
            className="form-control mb-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary w-100" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
