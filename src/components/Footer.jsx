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
              Corbett Phoenix Resort offers a premium luxury stay near Jim
              Corbett National Park. Experience nature like never before with
              our world-class amenities and safari adventures.
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
                <Link to="/safari">Safari</Link>
              </li>
              <li>
                <Link to="/packages">Packages</Link>
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
            <h4>Our Services</h4>
            <ul className="footer-links">
              <li>
                <Link to="/rooms">Luxury Stay</Link>
              </li>
              <li>
                <Link to="/safari">Jeep Safari</Link>
              </li>
              <li>
                <Link to="/packages">Honeymoon Packages</Link>
              </li>
              <li>
                <Link to="/packages">Corporate Events</Link>
              </li>
              <li>
                <Link to="/gallery">Nature Photography</Link>
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
                  Near Jim Corbett National Park, Ramnagar, Uttarakhand, India
                </span>
              </li>
              <li>
                <Phone
                  size={20}
                  className="footer-social-icon"
                  style={{ background: "none", width: "auto", height: "auto" }}
                />
                <span>+91 9761420066</span>
              </li>
              <li>
                <Mail
                  size={20}
                  className="footer-social-icon"
                  style={{ background: "none", width: "auto", height: "auto" }}
                />
                <span>info@corbettphoenix.com</span>
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
