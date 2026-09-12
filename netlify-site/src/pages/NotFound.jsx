import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="wrap" style={{ padding: '140px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: 32 }}>Page not found</h1>
      <p style={{ color: 'var(--gray-light)', marginTop: 12 }}>That page doesn't exist.</p>
      <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => navigate('/')}>Back Home</button>
    </div>
  );
}
