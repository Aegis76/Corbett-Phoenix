import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: '8rem', color: 'var(--primary)', lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Page Not Found</h2>
        <p style={{ marginBottom: '30px', color: 'var(--text-light)' }}>The page you are looking for might have been removed or is temporarily unavailable.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </main>
  );
};

export default NotFound;
