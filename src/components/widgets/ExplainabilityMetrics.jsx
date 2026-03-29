import React from 'react';
import { Target } from 'lucide-react';
import './Widgets.css';

const ExplainabilityMetrics = ({ topSkill }) => {
  if (!topSkill) {
    return (
      <div className="widget-card glass-panel">
        <h4 className="widget-title"><Target size={18} className="icon-target" /> Demand Signal Sources</h4>
        <div className="empty-state">Select a skill to view model sources</div>
      </div>
    );
  }

  const { sources } = topSkill;
  const metrics = [
    { label: 'Job Market Postings', value: sources.jobMarket, color: '#3b82f6' },
    { label: 'Patent Filings', value: sources.patents, color: '#10b981' },
    { label: 'Research Papers', value: sources.research, color: '#8b5cf6' },
    { label: 'Startup Seed Funding', value: sources.startups, color: '#f59e0b' },
  ];

  return (
    <div className="widget-card glass-panel">
      <div className="widget-header">
        <h4 className="widget-title">
          <Target size={18} className="icon-target" /> 
          Signal Sources
        </h4>
      </div>
      <p className="rec-profile" style={{marginBottom: "4px"}}>
        Model confidence: <strong style={{color: "var(--accent-success)"}}>{topSkill.confidence}%</strong> for {topSkill.name}
      </p>
      <div className="metrics-container">
        {metrics.map((metric, idx) => (
          <div key={idx} className="metric-row">
            <div className="metric-label-group">
              <span className="metric-name">{metric.label}</span>
              <span className="metric-percent">{metric.value}%</span>
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${metric.value}%`, backgroundColor: metric.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplainabilityMetrics;
