import React from 'react';
import ThemeToggleButton from './ThemeToggleButton';

const Layout = ({ children }) => {
  return (
    <div className="container">
      <ThemeToggleButton />
      {children}
    </div>
  );
};

export default Layout;
