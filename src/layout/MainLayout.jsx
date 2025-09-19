import React from 'react';
import Navigation from '../components/Navigation';
const MainLayout = ({ children }) => (
  <div>
    <Navigation />
  <div className="flex flex-col min-h-screen">
    <header className="sticky top-0 z-50 bg-white shadow-md">
    </header>
    <main className="flex-grow">{children}</main>
  </div>
  </div>
);

export default MainLayout;