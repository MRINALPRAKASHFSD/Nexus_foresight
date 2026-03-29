import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const Layout = () => {
  const [filters, setFilters] = useState({ geography: 'All', industry: 'All' });

  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content">
        <Header filters={filters} setFilters={setFilters} />
        <div className="viewport-area">
          <Outlet context={{ filters }} />
        </div>
      </main>
    </div>
  );
};

export default Layout;
