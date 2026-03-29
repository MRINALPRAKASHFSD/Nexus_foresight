import React from 'react';
import Recommendations from '../components/widgets/Recommendations';

const RecommendationsPage = () => {
  return (
    <div className="page-wrapper glass-panel" style={{ padding: '32px' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Personalized Roadmap</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Your dynamic roadmap generated via AI cluster matching.</p>
      <div style={{ maxWidth: '800px' }}>
         <Recommendations />
      </div>
    </div>
  );
};

export default RecommendationsPage;
