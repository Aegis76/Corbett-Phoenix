import React from 'react';
import { Wifi, Coffee, Utensils, Car, ShieldCheck, Waves, Dumbbell, Map } from 'lucide-react';

const amenities = [
  { icon: <Wifi />, title: 'Free High-Speed Wifi' },
  { icon: <Waves />, title: 'Swimming Pool' },
  { icon: <Utensils />, title: 'Multi-Cuisine Restaurant' },
  { icon: <Coffee />, title: '24/7 Room Service' },
  { icon: <Car />, title: 'Free Parking' },
  { icon: <ShieldCheck />, title: '24/7 Security' },
  { icon: <Dumbbell />, title: 'Fitness Center' },
  { icon: <Map />, title: 'Safari Assistance' },
];

const Amenities = () => {
  return (
    <div className="amenities-grid">
      {amenities.map((item, index) => (
        <div key={index} className="amenity-item">
          <span className="amenity-icon">{item.icon}</span>
          <h4>{item.title}</h4>
        </div>
      ))}
    </div>
  );
};

export default Amenities;
