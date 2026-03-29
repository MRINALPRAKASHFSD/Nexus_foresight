import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, AlertTriangle, UserPlus, Settings } from 'lucide-react';
import './Layout.css';

const Sidebar = () => {
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-logo">
        <TrendingUp className="logo-icon" size={28} />
        <h2>Nexus Foresight</h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" end className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/dashboard/alerts" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <AlertTriangle size={20} />
          <span>Emerging Alerts</span>
        </NavLink>
        <NavLink to="/dashboard/recommendations" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <UserPlus size={20} />
          <span>Recommendations</span>
        </NavLink>
        <NavLink to="/dashboard/settings" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <p className="system-status">● System Online</p>
      </div>
    </aside>
  );
};

export default Sidebar;
