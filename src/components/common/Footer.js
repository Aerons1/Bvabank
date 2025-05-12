import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} BVA Intercontinental Bank Plc. All rights reserved.</p>
        <div>
          <a href="/" className="text-white me-3">Privacy Policy</a>
          <a href="/" className="text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
