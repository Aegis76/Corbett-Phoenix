import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PackageCard = ({ pkg }) => {
  return (
    <div className="package-card">
      <img src={pkg.image} alt={pkg.title} className="card-img" />
      <div className="card-content">
        <h3 className="card-title">{pkg.title}</h3>
        <ul className="package-inclusions">
          {pkg.inclusions.map((item, index) => (
            <li key={index}><CheckCircle size={14} color="#3A5A40" /> {item}</li>
          ))}
        </ul>
        <div className="card-footer">
          <div className="card-price">₹{pkg.price} <span>/ package</span></div>
          <Link to="/contact" className="btn btn-primary">Book Now</Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
