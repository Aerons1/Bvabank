import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import LogoutButton from './common/LogoutButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaMoneyCheckAlt, FaUserTie, FaExchangeAlt } from 'react-icons/fa';
import './UserDashboard.css';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndTransactions = async () => {
      try {
        const userRes = await axiosInstance.get('/users/profile');
        setUser(userRes.data);

        const txRes = await axiosInstance.get('/transactions');
        setTransactions(txRes.data);
      } catch (err) {
        console.error('Error loading dashboard:', err);
        setError('Failed to load dashboard. Redirecting...');
        setTimeout(() => navigate('/'), 2000);
      }
    };

    fetchUserAndTransactions();
  }, [navigate]);

  if (error) return <div className="text-danger text-center mt-5">{error}</div>;
  if (!user) return <div className="text-white text-center mt-5">Loading Dashboard...</div>;

  const dashboardCards = [
    {
      icon: <FaMoneyCheckAlt className="me-2" />,
      title: 'Account Info',
      description: `Account Number: ${user.accountNumber}\nBalance: $${user.balance.toLocaleString()}`,
      buttonLabel: 'View Info',
      link: '#',
      variant: 'primary',
    },
    {
      icon: <FaExchangeAlt className="me-2" />,
      title: 'Transfer Funds',
      description: 'Send money to local & international accounts securely.',
      buttonLabel: 'Transfer Now',
      link: '/transfer',
      variant: 'success',
    },
    {
      icon: <FaUserTie className="me-2" />,
      title: 'Account Manager',
      description: `Name: ${user.accountManager?.name || 'N/A'}\nEmail: ${user.accountManager?.email || 'N/A'}`,
      buttonLabel: 'Contact Manager',
      link: '#',
      variant: 'dark',
    },
  ];

  return (
    <div className="dashboard-bg">
      <LogoutButton />
      <div className="dashboard-overlay"></div>
      <Container className="py-5 position-relative z-1">
        <h2 className="text-white text-center mb-4">Welcome, {user.name}</h2>

        {/* Dashboard Cards */}
        <Row className="g-4 mb-4">
          {dashboardCards.map((card, idx) => (
            <Col md={6} lg={4} key={idx}>
              <Card className="shadow-sm border-0 h-100 text-center">
                <Card.Body>
                  <Card.Title>{card.icon}{card.title}</Card.Title>
                  <Card.Text style={{ whiteSpace: 'pre-line' }}>{card.description}</Card.Text>
                  {card.link === '#' ? (
                    <Button variant={card.variant} className="w-100" disabled>
                      {card.buttonLabel}
                    </Button>
                  ) : (
                    <Link to={card.link}>
                      <Button variant={card.variant} className="w-100">{card.buttonLabel}</Button>
                    </Link>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Transaction History */}
        <Row>
          <Col>
            <div className="card shadow-lg rounded-4 border-0">
              <div className="card-header bg-warning text-dark fw-semibold rounded-top-4">Transaction History</div>
              <div className="card-body">
                {transactions.length === 0 ? (
                  <p>No transactions found.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead className="table-dark">
                        <tr>
                          <th>Date</th>
                          <th>Type</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map(tx => (
                          <tr key={tx._id}>
                            <td>{new Date(tx.createdAt).toLocaleString()}</td>
                            <td>{tx.type}</td>
                            <td>${tx.amount.toLocaleString()}</td>
                            <td>{tx.status}</td>
                            <td>{tx.note || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;
