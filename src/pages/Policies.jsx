import React from 'react';

const Policies = () => {
  return (
    <main>
      <section className="section-padding" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <h1 className="section-title">Resort Policies</h1>
          
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{ color: 'var(--primary)', marginBottom: '20px' }}>Booking Policy</h2>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: 'var(--text-light)' }}>
                <li style={{ marginBottom: '10px' }}>Check-in time is 12:00 PM and Check-out time is 10:00 AM.</li>
                <li style={{ marginBottom: '10px' }}>Early check-in or late check-out is subject to availability and may be chargeable.</li>
                <li style={{ marginBottom: '10px' }}>A valid government ID proof is mandatory for all guests at the time of check-in.</li>
                <li style={{ marginBottom: '10px' }}>100% advance payment is required to confirm the booking.</li>
              </ul>
            </div>

            <div style={{ marginBottom: '50px' }}>
              <h2 style={{ color: 'var(--primary)', marginBottom: '20px' }}>Refund & Cancellation Policy</h2>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: 'var(--text-light)' }}>
                <li style={{ marginBottom: '10px' }}>Cancellation made 30 days or more before check-in: 90% refund.</li>
                <li style={{ marginBottom: '10px' }}>Cancellation made between 15-30 days before check-in: 50% refund.</li>
                <li style={{ marginBottom: '10px' }}>Cancellation made less than 15 days before check-in: No refund.</li>
                <li style={{ marginBottom: '10px' }}>No refunds for no-shows or early departures.</li>
                <li style={{ marginBottom: '10px' }}>Safari permits are non-refundable and non-transferable as per government rules.</li>
              </ul>
            </div>

            <div style={{ marginBottom: '50px' }}>
              <h2 style={{ color: 'var(--primary)', marginBottom: '20px' }}>Terms & Conditions</h2>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: 'var(--text-light)' }}>
                <li style={{ marginBottom: '10px' }}>Guests are responsible for any damage to resort property during their stay.</li>
                <li style={{ marginBottom: '10px' }}>Loud music and noise are strictly prohibited after 10:00 PM to maintain the jungle's tranquility.</li>
                <li style={{ marginBottom: '10px' }}>Pets are not allowed within the resort premises.</li>
                <li style={{ marginBottom: '10px' }}>The resort management is not responsible for any loss of personal belongings.</li>
                <li style={{ marginBottom: '10px' }}>All disputes are subject to the jurisdiction of local courts in Uttarakhand.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Policies;
