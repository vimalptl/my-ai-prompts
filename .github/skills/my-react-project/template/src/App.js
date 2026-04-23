import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppNavigation from './components/AppNavigation';
import MyPolicies from './pages/MyPolicies';

function Home() {
  return (
    <section className="app-page">
      <div className="app-panel">
        <h1>React Baseline</h1>
        <p>This starter shell includes routing, services, and a working My Policies sample page.</p>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="app-page">
      <div className="app-panel">
        <h1>Page Not Found</h1>
        <p>The requested route is not defined in the starter shell.</p>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <AppNavigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypolicies" element={<MyPolicies />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}