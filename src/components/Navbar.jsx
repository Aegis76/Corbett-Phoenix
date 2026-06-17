import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Determine if navbar should be transparent
  // Only transparent on home page when not scrolled
  const isTransparent = isHomePage && !isScrolled && !mobileMenuOpen;

  return (
    <header
      className={`main-header ${isScrolled ? "scrolled" : ""} ${isTransparent ? "transparent" : ""} ${mobileMenuOpen ? "mobile-open" : ""}`}
    >
      {/* Top Bar - Hidden on scroll or mobile menu */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-info">
            <div className="top-bar-item">
              <Phone size={14} />
              <span>+91 9761420066</span>
            </div>
            <div className="top-bar-item">
              <Mail size={14} />
              <span>info@corbettphoenix.com</span>
            </div>

            <div className="top-bar-item">
              <MapPin size={14} />
              <span>Jim Corbett, Uttarakhand</span>
            </div>
          </div>
          <div className="top-bar-social">
            <a href="#">
              <Facebook size={14} />
            </a>
            <a href="#">
              <Instagram size={14} />
            </a>
            <a href="#">
              <Twitter size={14} />
            </a>
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="container">
          <Link to="/" className="logo">
            Corbett Phoenix
          </Link>

          <div className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Rooms
            </NavLink>
            {/* <NavLink
              to="/activities"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            > */}
            {/* activities
            </NavLink> */}
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Our Services
            </NavLink>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Gallery
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              About Us
            </NavLink>
            <Link to="/about" className="nav-book-btn">
              Book Now
            </Link>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-links">
          <NavLink to="/" className="mobile-nav-link">
            Home
          </NavLink>
          <NavLink to="/rooms" className="mobile-nav-link">
            Rooms
          </NavLink>
          <NavLink to="/about" className="mobile-nav-link">
            About Us
          </NavLink>
          <NavLink to="/safari" className="mobile-nav-link">
            Safari
          </NavLink>
          <NavLink to="/packages" className="mobile-nav-link">
            Packages
          </NavLink>
          <NavLink to="/gallery" className="mobile-nav-link">
            Gallery
          </NavLink>
          <NavLink to="/contact" className="mobile-nav-link">
            Contact
          </NavLink>
          <Link to="/contact" className="btn btn-primary">
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
