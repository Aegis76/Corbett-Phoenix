import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <main>
      <section
        className="section-padding"
        style={{
          backgroundColor: "var(--primary)",
          color: "white",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "3.5rem", marginBottom: "20px" }}>
            Contact Us
          </h1>
          <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>
            We're here to help you plan your perfect jungle getaway.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info-card">
              <h2 style={{ marginBottom: "30px" }}>Get In Touch</h2>

              <div className="contact-info-item">
                <MapPin className="contact-info-icon" />
                <div>
                  <h4 style={{ marginBottom: "5px" }}>Location</h4>
                  <p style={{ opacity: 0.8 }}>
                    Near Jim Corbett National Park, Ramnagar, Uttarakhand
                    244715, India
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <Phone className="contact-info-icon" />
                <div>
                  <h4 style={{ marginBottom: "5px" }}>Phone</h4>
                  <p style={{ opacity: 0.8 }}>
                    +919761420066
                    <br />
                    +919411197491
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <Mail className="contact-info-icon" />
                <div>
                  <h4 style={{ marginBottom: "5px" }}>Email</h4>
                  <p style={{ opacity: 0.8 }}>info@corbettphoenix.com</p>
                  <p style={{ opacity: 0.8 }}>navinpana@gmail.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <Clock className="contact-info-icon" />
                <div>
                  <h4 style={{ marginBottom: "5px" }}>Working Hours</h4>
                  <p style={{ opacity: 0.8 }}>
                    Reception: 24/7
                    <br />
                    Reservations: 9:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="booking-form">
              <h3 style={{ marginBottom: "25px", color: "var(--primary)" }}>
                Send us a Message
              </h3>
              <form>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="Your Email" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="Your Phone" />
                  </div>
                  <div className="form-group">
                    <label>Room Type</label>
                    <select>
                      <option>Deluxe Room</option>
                      <option>Premium Room</option>
                      <option>Luxury Cottage</option>
                      <option>Family Suite</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Check-in Date</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Check-out Date</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>No. of Guests</label>
                    <input type="number" min="1" />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input type="text" placeholder="Inquiry Subject" />
                  </div>
                  <div className="form-group full">
                    <label>Your Message</label>
                    <textarea placeholder="How can we help you?"></textarea>
                  </div>
                  <div className="form-group full">
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                    >
                      Submit Inquiry
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section style={{ height: "450px", width: "100%" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55655.20164673898!2d79.08386119854743!3d29.41201502446698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a4309859207e3%3A0x633909193f419d2b!2sJim%20Corbett%20National%20Park!5e0!3m2!1sen!2sin!4v1710842000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Corbett Phoenix Resort Location"
        ></iframe>
      </section>
    </main>
  );
};

export default Contact;
