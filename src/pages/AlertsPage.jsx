import React from 'react';
import EmergingAlerts from '../components/widgets/EmergingAlerts';

const AlertsPage = () => {
  return (
    <div className="page-wrapper glass-panel" style={{ padding: '32px' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Global Emerging Alerts</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Real-time anomalous growth detections monitoring breakout technologies.</p>
      <div style={{ maxWidth: '800px' }}>
        <EmergingAlerts />
      </div>
    </div>
  );
};

export default AlertsPage;
