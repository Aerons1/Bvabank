import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axiosInstance.get('/admin/transactions')
      .then(res => setTransactions(res.data));
  }, []);

  const updateStatus = async (id, action) => {
    await axiosInstance.put(`/admin/transactions/${id}/${action}`);
    setTransactions(transactions.map(txn => txn._id === id ? { ...txn, status: action } : txn));
  };

  return (
    <div className="container mt-5">
      <h3>All Transactions</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Beneficiary</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(txn => (
            <tr key={txn._id}>
              <td>{txn.senderName}</td>
              <td>{txn.beneficiaryName} ({txn.beneficiaryCountry})</td>
              <td>${txn.amount}</td>
              <td>{txn.status}</td>
              <td>
                {txn.status === 'pending' && (
                  <>
                    <button className="btn btn-success btn-sm me-2" onClick={() => updateStatus(txn._id, 'approved')}>Approve</button>
                    <button className="btn btn-danger btn-sm" onClick={() => updateStatus(txn._id, 'rejected')}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTransactions;
