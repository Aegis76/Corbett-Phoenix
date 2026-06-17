import React, { useState } from 'react';
import GalleryGrid from '../components/GalleryGrid';
import CTASection from '../components/CTASection';

const Gallery = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Rooms', 'Safari', 'Resort', 'Nature'];

  return (
    <main>
      <section className="section-padding" style={{ backgroundColor: '#f9f9f9', textAlign: 'center' }}>
        <div className="container">
          <h1 className="section-title">Our Gallery</h1>
          <p style={{ maxWidth: '700px', margin: '0 auto 40px', color: 'var(--text-light)' }}>
            Take a visual tour of Corbett Phoenix Resort, our luxury accommodations, and the breathtaking wildlife of Jim Corbett National Park.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '50px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFilter(cat)}
                style={{ padding: '8px 24px' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <GalleryGrid />
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default Gallery;
