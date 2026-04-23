import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AppNavigation() {
  return (
    <header className="app-header">
      <div className="app-header__brand">React Baseline</div>
      <nav className="app-header__nav" aria-label="Primary">
        <NavLink end to="/" className={({ isActive }) => (isActive ? 'app-link app-link--active' : 'app-link')}>
          Home
        </NavLink>
        <NavLink
          to="/mypolicies"
          className={({ isActive }) => (isActive ? 'app-link app-link--active' : 'app-link')}
        >
          My Policies
        </NavLink>
      </nav>
    </header>
  );
}