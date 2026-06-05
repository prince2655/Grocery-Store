import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            {/* Logo */}
            <div className="footer-section footer-logo-section">
              <h2 className="footer-logo">LOGO</h2>
              <div className="social-links">
                <a href="#" className="social-icon" title="Instagram"><i className="bi bi-instagram"></i></a>
                <a href="#" className="social-icon" title="Facebook"><i className="bi bi-facebook"></i></a>
                <a href="#" className="social-icon" title="Twitter"><i className="bi bi-twitter"></i></a>
              </div>
            </div>

            {/* Links */}
            <div className="footer-section">
              <ul className="footer-links">
                <li><a href="/explore">Explore</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contactus">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <ul className="footer-links">
                <li><a href="tel:+8801341786">Call: +880 134 1786</a></li>
                <li><a href="#">Hours: 12pm-12am</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; All Rights Reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
