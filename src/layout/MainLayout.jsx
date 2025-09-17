import React from 'react';
import Navigation from '../components/Navigation';
const MainLayout = ({ children }) => (
  <>
    <Navigation />
    <main>{children}</main>
  </>
);

export default MainLayout;