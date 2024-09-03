import React, { useState } from 'react';
import { HeadFC, graphql } from 'gatsby';
import Layout from './Layout';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ProjectCard from '../components/ProjectCard';
import Cursor from '../components/Cursor';

export default function Portfolio({ data }) {
  
  const portfolio = data.allContentfulPortfolio.nodes;

  const [cursorStyle, setCursorStyle] = useState('default');

  const handleMouseEnter = (variant: string) => {
    setCursorStyle(variant);
  };

  const handleMouseLeave = () => {
    setCursorStyle('default');
  };


  return (
    <Layout>
      <Cursor cursorStyle={cursorStyle} />
      <div className="flex justify-center items-center flex-col xsm:pt-[100px] md:pt-[0]">
        {portfolio.map((project) => (
          <ProjectCard onMouseEnter={() => handleMouseEnter('cool')} onMouseLeave={handleMouseLeave} project={project} />
        ))}
      </div>
    </Layout>
  );
}

export const Head: HeadFC = () => <title>Projects</title>;

export const query = graphql`
  query {
    allContentfulPortfolio {
      nodes {
        title
        category
        image {
          title
          url
        }
        url
      }
    }
  }
`;