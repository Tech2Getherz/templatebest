import React, { useState } from 'react'
import Layout from '../pages/Layout'
import Cursor from './Cursor'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import OptimizedImage from './OptimizedImage';

interface BlogContext {
  blog: {
    title: string;
    content: {
      raw: string;
    };
    author: string;
    publishDate: string;
    image: {
      title: string;
      url: string;
    };
    introText: {
      raw: string;
    };
    imageOrigin: {
      raw: string;
    };
  };
}

export default function BlogPage({ pageContext }: { pageContext: BlogContext }) {

  const { title, content, author, publishDate, image, introText, imageOrigin } = pageContext.blog;

  const dateString: Date = new Date(publishDate);

  const publishDateStr: Date = new Date(dateString)

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  }

  
  const formattedDate: string = publishDateStr.toLocaleString(undefined, options);

  const parsedContent = JSON.parse(content.raw)

  const parsedIntro = JSON.parse(introText.raw)

  const parsedImageOrigin = JSON.parse(imageOrigin.raw)

  const [cursorStyle, setCursorStyle] = useState('default');

  const handleMouseEnter = (variant) => {
    setCursorStyle(variant);
  };

  const handleMouseLeave = () => {
    setCursorStyle('default');
  };

  return (
    <Layout>
       <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <Cursor cursorStyle={cursorStyle} />
      <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 text-dark dark:text-cream pt-10">{title}</h1>
          </header>
          <p className="lead text-darkGrey dark:text-lightCream mt-6">{documentToReactComponents(parsedIntro)}</p>
          <figure>
            <OptimizedImage 
              src={image.url} 
              alt={image.title} 
              width={800}
              height={600}
              loading="eager"
              priority={true}
              className="w-full h-auto"
            />
              <figcaption className="text-darkGrey dark:text-lightCream mt-6">{documentToReactComponents(parsedImageOrigin)}</figcaption>
          </figure>
          <p className="text-darkGrey dark:text-lightCream mt-6">{documentToReactComponents(parsedContent)}</p>
          <ol className="text-darkGrey dark:text-lightCream mt-6">{author}, {formattedDate}</ol>
          </article>
          </div>
    </Layout>
  )
}