import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Forward from '../images/arrow.svg';

const Cursor = ({ cursorStyle }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    setDarkMode(document.documentElement.classList.contains("dark"));

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', mouseMove);

      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 10); 

      return () => {
        window.removeEventListener('mousemove', mouseMove);
        clearTimeout(timeout);
      };
    }
  }, []);

  const isMobileDevice = () => {
    if (typeof window !== 'undefined') {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    return false;
  };

  const isMobile = isMobileDevice();

  if (isLoading || isMobile) {
    // Return null if still loading or if it's a mobile device
    return null;
  }

  const variants = {
    default: { x: mousePosition.x - 16, y: mousePosition.y - 16 },
    text: {
      height: 100,
      width: 100,
      x: mousePosition.x - 50,
      y: mousePosition.y - 50,
      mixBlendMode: 'difference',
      transition: 'all 1.5s ease-in-out'
    },
    light: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      mixBlendMode: 'difference',
      transition: 'all 1.5s ease-in-out'
    },
    cool: {
      height: 150,
      width: 150,
      x: mousePosition.x - 50,
      y: mousePosition.y - 50,
      backgroundImage: `url(${Forward})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      transition: 'all 1.5s ease-in-out'
    },
  };

  return (
    <motion.div
      className="cursor"
      style={{ backgroundColor: darkMode ? '#FAEED1' : '#DED0B6' }}
      variants={variants}
      animate={cursorStyle}
      transition={{ ease: 'easeOut', duration: 0.1 }}
    />
  );
};

export default Cursor;
