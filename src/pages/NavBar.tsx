import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Nav from '../components/Nav';
import { AnimatePresence } from 'framer-motion';

const NavBar: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulRouteNames {
        nodes {
          home
          shop
          projects
          about
          contact
        }
      }
    }
  `);

  const routes = data.allContentfulRouteNames.nodes[0];

  const navItems = [
    {
      title: routes.home,
      href: '/'
    },
    {
      title: routes.shop,
      href: '/offers'
    },
    {
      title: routes.projects,
      href: '/projects'
    },
    {
      title: 'blog',
      href: '/blog'
    },
    {
      title: routes.about,
      href: '/about'
    },
    {
      title: routes.contact,
      href: '/contact'
    }
  ]

  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div onClick={() => {setIsActive(!isActive)}} className="hamburger-wrap bg-cream dark:bg-darkGrey shadow-lg">
        <div className={`${'burger'} ${isActive ? 'burgerActive' : ""}`}></div>
      </div>

      <AnimatePresence mode="wait">
        {isActive && <Nav names={navItems} />}
      </AnimatePresence>
    </>
  );
};

export default NavBar;