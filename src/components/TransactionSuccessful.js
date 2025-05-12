import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TransactionSuccessful.css';

const TransactionSuccessful = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page d-flex justify-content-center align-items-center min-vh-100">
      <div className="success-card bg-white text-center shadow-lg rounded p-4">
        <img
          src="/logo.png"
          alt="Bank Logo"
          className="bank-logo mb-3"
          style={{ maxWidth: '100px' }}
        />

        <div className="success-icon mb-3">
          ⚠
        </div>

        <h2 className="mb-3 text-success">Transaction Pending</h2>
        <p className="text-muted mb-4">
          Your funds have been successfully submitted. Contact your Account Manager for (Authorization) to complete your transaction and further details.
        </p>

        <button className="btn btn-primary w-100" onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TransactionSuccessful;
