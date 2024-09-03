import { navigate } from 'gatsby';
import React from 'react';

export default function BlogCard({ blog, onMouseEnter, onMouseLeave, add }) {

  const cardStyle = {
    backgroundImage: `url(${blog.image.url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '500px',
    transition: 'transform 0.3s ease-in-out',
    width: '100%',
  };

  
  const handleRedirect = (url: string) => {
    if(add === 'true'){
      navigate('blog/'+url);       
    } else{
      console.log(url)
      navigate(url)
    }
  }

  return (
    <div
      className="blog-card mb-4 bg-white shadow dark:bg-gray-800 shadow-lg hover-big"
      style={cardStyle}
      onClick={() => handleRedirect(blog.slug)}
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave} 
    >
      <div className="p-5 flex flex-col justify-end h-full bg-black bg-opacity-50">
        <a href="#" className="text-white">
          <h5 className="mb-2 text-2xl font-bold tracking-tight">
            {blog.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-300">
          {blog.slug}
        </p>
      </div>
    </div>
  );
}
