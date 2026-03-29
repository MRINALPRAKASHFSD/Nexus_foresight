import React, { useState, useEffect } from 'react';
import { Brain, ArrowRight } from 'lucide-react';
import { getTopSkillsByDemand } from '../../services/dataService';
import './Widgets.css';

const Recommendations = () => {
  const [topSkills, setTopSkills] = useState([]);

  useEffect(() => {
    getTopSkillsByDemand(2).then(data => setTopSkills(data));
  }, []);

  return (
    <div className="widget-card glass-panel">
      <div className="widget-header">
        <h4 className="widget-title">
          <Brain size={18} className="icon-brain" /> 
          Skill Roadmap
        </h4>
      </div>
      <p className="rec-profile">
        Based on your profile: <strong>Senior Software Engineer</strong>
      </p>
      <div className="alerts-list">
        {topSkills.map((skill, idx) => (
          <div key={idx} className="rec-item">
            <div className="rec-icon">
              <ArrowRight size={16} />
            </div>
            <div className="rec-details">
              <h5>{skill.name}</h5>
              <p>Match Score: {Math.floor(skill.demandScore * 0.95)}% • High Demand</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
