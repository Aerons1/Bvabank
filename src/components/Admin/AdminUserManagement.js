import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    balance: '',
    managerName: '',
    managerEmail: ''
  });

  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionUser, setTransactionUser] = useState(null);
  const [transactionData, setTransactionData] = useState({
    type: 'credit',
    amount: '',
    note: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTransactionInputChange = (e) => {
    setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
  };

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setForm({
      name: user.name || '',
      balance: user.balance || '',
      managerName: user.accountManager?.name || '',
      managerEmail: user.accountManager?.email || ''
    });
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        name: form.name,
        balance: parseFloat(form.balance),
        accountManager: {
          name: form.managerName,
          email: form.managerEmail
        }
      };

      await axiosInstance.put(`/admin/users/${editUserId}`, updatedUser);
      toast.success('User updated successfully');
      setEditUserId(null);
      setForm({ name: '', balance: '', managerName: '', managerEmail: '' });
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update user');
    }
  };

  const handleBlockToggle = async (id) => {
    try {
      await axiosInstance.put(`/admin/users/${id}/block`);
      toast.success('User block status updated');
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error('Failed to toggle block status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axiosInstance.delete(`/admin/users/${id}`);
      toast.success('User deleted');
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete user');
    }
  };

  const openTransactionForm = (user) => {
    setTransactionUser(user);
    setShowTransactionForm(true);
    setTransactionData({ type: 'credit', amount: '', note: '' });
  };

  const submitTransaction = async () => {
    if (!transactionUser) return;

    try {
      const payload = {
        type: transactionData.type,
        amount: parseFloat(transactionData.amount),
        note: transactionData.note
      };

      await axiosInstance.post(`/admin/users/${transactionUser._id}/transactions`, payload);
      toast.success('Transaction logged successfully');
      setShowTransactionForm(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error('Failed to log transaction');
    }
  };

  return (
    <div className="container mt-5">
      <h2>User Management</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="table table-striped table-bordered mt-4">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Account Number</th>
              <th>Balance</th>
              <th>Manager</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>
                  {editUserId === u._id ? (
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    u.name
                  )}
                </td>
                <td>{u.email}</td>
                <td>{u.accountNumber}</td>
                <td>
                  {editUserId === u._id ? (
                    <input
                      name="balance"
                      type="number"
                      value={form.balance}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    `$${u.balance.toFixed(2)}`
                  )}
                </td>
                <td>
                  {editUserId === u._id ? (
                    <>
                      <input
                        name="managerName"
                        value={form.managerName}
                        placeholder="Manager Name"
                        onChange={handleInputChange}
                        className="form-control mb-1"
                      />
                      <input
                        name="managerEmail"
                        value={form.managerEmail}
                        placeholder="Manager Email"
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </>
                  ) : (
                    <>
                      <strong>{u.accountManager?.name || 'N/A'}</strong><br />
                      <small>{u.accountManager?.email || ''}</small>
                    </>
                  )}
                </td>
                <td>{u.isBlocked ? 'Blocked' : 'Active'}</td>
                <td>
                  {editUserId === u._id ? (
                    <button className="btn btn-success btn-sm me-2" onClick={handleSave}>
                      Save
                    </button>
                  ) : (
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(u)}>
                      Edit
                    </button>
                  )}
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleBlockToggle(u._id)}>
                    {u.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  <button className="btn btn-secondary btn-sm me-2" onClick={() => openTransactionForm(u)}>
                    Log Txn
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showTransactionForm && (
        <div className="card mt-4 p-4 border border-secondary">
          <h5>Log Manual Transaction</h5>
          <div className="row g-2">
            <div className="col-md-4">
              <select
                className="form-select"
                name="type"
                value={transactionData.type}
                onChange={handleTransactionInputChange}
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>
            <div className="col-md-4">
              <input
                type="number"
                name="amount"
                value={transactionData.amount}
                onChange={handleTransactionInputChange}
                className="form-control"
                placeholder="Amount"
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                name="note"
                value={transactionData.note}
                onChange={handleTransactionInputChange}
                className="form-control"
                placeholder="Note"
              />
            </div>
            <div className="col-md-6 d-flex">
              <button className="btn btn-success w-100 me-2" onClick={submitTransaction}>
                Submit
              </button>
              <button className="btn btn-outline-secondary w-100" onClick={() => setShowTransactionForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
