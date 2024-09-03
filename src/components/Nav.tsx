import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from '@reach/router';
import { menuSlide } from './anim';
import Link from './Link';
import Curve from './Curve';
import { BiMoon, BiSun } from "react-icons/bi";

const SliderToggle = ({ selected, setSelected }) => {



  const [mode, setMode] = useState();

  useEffect(() => {
    const theme = localStorage.getItem("mode");
    setMode(theme);
  }, []);

  const TOGGLE_CLASSES =
    "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
      className={`${TOGGLE_CLASSES} ${
          mode === "light" ? "text-white" : "text-slate-300"
        }`}
        onClick={() => {
          setSelected("light");
          setMode("light");
          localStorage.setItem("mode", "light");
          document.documentElement.classList.remove("dark");
        }}
      >
        <BiMoon className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Light</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          mode === "dark" ? "text-white" : "text-slate-800"
        }`}
        onClick={() => {
          setSelected("dark");
          setMode("dark")
          localStorage.setItem("mode", "dark");
          document.documentElement.classList.add("dark");
        }}
      >
        <BiSun className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Dark</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          localStorage.getItem("mode") === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
);
};

export default function Nav( names ) {


  const navItems = names.names


  const location = useLocation();
  const [selected, setSelected] = useState("light");

  return (
    <motion.div 
      variants={menuSlide} 
      initial="initial" 
      animate="enter" 
      exit="exit" 
      className="menu bg-cream dark:bg-darkGrey dark:text-cream flex justify-center align-center"
    >
      <div className="body">
        <div className="nav flex justify-center items-center">
          {navItems.map((data, index) => (
            <Link 
              key={index} 
              data={{ ...data, index }} 
            />
          ))}
          <SliderToggle selected={selected} setSelected={setSelected} />
        </div>
      </div>
      <Curve />
    </motion.div>
  );
}