import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { mockFetchSkillsData } from '../services/dataService';
import ForecastingChart from '../components/dashboard/ForecastingChart';
import EmergingAlerts from '../components/widgets/EmergingAlerts';
import ExplainabilityMetrics from '../components/widgets/ExplainabilityMetrics';
import Recommendations from '../components/widgets/Recommendations';

const DashboardPage = () => {
  const { filters } = useOutletContext();
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    mockFetchSkillsData(filters).then(data => {
      setSkillsData(data);
      setLoading(false);
    });
  }, [filters]);

  const topSkill = skillsData && skillsData.length > 0 ? [...skillsData].sort((a,b) => b.demandScore - a.demandScore)[0] : null;

  return (
    <div className="dashboard-grid">
      <div className="main-chart-area">
        {loading ? (
            <div className="chart-container glass-panel" style={{height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)'}}>
              <p>Analyzing multi-source demand signals...</p>
            </div>
        ) : (
            <ForecastingChart skillsData={skillsData} />
        )}
      </div>
      <div className="widgets-grid">
        <EmergingAlerts />
        <ExplainabilityMetrics topSkill={topSkill} />
        <Recommendations />
      </div>
    </div>
  );
};

export default DashboardPage;
