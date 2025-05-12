import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const AdminStatistics = () => {
  const [userCount, setUserCount] = useState(0);
  const [transactionStats, setTransactionStats] = useState({
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosInstance.get('/admin/statistics');
        setUserCount(data.totalUsers);
        setTransactionStats(data.transactionStats);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    fetchStats();
  }, []);

  const barData = {
    labels: ['Approved', 'Pending', 'Rejected'],
    datasets: [
      {
        label: 'Transactions',
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
        data: [
          transactionStats.approved,
          transactionStats.pending,
          transactionStats.rejected,
        ],
      },
    ],
  };

  const doughnutData = {
    labels: ['Approved', 'Pending', 'Rejected'],
    datasets: [
      {
        label: 'Transaction Ratio',
        data: [
          transactionStats.approved,
          transactionStats.pending,
          transactionStats.rejected,
        ],
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Admin Statistics</h3>
      <div className="mb-3">
        Total Registered Users: <strong>{userCount}</strong>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h5>Transaction Overview (Bar Chart)</h5>
          <Bar data={barData} />
        </div>
        <div className="col-md-6">
          <h5>Transaction Distribution (Doughnut)</h5>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
