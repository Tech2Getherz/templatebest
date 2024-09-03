import React, { useState } from 'react';
import { navigate } from 'gatsby'
import { useMediaQuery } from '@react-hook/media-query';


export default function ProjectCard({ project, onMouseEnter, onMouseLeave }) {

  const isSmall = useMediaQuery('(max-width: 768px)');

  const { title, image, category, url } = project;
  const [hovered, setHovered] = useState(false);
  const [cursorX, setCursorX] = useState(0);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleMouseMove = (event) => {
    setCursorX(event.clientX);
  };

  const transitionDuration = hovered ? '0.5s' : '0.3s';

  const handleRedirect = (url: string) => {
    window.location.href = url;
  }

  if(isSmall){
    return (
      <div
      className="
        w-[95%]
        outline-none
        border-none
        flex flex-col
        rounded-t-lg
        transition-all
        duration-300
        ease-in-out
        overflow-hidden
      "
      onMouseEnter={() => {
        onMouseEnter()
      }}
      onMouseLeave={() => {
        onMouseLeave()
      }}
      onClick={() => handleRedirect(url)}
    >
      <img
        src={image.url}
        alt={image.title}
        className="object-cover h-64 rounded-t-lg w-full shadow-lg"
      />
      <div className="flex flex-col p-6 space-y-2 mb-[50px]">
        <div className="text-4xl font-bold leading-tight text-darkGrey dark:text-brownCream">
          {title}
        </div>
        <div className="flex flex-wrap gap-2">
          {category.split(",").map((cat, index) => (
            <span
              key={index}
              className="inline-block px-3 py-2 text-sm font-medium rounded-full border border-darkGrey dark:border-cream text-darkGrey dark:text-cream"
            >
              {cat.trim()}
            </span>
          ))}
        </div>
      </div>
    </div>
    )
  }


  else{
    return (
      <div
        className={`relative lg:h-[200px] md:h-[150px] sm:h-[100px] xsm:h-[150px] w-full flex items-center justify-between border-b-2 border-brownCream dark:border-lightBlue mb-[50px] ${hovered ? 'border-darkGrey dark:border-lightBlue' : 'border-darkGrey dark:border-lightBlue'}`}
        onMouseEnter={() => {
          handleMouseEnter();
          onMouseEnter()
        }}
        onMouseLeave={() => {
          handleMouseLeave();
          onMouseLeave()
        }}
        onMouseMove={handleMouseMove}
        style={{ transitionDuration }}
        onClick={() => handleRedirect(url)}
      >
        <div className={`px-${hovered ? 8 : 4} py-2 lg:text-7xl md:text-7xl xsm:text-4xl ${hovered ? 'text-dark dark:text-aquaBlue' : 'text-darkGrey dark:text-lightBlue'}`} style={{ transitionDuration }}>{title}</div>
        <div className={`px-${hovered ? 8 : 4} py-2 text-[20px] xsm:text-1xl text-center ${hovered ? 'text-dark dark:text-lightBlue' : 'text-darkGrey dark:text-lightBlue'}`} style={{ transitionDuration }}>
          {category.split(',').map((cat, index) => (
            <div key={index} className="rounded-full border border-darkGrey dark:border-cream px-3 my-3">{cat.trim()}</div>
          ))}
        </div>
        {hovered && (
          <img
            src={image.url}
            alt={image.title}
            className="absolute w-auto max-h-[400px] transition-opacity duration-300 ease-in-out"
            style={{
              borderRadius: '15px',
              position: 'absolute',
              top: '50%',
              left: cursorX + 50,
              transform: 'translateY(-50%)',
              opacity: 1,
              zIndex: 9,
            }}
          />
        )}
      </div>
    );
  }
}