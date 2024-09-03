import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ name, job }) => {
  
  const variants = {
    visible: {
      height: '100vh',
      opacity: 1,
      transition: { duration: 2, ease: 'backInOut' },
    },
    exit: {
      y: '-100%',
      transition: { ease: 'easeInOut', duration: 0.5, delay: 1.5 },
    },
  };

  return (
    <motion.div
      initial="visible"
      animate="exit"
      variants={variants}
      className="fixed top-0 left-0 w-screen h-screen bg-lightCream dark:bg-darkGrey flex flex-col items-center justify-center text-white z-50 text-center"
    >
      <motion.h1
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', type: "spring" }}
        className="text-7xl text-darkGrey dark:text-lightCream font-bold mb-4 z-50 text-center"
      >
        { name }
      </motion.h1>
      <motion.span
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', type: "spring" }}
        className="text-5xl text-darkGrey dark:text-lightCream font-medium z-50"
      >
        { job }
      </motion.span>
    </motion.div>
  );
};

export default Loader;