import React, { useEffect, useState } from 'react';
import { HeadFC, graphql } from 'gatsby';
import Layout from './Layout';
import BlogCard from '../components/BlogCard';
import { motion } from 'framer-motion';
import Cursor from '../components/Cursor';
import 'animate.css'

export default function Blog({ data }) {

  const [cursorStyle, setCursorStyle] = useState('default');

  const handleMouseEnter = (variant: string) => {
    setCursorStyle(variant);
  };

  const handleMouseLeave = () => {
    setCursorStyle('default');
  };

  const blogs = data.allContentfulBlog.nodes;
  const util = data.allContentfulUtils.nodes[0]

  return (
    <Layout>
      <Cursor cursorStyle={cursorStyle} />
      <motion.h1 className="md:text-8xl lg:text-9xl text-9xl xsm:text-6xl font-bold mb-6 text-center pt-[50px] uppercase text-darkGrey dark:text-cream animate__animated animate__lightSpeedInLeft">{util.homepageFour}</motion.h1>
      <div className="mx-auto px-4 lg:px-16 max-w-[1640px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {blogs.map((blog) => (
            <BlogCard add="false" onMouseEnter={() => handleMouseEnter('cool')} onMouseLeave={handleMouseLeave} key={blog.slug} blog={blog} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const Head: HeadFC = () => <title>Blog</title>;

export const query = graphql`
  query {
    allContentfulUtils {
      nodes {
        homepageFour
      }
    }
    allContentfulBlog {
      nodes {
        title
        slug
        content {
          raw
        }
        author
        publishDate
        image {
          title
          url
        }
        introText {
          raw
        }
        imageOrigin {
          raw
        }
      }
    }
  }
`;