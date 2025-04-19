import React, { useEffect, useState } from 'react';

const Success = () => {
  const [isValid, setIsValid] = useState(null);
  const token = new URLSearchParams(window.location.search).get('token');

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await fetch(`/.netlify/functions/validate-token?token=${token}`);
        const data = await res.json();
        if (data.success) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (err) {
        console.error('Token validation failed', err);
        setIsValid(false);
      }
    };

    if (token) {
      validateToken();
    } else {
      setIsValid(false);
    }
  }, [token]);

  if (isValid === null) {
    return <p style={{ color: 'white', textAlign: 'center' }}>Validating your access...</p>;
  }

  if (!isValid) {
    return (
      <div style={{ color: 'white', textAlign: 'center' }}>
        <h2>❌ Invalid or expired access link. Please complete your purchase first.</h2>
        <a href="/" style={{ color: 'lightblue' }}>Return to Homepage</a>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', color: 'white' }}>
      <h2>🎉 Thank you for your purchase!</h2>
      <p>Your AI-generated greeting card is ready. Click below to download it instantly:</p>
      <a
        href="/assets/sample-card.png"
        download="greeting-card.png"
        style={{
          padding: '12px 24px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          display: 'inline-block',
          marginTop: '20px'
        }}
      >
        Download Your Card
      </a>
    </div>
  );
};

export default Success;
