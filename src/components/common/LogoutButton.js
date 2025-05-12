// components/common/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        position: 'fixed',
        top: '20px',
        right: '30px',
        backgroundColor: '#d9534f', // Bootstrap 'danger' red
        color: '#fff',
        border: 'none',
        padding: '10px 18px',
        borderRadius: '20px',
        fontWeight: 'bold',
        fontSize: '14px',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        zIndex: 9999,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={e => (e.target.style.backgroundColor = '#c9302c')}
      onMouseLeave={e => (e.target.style.backgroundColor = '#d9534f')}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
