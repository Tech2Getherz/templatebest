import * as React from 'react';
import { HeadFC, PageProps } from 'gatsby';
import Layout from './Layout';
import TestimonialCard from '../components/TestimonialCard';
import { graphql } from 'gatsby';
import { motion, useMotionValue, useScroll, useTransform, useViewportScroll,useReducedMotion  } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import ProjectCard from '../components/ProjectCard'
import ServiceCard from '../components/ServiceCard'
import BlogCard from '../components/BlogCard'
import Marquee from 'react-fast-marquee';
import Cursor from '../components/Cursor';
import Loader from '../components/Loader'
import { useMediaQuery } from '@react-hook/media-query';
import OptimizedImage from '../components/OptimizedImage';
import 'animate.css'




const IndexPage = ({ data }) => {

  const isSmall = useMediaQuery('(max-width: 940px)');
  const shouldReduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(true);

  const ONE_SECOND = 1000;
  const AUTO_DELAY = ONE_SECOND * 10;
  const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
  };

  const ScrollIndicator = () => {
    return (
        <div className="flex flex-col items-center absolute h-200 bg-darkGrey bottom-20 pb-10">
          <motion.svg   
          initial={{ opacity: 0, y: '-10' }}
          animate={{ opacity: [0, 1, 0], y: 0 }}
          transition={{ duration: 3, repeat: Infinity }} 
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 absolute">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M11.9997 13.1716L7.04996 8.22186L5.63574 9.63607L11.9997 16L18.3637 9.63607L16.9495 8.22186L11.9997 13.1716Z"
              className="fill-darkGrey dark:fill-cream border-red"
            ></path>
          </motion.svg>
          <motion.svg        
          initial={{ opacity: 0, y: '-10' }}
          animate={{ opacity: [1, 0, 1], y: 0 }}
          transition={{ duration: 3, repeat: Infinity }} 
         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 absolute mt-5">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M11.9997 13.1716L7.04996 8.22186L5.63574 9.63607L11.9997 16L18.3637 9.63607L16.9495 8.22186L11.9997 13.1716Z"
              className="fill-darkGrey dark:fill-cream"
            ></path>
          </motion.svg>
        </div>
    )
  }

  

  const HorizontalScrollCarousel = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
    });
  
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-110%"]);
  
    const isSmall = useMediaQuery('(max-width: 768px)');
  
    if (services.length >= 4 && !isSmall) {
      return (
        <section ref={targetRef} className="relative h-[300vh] bg-bgLight dark:bg-bgDark">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <motion.div style={{ x }} className="flex gap-4">
              {services.map((service, index) => (
                <ServiceCard
                  initial="offscreen"
                  whileInView="onscreen"
                  onMouseEnter={() => handleMouseEnter('cool')}
                  onMouseLeave={handleMouseLeave}
                  key={index}
                  service={service}
                />
              ))}
            </motion.div>
          </div>
        </section>
      );
    } else {
      return (
          <motion.div className="relative bg-bgLight dark:bg-bgDark flex flex-col items-center justify-center mb-[100px] w-[100vw]">
            {services.map((service, index) => ( 
              <motion.div className="flex justify-center w-[96%]"                  initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariant}>
                <ServiceCard
                  onMouseEnter={() => handleMouseEnter('cool')}
                  onMouseLeave={handleMouseLeave}
                  key={index}
                  service={service}
                />
              </motion.div>
            ))}
        </motion.div>
      );
    }
  };

  const { scrollYProgress } = useViewportScroll();

  const homePage = data.allContentfulHomePage.nodes[0];
  const testimonials = data.allContentfulTestimonials.nodes;
  const portfolio = data.allContentfulPortfolio.nodes;
  const services = data.allContentfulServices.nodes;
  const blogs = data.allContentfulBlog.nodes;
  const utils = data.allContentfulUtils.nodes[0];
  const footer = data.allContentfulLinks.nodes[0]
  const routes = data.allContentfulRouteNames.nodes[0]
  console.log(routes)



  useEffect(() => {
    document.title = homePage.title
  }, [])

  const halfLength = Math.ceil(testimonials.length / 2);
  const firstHalf = testimonials.slice(0, halfLength);
  const secondHalf = testimonials.slice(halfLength);

  const y = useTransform(scrollYProgress, [0, 1], [0, 500]);

  const animationVariants = {
    visible: { opacity: 1, y: 0, scale: 1 },
    hidden: { opacity: 0, y: 20, scale: 0.9 }
  };


  const fadeInAnimationClass = 'animate__animated animate__fadeIn';

  
  const [cursorStyle, setCursorStyle] = useState('default');

  const handleMouseEnter = (variant) => {
    setCursorStyle(variant);
  };

  const handleMouseLeave = () => {
    setCursorStyle('default');
  };

  const textVariant = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        ease: 'easeIn'
      }
    }
  };
  
  /*const cardVariant = {
    offscreen: { 
      x: -50,   
      opacity: 0.5,  
      rotate: -5,  
      scale: 0.95  
    },
    onscreen: {
      x: 0, 
      opacity: 1,  
      rotate: 0,  
      scale: 1,  
      transition: {
        type: "spring",
        stiffness: 100,  
        damping: 15,    
        ease: "easeInOut",  
        duration: 0.6,  
      }
    }
  };*/
  
  const cardVariant = {
    offscreen: { 
      opacity: 0.5,
      y: 50,
    },
    onscreen: {
      opacity: 1,  
      y: 0,
      transition: {
        type: "spring", 
        ease: "easeInOut",  
        duration: 1,  
      }
    }
  };



  const cardVariantOther = {
    offscreen: { 
      x: 50,   
      opacity: 0.5,  
      rotate: 5,  
      scale: 0.95  
    },
    onscreen: {
      x: 0, 
      opacity: 1,  
      rotate: 0,  
      scale: 1,  
      transition: {
        type: "spring",
        stiffness: 100,  
        damping: 15,    
        ease: "easeInOut",  
        duration: 0.6,  
      }
    }
  };


  const [loading, setLoading] = useState(true)


    return (
      <>
      {loading ? <Loader name={homePage.title} job={homePage.job} /> : <></>}
      <Layout>
        <Cursor cursorStyle={cursorStyle} />
        <motion.div
  onMouseLeave={handleMouseLeave}
  className="relative h-screen flex flex-col justify-between items-center pt-100 min-h-[100vh] h-auto max-h-[150vh]"
>
  <motion.h1
    onMouseEnter={() => handleMouseEnter('text')}
    onMouseLeave={handleMouseLeave}
    className={`text-darkGrey font-bold mt-20 mb-auto mx-auto uppercase dark:text-cream animate__animated md:text-8xl lg:text-8xl text-8xl xsm:text-7xl xsm:z-20 md:z-0 text-center animate__animated animate__bounceInUp drop-shadow-lg`}
    variants={textVariant}
    style={isSmall ? { 
      paddingTop: '40vh', 
      fontSize: '3rem', 
      textShadow: '2px 2px 4px rgba(0,0,0,0.3), -1px -1px 2px rgba(255,255,255,0.1)',
      WebkitTextStroke: '1px rgba(0,0,0,0.1)'
    } : {
      textShadow: '3px 3px 6px rgba(0,0,0,0.4), -2px -2px 4px rgba(255,255,255,0.1)',
      WebkitTextStroke: '1px rgba(0,0,0,0.15)'
    }}
  >
    {homePage.title}
  </motion.h1>
  <OptimizedImage
    onMouseEnter={() => handleMouseEnter('light')}
    onMouseLeave={handleMouseLeave}
    className="flex-shrink-0 h-8/4 w-full object-cover lg:h-4/2 lg:w-[50vw] transition-transform duration-500 ease-in-out hover:scale-110 uppercase absolute bottom-0 h-full z-0 slika"
    src={homePage.yourImage.url}
    alt={homePage.yourImage.title}
    width={1920}
    height={1080}
    loading="eager"
    priority={true}
    style={isSmall ? { height: '90vh', objectFit: 'cover' } : {}}
  />
  <motion.h1
    onMouseEnter={() => handleMouseEnter('text')}
    onMouseLeave={handleMouseLeave}
    className="text-darkGrey dark:text-cream text-7xl font-bold mb-[7rem] mx-auto uppercase font-bold text-center z-20 md:text-6xl lg:text-8xl text-6xl xsm:text-2xl animate__animated animate__backInUp drop-shadow-lg"
    style={isSmall ? { 
      fontSize: '2.5rem', 
      marginBottom: '1rem', 
      marginTop: '1rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3), -1px -1px 2px rgba(255,255,255,0.1)',
      WebkitTextStroke: '1px rgba(0,0,0,0.1)'
    } : {
      textShadow: '3px 3px 6px rgba(0,0,0,0.4), -2px -2px 4px rgba(255,255,255,0.1)',
      WebkitTextStroke: '1px rgba(0,0,0,0.15)'
    }}
  >
    {homePage.job}
  </motion.h1>
  {isSmall ? (
    <button
  className="bg-darkGrey text-cream rounded-full uppercase mb-[100px] z-20 relative w-[80%] overflow-hidden border border-brown bg-lightCream dark:bg-darkGrey text-darkGrey dark:text-lightCream shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-brown before:transition-all before:duration-500 hover:text-white hover:shadow-cream dark:hover-shadow-darkGrey hover:before:left-0 hover:before:w-full mx-auto max-h-[150px] min-h-[60px]"
  style={{ fontSize: '2rem' }} >
  <a href="/contact" className="relative z-10">Contact</a>
</button>




  ) : (
    <div className="w-[100vw] h-[0.8px] bg-darkGrey dark:bg-cream"></div>
  )}
  {isSmall ? null : <ScrollIndicator />}
</motion.div>
        <motion.h1 className="font-bold text-center text-darkGrey dark:text-aquaBlue dark:text-textDark uppercase text-[150px] z-20 pt-[250px] md:text-8xl lg:text-9xl text-9xl xsm:text-6xl max-w-[100vw]" onMouseEnter={() => handleMouseEnter('text')} onMouseLeave={handleMouseLeave}         initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={textVariant} >{utils.homepageOne}</motion.h1>
        <HorizontalScrollCarousel />
        <motion.h1 className="font-bold text-center uppercase text-[150px] z-20 pt-[250px] pb-[50px] text-darkGrey dark:text-aquaBlue md:text-8xl lg:text-9xl text-9xl xsm:text-[3rem] max-w-[100vw]" onMouseEnter={() => handleMouseEnter('text')}
            onMouseLeave={handleMouseLeave}          initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={textVariant} >{utils.homepageTwo}</motion.h1>
        {portfolio.map((portfolio, index) => (
          <motion.div     
            key={index}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariant} className="flex justify-center">
            <ProjectCard onMouseEnter={() => handleMouseEnter('cool')} onMouseLeave={handleMouseLeave}  project={portfolio} />
          </motion.div>
        ))}
      <motion.h1                 initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={textVariant}  className="font-bold text-center text-darkGrey dark:text-aquaBlue uppercase text-[150px] z-20 md:text-8xl lg:text-9xl text-9xl xsm:text-[2.5rem] pt-[250px] pb-[50px] max-w-[100vw]" onMouseEnter={() => handleMouseEnter('text')} onMouseLeave={handleMouseLeave}>{utils.homepageThree}</motion.h1>

          {isSmall ? <div>
            {firstHalf.map((item, index) => (
              <motion.div initial="offscreen" whileInView="onscreen" variants={cardVariant}               viewport={{ once: true, amount: 0.2 }}>
                <TestimonialCard input={item} key={index} />
              </motion.div>
            ))}
          </div> :   <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Marquee className="overflow-hidden" direction="left" speed={50} pauseOnHover={!isPlaying}>
          {isPlaying &&
            [...firstHalf, ...firstHalf].map((testimonial, index) => (
              <div key={index} style={{ marginRight: '20px' }}>
                <motion.div           key={index} 
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariant}>
                <TestimonialCard input={testimonial} />
                </motion.div>
              </div>
            ))}
        </Marquee>
        <Marquee className="overflow-hidden" direction="right" speed={50} pauseOnHover={!isPlaying}>
          {isPlaying &&
            [...secondHalf, ...secondHalf].map((testimonial, index) => (
              <div key={index + firstHalf.length} style={{ marginLeft: '20px' }}>
                              <motion.div               viewport={{ once: true, amount: 0.2 }}           key={index}
              initial="offscreen"
              whileInView="onscreen"
              variants={cardVariant}>
                <TestimonialCard input={testimonial} />
                </motion.div>
              </div>
            ))}
        </Marquee>
      </div>}
      <motion.h1 className="font-bold text-center uppercase text-[150px] z-20 pt-[250px] pb-[50px] text-darkGrey dark:text-aquaBlue md:text-8xl lg:text-9xl text-9xl xsm:text-6xl max-w-[100vw]" onMouseEnter={() => handleMouseEnter('text')} onMouseLeave={handleMouseLeave}         initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={textVariant} >{utils.homepageFour}</motion.h1>
        <div className="mx-auto px-4 lg:px-16 max-w-[1640px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {blogs.slice(-2).map((blog, index) => (
                  <motion.div
                  viewport={{ once: true, amount: 0.2 }}
                  initial="offscreen"
                  whileInView="onscreen"
                  variants={index % 2 == 1 && !isSmall ? cardVariant : cardVariant}>
                    <BlogCard add="true" onMouseEnter={() => handleMouseEnter('cool')} onMouseLeave={handleMouseLeave} key={blog.slug} blog={blog} />
                  </motion.div>
          ))}
          </div>
        </div>
        <footer className="p-4 mt-[500px] bg-textLight text-bgLight dark:text-bgDark dark:textDark dark:bg-textDark sm:p-6">
      <div className="mx-auto max-w-screen-xl">
          <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0">
                  <a href="https://flowbite.com" className="flex items-center">
                      <OptimizedImage src={footer.logo.url} className="mr-3 h-8" alt={footer.logo.title} width={32} height={32} loading="lazy" />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap text-darkGrey dark:text-aquaBlue">{homePage.title}</span>
                  </a>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                  <div>
                      <h2 className="mb-6 text-sm font-semibold uppercase text-darkGrey dark:text-aquaBlue">Resources</h2>
                      <ul className="text-sm text-gray-600 dark:text-gray-400">
                          <li className="mb-4">
                              <a href={footer.resourceOne} className="hover:underline text-bgLight dark:text-bgDark">{footer.resourceOneName}</a>
                          </li>
                          <li>
                              <a href={footer.resourceTwo} className="hover:underline text-bgLight dark:text-bgDark">{footer.resourceTwoName}</a>
                          </li>
                      </ul>
                  </div>
                  <div>
                      <h2 className="mb-6 text-sm font-semibold  text-darkGrey dark:text-aquaBlue">Follow us</h2>
                      <ul className="text-sm text-gray-600 dark:text-gray-400">
                          <li className="mb-4">
                              <a href={footer.linkOne} className="hover:underline text-bgLight dark:text-bgDark">{footer.linkOneName}</a>
                          </li>
                          <li>
                              <a href={footer.linkTwo} className="hover:underline text-bgLight dark:text-bgDark">{footer.linkTwoName}</a>
                          </li>
                      </ul>
                  </div>
                  <div>
                      <h2 className="mb-6 text-sm font-semibold uppercase text-darkGrey dark:text-aquaBlue">Legal</h2>
                      <ul className="text-sm text-gray-600 dark:text-gray-400">
                          <li className="mb-4">
                              <a href={footer.privacyPolicy} className="hover:underline text-bgLight dark:text-bgDark">Privacy Policy</a>
                          </li>
                          <li>
                              <a href={footer.termsAndConditions} className="hover:underline text-bgLight dark:text-bgDark">Terms &amp; Conditions</a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-darkGrey dark:text-aquaBlue">© 2024 <a href="/" className="hover:underline text-bgLight dark:text-bgDark">{homePage.title}</a>. All Rights Reserved.</span>
            <span className="text-sm text-darkGrey dark:text-aquaBlue">Template by<a href="https://webconatus.gumroad.com/l/personalwebsite" className="hover:underline text-bgLight dark:text-bgDark"> ConatusWeb</a>.</span>
          </div>
      </div>
  </footer>
      </Layout>
      </>
    );
  }

export default IndexPage;

export const Head: HeadFC = () => <title>HomePage</title>;

export const query = graphql`
  query CombinedIndexPageQuery {
    allContentfulRouteNames {
      nodes {
        home
      }
    }
    allContentfulLinks {
      nodes {
        resourceOneName
        resourceOne
        resourceTwoName
        resourceTwo
        linkOneName
        linkOne
        linkTwoName
        linkTwo
        privacyPolicy
        termsAndConditions
        cv {
          title
          url
        }
        logo {
          title
          url
        }
      }
    }
    allContentfulUtils {
      nodes {
        homepageOne
        homepageTwo
        homepageThree
        homepageFour
      }
    }
    allContentfulHomePage {
      nodes {
        title
        job
        yourImage {
          title
          url
        }
      }
    }
    allContentfulTestimonials {
      nodes {
        name
        avatar {
          title
          url
        }
        text
        role
      }
    }
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
          url
          title
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
