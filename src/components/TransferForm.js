import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TransferForm.css';

const TransferForm = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    beneficiaryName: '',
    bankName: '',
    accountNumber: '',
    country: '',
    amount: '',
    currency: 'USD',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    const fullTransferData = {
      ...formData,
      senderName: user.name,
      accountManager: user.accountManager,
    };
    localStorage.setItem('transferData', JSON.stringify(fullTransferData));
    navigate('/receipt');
  };

  return (
    <div className="transfer-form-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="form-card bg-light p-4 shadow-lg rounded">
        <h3 className="text-center mb-4">Transfer Funds</h3>

        <input
          className="form-control mb-3"
          name="beneficiaryName"
          placeholder="Beneficiary Name"
          onChange={handleChange}
        />
        <input
          className="form-control mb-3"
          name="bankName"
          placeholder="Beneficiary Bank Name"
          onChange={handleChange}
        />
        <input
          className="form-control mb-3"
          name="accountNumber"
          placeholder="Beneficiary Account Number"
          onChange={handleChange}
        />
        <input
          className="form-control mb-3"
          name="country"
          placeholder="Beneficiary Country"
          onChange={handleChange}
        />
        <input
          className="form-control mb-3"
          name="amount"
          type="number"
          placeholder="Amount to Transfer"
          onChange={handleChange}
        />
        <select
          className="form-control mb-4"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
        >
          <option value="USD">USD - United States Dollar</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="EUR">EUR - Euro</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="CNY">CNY - Chinese Yuan (RMB)</option>
          <option value="SGD">SGD - Singapore Dollar</option>
        </select>

        <button className="btn btn-primary w-100" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default TransferForm;
