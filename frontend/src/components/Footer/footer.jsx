import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-grid">

          <div className="footer-about">
            <h3 className="footer-logo">Kamala Pickle</h3>

            <p className="footer-description">
              Handcrafted with love, tradition, and the finest spices from the
              heart of Telangana.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>

            <div className="links-list">
              {["Home", "Products", "About Us"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>

            <div className="contact-list">
              <span>hello@royalpickle.com</span>
              <span>+91 7095543843</span>
              <span>Hyderabad, Telangana</span>
            </div>
          </div>

        </div>

        <div className="footer-divider"></div>

        <p className="footer-bottom">
          © 2026 AV Group. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;