import { navigate } from 'gatsby';
import React from 'react';
import OptimizedImage from './OptimizedImage';

const ServiceCard = ({ service, onMouseEnter, onMouseLeave }) => {
  
  const { title, price, image, shortDescription, numberOfStars, url } = service;

  const redirect = (url) => {
    navigate(url);    
  }

  return (
    <div 
      onClick={() => redirect(url)} 
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave} 
      className="flex-shrink-0 w-full md:w-full max-w-md rounded-lg shadow-lg dark:border-gray-700 overflow-hidden mx-4 my-5 bg-darkGrey dark:bg-lightBlue"
    >
      <a href="#" aria-label={`View details of ${title}`}>
        <OptimizedImage
          className="rounded-t-lg h-[300px] w-full"
          src={image.url}
          alt={title}
          width={400}
          height={300}
          loading="lazy"
          style={{ objectFit: 'cover' }}
        />
      </a>
      <div className="px-2 pb-2 text-center">
        <a href="#" aria-label={`Read more about ${title}`}>
          <h2 className="text-md font-semibold tracking-tight text-cream dark:text-darkGrey">
            {title}
          </h2>
        </a>
        <p className="text-lightCream dark:text-darkGrey mb-1">{shortDescription}</p>
        <div className="flex items-center justify-center mb-1">
          {[...Array(numberOfStars).keys()].map((index) => (
            <svg
              key={index}
              className="w-3 h-3 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
        </div>
        <span className="text-sm font-bold text-cream dark:text-darkGrey mx-auto">
          {price}
        </span>
      </div>
    </div>
  );
};

export default ServiceCard;
