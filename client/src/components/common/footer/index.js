import React from 'react';
import './footer.css'; // Link the CSS file

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <span className="footer-text">Made with 💙 by Deepika</span>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/deepikakolli4/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/Deepikakolli4" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
      <div className="footer-note">
        <span>&copy; 2025 All Rights Reserved</span>
      </div>
    </div>
  );
};

export default Footer;
