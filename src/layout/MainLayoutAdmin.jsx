import React from 'react';
import NavigationAdmin from '../components/admin/NavigationAdmin';
const MainLayout = ({ children }) => (
  <>
    <NavigationAdmin />
    <main>{children}</main>
  </>
);

export default MainLayout;