import React, { useState } from 'react'
import Layout from './Layout'
import { HeadFC, graphql } from 'gatsby'
import Cursor from '../components/Cursor'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import "animate.css"

export default function About({ data }) {


    const about = data.allContentfulAbout.nodes[0]
    
    const upperParsed = JSON.parse(about.upperText.raw)

    const lowerParsedOne = JSON.parse(about.lowerTextOne.raw)

    const lowerParsedTwo = JSON.parse(about.lowerTextTwo.raw)

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
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="lg:w-10/12 w-full">
                <p onMouseEnter={() => handleMouseEnter('text')} onMouseLeave={handleMouseLeave} className="font-normal text-sm leading-3 text-darkGrey dark:text-lightCream animate__animated animate__rotateInDownLeft">About</p>
                <h2 onMouseEnter={() => handleMouseEnter('text')} onMouseLeave={handleMouseLeave} className="xl:w-8/12 lg:w-10/12 w-full font-bold text-dark dark:text-cream lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2 animate__animated animate__lightSpeedInLeft">{about.mainTitle}</h2>
                <p onMouseEnter={() => handleMouseEnter('text')} onMouseLeave={handleMouseLeave} className="font-normal text-base leading-6 text-darkGrey dark:text-lightCream mt-6 animate__animated animate__fadeInUp">{documentToReactComponents(upperParsed)}</p>
            </div>

            <div className="lg:mt-14 sm:mt-10 mt-12">
                <img className="animate__animated animate__zoomInUp lg:block hidden w-full" src={about.firstMedia.url} alt={about.firstMedia.title} />
                <img className="animate__animated animate__zoomInUp lg:hidden sm:block hidden w-full" src={about.firstMedia.url} alt={about.firstMedia.title} />
                <img className="animate__animated animate__zoomInUp sm:hidden block w-full" src={about.firstMedia.url} alt={about.firstMedia.title} />
            </div>

            <div className="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between flex-col lg:gap-8 gap-12">
                <div className="w-full xl:w-5/12 lg:w-6/12">
                    <h2 onMouseEnter={() => handleMouseEnter('text')} onMouseLeave={handleMouseLeave} className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-dark dark:text-cream animate__animated animate__lightSpeedInLeft">{about.lowerTextTitle}</h2>
                    <p onMouseEnter={() => handleMouseEnter('text')} onMouseLeave={handleMouseLeave} className="font-normal text-base leading-6 text-darkGrey dark:text-lightCream mt-4 animate__animated animate__fadeInUp">{documentToReactComponents(lowerParsedOne)}</p>
                    <p onMouseEnter={() => handleMouseEnter('text')} onMouseLeave={handleMouseLeave} className="font-normal text-base leading-6 text-darkGrey dark:text-cream mt-6 animate__animated animate__fadeInUp">{documentToReactComponents(lowerParsedTwo)}</p>
                </div>
                <div className="lg:flex items-center w-full lg:w-1/2 ">
                  <img className="lg:block hidden w-full" src={about.secondMedia.url} alt={about.secondMedia.title} />
                    <img className="lg:hidden sm:block hidden w-full h-3/4" src={about.secondMedia.url} alt={about.secondMedia.title} />
                    <img className="sm:hidden block w-full" src={about.secondMedia.url} alt={about.secondMedia.title} />
                </div>
            </div>
        </div>
    </Layout>
  )
}

export const Head: HeadFC = () => <title>About</title>;

export const query = graphql`
  query {
    allContentfulAbout{
      nodes {
        mainTitle
        firstMedia {
            title
            url
        }
        secondMedia {
            title
            url
        }
        lowerTextTitle
        upperText {
            raw
        }
        lowerTextOne {
            raw
        }
        lowerTextTwo {
            raw
        }
      }
    }
  }
`;