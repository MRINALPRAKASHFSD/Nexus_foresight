import React from 'react';
import { Search, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Header = ({ filters, setFilters }) => {
  const { currentUser, logout } = useAuth();
  
  return (
    <header className="header glass-panel">
      <div className="header-search">
        <Search size={20} className="search-icon" />
        <input type="text" placeholder="Search predictive domains..." className="search-input" />
      </div>
      
      <div className="header-filters">
        <select 
          className="filter-select" 
          value={filters.geography}
          onChange={(e) => setFilters({...filters, geography: e.target.value})}
        >
          <option value="All">Global (All Regions)</option>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
        </select>
        
        <select 
          className="filter-select"
          value={filters.industry}
          onChange={(e) => setFilters({...filters, industry: e.target.value})}
        >
          <option value="All">All Industries</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      <div className="header-actions">
        <button className="icon-btn"><Bell size={20} /></button>
        {currentUser && currentUser.picture ? (
          <img src={currentUser.picture} alt="Profile" className="profile-img" title={currentUser.name} />
        ) : (
          <button className="icon-btn profile-btn"><User size={20} /></button>
        )}
        <button className="icon-btn logout-btn" onClick={logout} title="Sign Out">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
