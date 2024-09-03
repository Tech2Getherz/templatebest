import React from 'react';
import { useMediaQuery } from '@react-hook/media-query';

export default function TestimonialCard({ input }) {

  const isSmall = useMediaQuery('(max-width: 768px)');

  if(isSmall){
    return (
      <div className="relative mx-auto mt-8 w-[90%] bg-darkGrey dark:bg-lightBlue rounded-lg shadow-lg">
        <div className="p-6 flex flex-col items-center">
          <div className="font-bold text-lg mb-2 text-cream dark:text-dark">{input.text}</div>
          <img className="h-[80px] w-[80px] object-cover rounded-full mt-4" src={input.avatar.url} alt={input.avatar.title} style={{ objectFit: 'cover' }} />
          <div className="font-bold text-lg mb-2 text-cream dark:text-darkGrey">{input.name}</div>
          <div className="text-sm mb-1 text-lightCream dark:text-darkGrey">{input.role}</div>
        </div>
      </div>
    )
  }
  else{
    return (
      <div className="relative mx-auto mt-8 w-[500px] bg-darkGrey dark:bg-lightBlue rounded-lg shadow-lg">
        <div className="absolute top-0 right-0 p-4">
          <svg className="w-8 opacity-25 text-indigo-500" xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality"
            fillRule="evenodd" clipRule="evenodd" viewBox="0 0 640 640" fill="currentColor">
            <path
              d="M557.133 561.704H442.128c-44.256 0-80.458-36.19-80.458-80.446 0-165.58-42.32-347.485 160.656-399.418 91.95-23.516 115.915 77.753 18.119 84.745-59.647 4.276-71.293 42.804-73.147 101.068h92.269c44.256 0 80.458 36.201 80.458 80.458v130.702c0 45.591-37.3 82.89-82.891 82.89zm-358.032 0H84.096c-44.256 0-80.446-36.19-80.446-80.446 0-165.58-42.331-347.485 160.644-399.418 91.95-23.516 115.915 77.753 18.118 84.745-59.646 4.276-71.292 42.804-73.146 101.068h92.269c44.256 0 80.457 36.201 80.457 80.458v130.702c0 45.591-37.3 82.89-82.89 82.89z" />
          </svg>
        </div>
        <div className="flex h-[200px]">
          <div className="flex-shrink-0 w-[40%] h-full overflow-hidden">
            <img className="h-full w-full object-cover rounded-l-lg" src={input.avatar.url} alt={input.avatar.title} style={{ objectFit: 'cover' }} />
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div className="font-bold text-lg text-cream dark:text-dark">{input.name}</div>
            <div className="text-sm text-lightCream dark:text-dark">{input.role}</div>
            <div className="mt-2 overflow-hidden text-cream dark:text-dark">{input.text}</div>
          </div>
        </div>
      </div>
    );
  }
}
