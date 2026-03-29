import React, { useState, useEffect } from 'react';
import { getEmergingSkills } from '../../services/dataService';
import { Flame } from 'lucide-react';
import './Widgets.css';

const EmergingAlerts = () => {
  const [emergingSkills, setEmergingSkills] = useState([]);

  useEffect(() => {
    getEmergingSkills().then(data => setEmergingSkills(data));
  }, []);

  return (
    <div className="widget-card glass-panel">
      <div className="widget-header">
        <h4 className="widget-title">
          <Flame size={18} className="icon-burn" /> 
          Emerging Skill Alerts
        </h4>
        <span className="badge-new">Live</span>
      </div>
      <div className="widget-content">
        {emergingSkills.length > 0 ? (
          <ul className="alerts-list">
            {emergingSkills.map((skill) => (
              <li key={skill.id} className="alert-item">
                <div className="alert-info">
                  <p className="alert-name">{skill.name}</p>
                  <p className="alert-category">{skill.category}</p>
                </div>
                <div className="alert-score">
                  <span className="score-value">HOT</span>
                  <span className="score-label">Top Trend</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No emerging alerts at this time.</p>
        )}
      </div>
    </div>
  );
};

export default EmergingAlerts;
