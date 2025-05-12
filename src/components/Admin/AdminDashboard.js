import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import LogoutButton from '../common/LogoutButton';
import './AdminDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaUserPlus,
  FaUsers,
  FaChartLine,
  FaCashRegister,
} from 'react-icons/fa';

const AdminDashboard = () => {
  const sections = [
    {
      icon: <FaUserPlus className="me-2" size={24} />,
      title: 'Create User',
      link: '/admin/create-user',
      bg: 'primary',
    },
    {
      icon: <FaUsers className="me-2" size={24} />,
      title: 'Manage Users',
      link: '/admin/users',
      bg: 'success',
    },
    {
      icon: <FaChartLine className="me-2" size={24} />,
      title: 'Statistics',
      link: '/admin/statistics',
      bg: 'warning',
      textColor: 'text-dark',
      btnVariant: 'dark',
    },
    {
      icon: <FaCashRegister className="me-2" size={24} />,
      title: 'Users Transactions',
      link: '/admin/transactions',
      bg: 'danger',
    },
  ];

  return (
    <div className="admin-dashboard bg-premium-image min-vh-100">
      <div className="overlay"></div>

      <div className="container py-5 position-relative z-1">
        <div className="d-flex justify-content-end mb-4">
          <LogoutButton />
        </div>

        <div className="row g-4 justify-content-center">
          {sections.map((sec, i) => (
            <div className="col-12 col-sm-6 col-lg-4" key={i}>
              <div className={`card premium-card bg-${sec.bg} text-white text-center`}>
                <div className="card-body">
                  <div className="mb-3">{sec.icon}</div>
                  <h5 className="card-title">{sec.title}</h5>
                  <Link to={sec.link} className={`btn btn-light w-100 mt-2 ${sec.btnVariant || ''}`}>
                    Go
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
