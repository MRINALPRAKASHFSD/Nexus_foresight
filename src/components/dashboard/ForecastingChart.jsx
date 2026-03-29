import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import './Dashboard.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip glass-panel">
        <p className="tooltip-year">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="tooltip-entry">
            <span 
              className="tooltip-color" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="tooltip-label">{entry.name}:</span>
            <span className="tooltip-value">{entry.value} score</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ForecastingChart = ({ skillsData }) => {
  // Transform data for Recharts
  // We want: [ { year: 2024, 'Generative AI': 60, 'Quantum': 20 }, ... ]
  
  if (!skillsData || skillsData.length === 0) {
    return (
      <div className="chart-container glass-panel">
        <div className="chart-header">
          <h3>3-5 Year Demand Forecasting</h3>
          <p className="chart-subtitle">Ensemble prediction with confidence intervals</p>
        </div>
        <div className="chart-empty">No data available for selected filters</div>
      </div>
    );
  }

  const years = [2024, 2025, 2026, 2027];
  const chartData = years.map(year => {
    const dataPoint = { year };
    skillsData.forEach(skill => {
      const yearData = skill.trendData.find(d => d.year === year);
      dataPoint[skill.name] = yearData ? yearData.demand : 0;
    });
    return dataPoint;
  });

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <div className="chart-container glass-panel">
      <div className="chart-header">
        <h3>3-5 Year Demand Forecasting</h3>
        <p className="chart-subtitle">Ensemble prediction mapped to primary domains</p>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              {skillsData.map((skill, index) => (
                <linearGradient key={`color-${index}`} id={`color-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="year" stroke="#94a3b8" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
            <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            {skillsData.map((skill, index) => (
              <Area 
                key={skill.id}
                type="monotone" 
                dataKey={skill.name} 
                stroke={colors[index % colors.length]} 
                fillOpacity={1} 
                fill={`url(#color-${index})`} 
                strokeWidth={3}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastingChart;
