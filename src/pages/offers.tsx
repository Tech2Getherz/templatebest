import React, { useState } from 'react';
import Layout from './Layout';
import { HeadFC, graphql } from 'gatsby';
import ServiceCard from '../components/ServiceCard';
import Cursor from '../components/Cursor';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@react-hook/media-query';
import 'animate.css';


export default function Services({ data }) {


  const services = data.allContentfulServices.nodes;
  const [cursorStyle, setCursorStyle] = useState('default');
  const handleMouseEnter = (variant: string) => {
    setCursorStyle(variant);
  };
  const handleMouseLeave = () => {
    setCursorStyle('default');
  };
  const util = data.allContentfulUtils.nodes[0];

  const isSmall = useMediaQuery('(max-width: 768px)');

  return (
    <Layout>
      <Cursor cursorStyle={cursorStyle} />
      <motion.h1 className="md:text-8xl lg:text-9xl text-9xl xsm:text-6xl font-bold mb-6 text-center pt-[100px] uppercase text-darkGrey dark:text-cream animate__animated animate__lightSpeedInLeft">
        {util.homepageOne}
      </motion.h1>
      <div className={`flex justify-center ${isSmall ? 'overflow-x-auto' : ''}`}>
        <div className={`grid grid-cols-1 gap-6 mx-auto'} sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-8`}>
          {services.map((service, index) => (
            <ServiceCard
              onMouseEnter={() => handleMouseEnter('cool')}
              onMouseLeave={handleMouseLeave}
              key={index}
              service={service}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const Head: HeadFC = () => <title>Shop</title>;

export const query = graphql`
  query {
    allContentfulUtils {
      nodes {
        homepageOne
      }
    }
    allContentfulServices {
      nodes {
        title
        image {
          title
          url
        }
        price
        shortDescription
        numberOfStars
        url
      }
    }
  }
`;
