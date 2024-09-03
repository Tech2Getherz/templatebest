import React, { useEffect, ReactNode, useState } from 'react';
import NavBar from './NavBar';
import { Helmet } from "react-helmet";

// This function runs immediately to set the theme but only on the client-side
if (typeof window !== 'undefined') {
  const mode = localStorage.getItem('mode');
  if (mode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    // Use the effect to confirm we're on the client and set the themeLoaded state
    setThemeLoaded(true);
  }, []);

  return (
    <div
      className={`bg-lightCream dark:bg-dark h-full w-full min-h-screen main-background ${
        themeLoaded ? 'block' : 'hidden'
      }`}
    >
      <Helmet>
        <meta
          name="description"
          content="Website template by conatusweb. Want one: conatusweb@gmail.com"
        />
      </Helmet>
      {themeLoaded && (
        <>
          <NavBar />
          <main>{children}</main>
        </>
      )}
    </div>
  );
};

export default Layout;