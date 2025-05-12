import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReceiptPage.css';

const ReceiptPage = () => {
  const [transfer, setTransfer] = useState(null);
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  // Define the shared unique 2FA code (used by all users)
  const valid2FACode = '938271';

  useEffect(() => {
    const data = localStorage.getItem('transferData');
    if (data) setTransfer(JSON.parse(data));
  }, []);

  if (!transfer) return <div className="receipt-loading">Loading Receipt...</div>;

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: transfer.currency || 'USD',
  }).format(Number(transfer.amount));

  const handleSubmit = () => {
    if (code === valid2FACode) {
      navigate('/transaction-successful');
    } else {
      alert('Invalid 2FA Code. Please contact your account manager.');
    }
  };

  return (
    <div className="receipt-background">
      <div className="receipt-overlay" />

      <div className="receipt-content card shadow">
        <div className="text-center mb-4">
          <img src="/logo.png" alt="Bank Logo" className="bank-logo" />
          <h3 className="mt-3">Transfer Receipt</h3>
        </div>

        <table className="table table-bordered table-sm">
          <tbody>
            <tr><th>Sender</th><td>{transfer.senderName}</td></tr>
            <tr><th>Beneficiary</th><td>{transfer.beneficiaryName}</td></tr>
            <tr><th>Bank</th><td>{transfer.bankName}</td></tr>
            <tr><th>Account Number</th><td>{transfer.accountNumber}</td></tr>
            <tr><th>Country</th><td>{transfer.country}</td></tr>
            <tr><th>Amount</th><td>{formattedAmount}</td></tr>
            <tr>
              <th>Account Manager</th>
              <td>{transfer.accountManager?.name} ({transfer.accountManager?.email})</td>
            </tr>
          </tbody>
        </table>

        <div className="custom-alert">
          Contact your account manager to receive your 2FA authorization code.
        </div>

        <input
          className="form-control custom-input mb-3"
          placeholder="Enter 2FA Code"
          value={code}
          onChange={e => setCode(e.target.value)}
        />

        <button className="btn btn-success w-100 shadow-sm" onClick={handleSubmit}>
          Submit Transfer
        </button>
      </div>
    </div>
  );
};

export default ReceiptPage;
