import React from 'react';

const SettingsPage = () => {
  return (
    <div className="page-wrapper glass-panel" style={{ padding: '32px' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>System Settings</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Configure your dashboard preferences and data feeds.</p>
      
      <div style={{ maxWidth: '800px' }}>
        <div style={{ padding: '24px', background: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
          <h4 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Data Integrations</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <input type="checkbox" checked readOnly style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }} />
            <span style={{ fontSize: '1.1rem' }}>Global Patent Database API</span>
            <span style={{ marginLeft: 'auto', background: 'rgba(52, 211, 153, 0.2)', color: '#34d399', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>LIVE</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <input type="checkbox" checked readOnly style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}/>
            <span style={{ fontSize: '1.1rem' }}>LinkedIn Jobs Scraper</span>
            <span style={{ marginLeft: 'auto', background: 'rgba(52, 211, 153, 0.2)', color: '#34d399', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>LIVE</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="checkbox" checked readOnly style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}/>
            <span style={{ fontSize: '1.1rem' }}>Crunchbase Startup Funding</span>
            <span style={{ marginLeft: 'auto', background: 'rgba(52, 211, 153, 0.2)', color: '#34d399', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>LIVE</span>
          </div>
        </div>

        <div style={{ padding: '24px', background: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h4 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Algorithm Configuration</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
             <label style={{ color: 'var(--text-muted)' }}>Forecasting Horizon (Years)</label>
             <input type="range" min="1" max="10" defaultValue="4" style={{ width: '100%' }} />
             <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <span>1 Year</span>
                <span>Current: 4 Years</span>
                <span>10 Years</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
