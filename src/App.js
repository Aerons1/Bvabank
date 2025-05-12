import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import WelcomePage from './components/WelcomePage';
import UserDashboard from './components/UserDashboard';
import TransferForm from './components/TransferForm';
import ReceiptPage from './components/ReceiptPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminCreateUser from './components/Admin/AdminCreateUser';
import AdminUserManagement from './components/Admin/AdminUserManagement';
import AdminStatistics from './components/Admin/AdminStatistics';
import AdminTransactions from './components/Admin/AdminTransactions';
import TransactionSuccessful from './components/TransactionSuccessful';
import Footer from './components/common/Footer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/transfer" element={<TransferForm />} />
        <Route path="/receipt" element={<ReceiptPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-user" element={<AdminCreateUser />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />
        <Route path="/admin/statistics" element={<AdminStatistics />} />
        <Route path="/admin/transactions" element={<AdminTransactions />} />
        <Route path="/transaction-successful" element={<TransactionSuccessful />} />
      </Routes>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Router>
  );
};

export default App;
