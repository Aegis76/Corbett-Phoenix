import React from "react";
import "../styles/StatsSection.css";
import { Home, Trees, Users, LayoutGrid } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: <LayoutGrid size={32} />,
      number: "14",
      label: "Cottages",
    },
    {
      id: 2,
      icon: <Home size={32} />,
      number: "35",
      label: "Bedrooms",
    },
    {
      id: 3,
      icon: <Trees size={32} />,
      number: "80",
      label: "Acres of Green Space",
    },
    {
      id: 4,
      icon: <Users size={32} />,
      number: "97",
      label: "Satisfied Customers",
    },
  ];

  return (
    <section className="stats-container">
      <div className="stats-header">
        <h2 className="stats-title">Number Speaks</h2>
        <div className="stats-divider">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="line"></span>
        </div>
        <p className="stats-subtitle">The perfect place to stay</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className="icon-wrapper">{stat.icon}</div>
            <h3 className="stat-number">{stat.number}</h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
