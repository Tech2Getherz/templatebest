import { navigate } from 'gatsby';
import React from 'react';
import OptimizedImage from './OptimizedImage';

interface Blog {
  title: string;
  slug: string;
  image: {
    url: string;
    title: string;
  };
}

export default function BlogCard({ blog, onMouseEnter, onMouseLeave, add }: { 
  blog: Blog; 
  onMouseEnter: () => void; 
  onMouseLeave: () => void; 
  add: string; 
}) {

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
      className="blog-card mb-4 bg-white shadow dark:bg-gray-800 shadow-lg hover-big relative overflow-hidden rounded-lg"
      onClick={() => handleRedirect(blog.slug)}
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave} 
    >
      <OptimizedImage
        src={blog.image.url}
        alt={blog.image.title}
        className="w-full h-[500px] object-cover"
        width={600}
        height={500}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-5">
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
