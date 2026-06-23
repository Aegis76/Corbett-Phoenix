import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4
              className="logo"
              style={{ color: "white", marginBottom: "20px" }}
            >
              PHOENIX RESORT
            </h4>
            <p>
              Whether it’s for a weekend or a month, Phoenix Corbet is where memories are made, bonds are deepened, and the soul finds rest.
Stay wild. Stay warm. Stay with us.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-icon">
                <Facebook size={18} />
              </a>
              <a href="#" className="footer-social-icon">
                <Instagram size={18} />
              </a>
              <a href="#" className="footer-social-icon">
                <Twitter size={18} />
              </a>
              <a href="#" className="footer-social-icon">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/rooms">Rooms</Link>
              </li>
        
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/policies">Policies</Link>
              </li>
            </ul>
          </div>

       
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul className="footer-contact">
              <li>
                <MapPin
                  size={20}
                  className="footer-social-icon"
                  style={{ background: "none", width: "auto", height: "auto" }}
                />
                <span>
                Located in Awala Khot, Kotabagh
                </span>
              </li>
              <li>
                <Phone
                  size={20}
                  className="footer-social-icon"
                  style={{ background: "none", width: "auto", height: "auto" }}
                />
                <span>+91 94111 97491</span>
              </li>
              <li>
                <Mail
                  size={20}
                  className="footer-social-icon"
                  style={{ background: "none", width: "auto", height: "auto" }}
                />
            
                <span>navinpana@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Corbett Phoenix Resort. All Rights
            Reserved. Designed for Luxury.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
