// src/components/AdminCreateUser.js
import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminCreateUser = () => {
  const [form, setForm] = useState({
    name: '', email: '', password: '', managerName: '', managerEmail: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { name, email, password, managerName, managerEmail } = form;

      await axiosInstance.post('/admin/users', {
        name,
        email,
        password,
        accountManager: { name: managerName, email: managerEmail }
      });

      toast.success('✅ User created successfully!');
      setForm({ name: '', email: '', password: '', managerName: '', managerEmail: '' });
    } catch (err) {
      const message = err.response?.data?.message || 'Error creating user';
      toast.error(`❌ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h3>Create New User</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="User Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="form-control mb-2"
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="form-control mb-2"
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="form-control mb-2"
          required
        />
        <input
          placeholder="Manager Name"
          value={form.managerName}
          onChange={e => setForm({ ...form, managerName: e.target.value })}
          className="form-control mb-2"
          required
        />
        <input
          placeholder="Manager Email"
          type="email"
          value={form.managerEmail}
          onChange={e => setForm({ ...form, managerEmail: e.target.value })}
          className="form-control mb-2"
          required
        />
        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  );
};

export default AdminCreateUser;
