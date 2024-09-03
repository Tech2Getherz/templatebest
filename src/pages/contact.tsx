import React, { useState } from 'react';
import Layout from './Layout';
import Cursor from '../components/Cursor';
import { HeadFC, graphql } from 'gatsby';
import "animate.css";

export default function contact({ data }) {

  const contact = data.allContentfulContact.nodes[0];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (honeypot) {
      console.log('Spam bot detected, form submission blocked.');
      return;
    }

    const subject = 'Contact Form Submission';
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
    const mailtoLink = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const [cursorStyle, setCursorStyle] = useState('default');

  const handleMouseEnter = (variant) => {
    setCursorStyle(variant);
  };

  const handleMouseLeave = () => {
    setCursorStyle('default');
  };

  return (
    <Layout>
      <Cursor cursorStyle={cursorStyle} />
        <div
          className="h-[100vh] overflow-hidden bg-cover bg-[100%] bg-no-repeat contact-image kontakt w-[100vw] flex items-center justify-center"
          style={{
            backgroundImage: `url(${contact.image.url})`,
            backgroundSize: 'cover',
          }}>
        <div className="px-6 min-w-[400px] w-[80%] max-w-[800px]">
          <div
            className="rounded-lg bg-black dark:bg-brown px-8 py-12 md:py-16 md:px-12 backdrop-blur-[50px] bg-opacity-50 dark:bg-opacity-50 backdrop-filter backdrop-blur-md animate__animated animate__slideInUp"
          >
            <div className="mb-12 grid gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="mx-auto mb-12 text-center lg:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" className="mx-auto mb-6 h-8 w-8 text-cream dark:text-dark">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
            </svg>
            <h6 className="font-medium text-lightCream dark:text-dark">{contact.country}</h6>
          </div>
          <div className="mx-auto mb-12 text-center lg:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" className="mx-auto mb-6 h-8 w-8 text-cream dark:text-dark">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <h6 className="font-medium text-lightCream dark:text-dark">{contact.location}</h6>
          </div>
          <div className="mx-auto mb-6 text-center md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" className="mx-auto mb-6 h-8 w-8 text-cream dark:text-dark">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <h6 className="font-medium text-lightCream dark:text-dark">{contact.phoneNumber}</h6>
            </div>
            </div>
            <div className="mx-auto">
              <form onSubmit={handleSendEmail}>
                <div style={{ display: 'none' }}>
                  <label>
                    Don’t fill this out if you're human: 
                    <input 
                      type="text" 
                      value={honeypot} 
                      onChange={(e) => setHoneypot(e.target.value)} 
                    />
                  </label>
                </div>
                <div className="relative mb-8" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer h-12 w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-2 text-base font-normal text-dark dark:text-lightCream outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label
                    className="after:content[''] pointer-events-none absolute left-0  -top-2 flex h-full w-full select-none !overflow-visible truncate text-orange font-normal leading-tight text-orange dark:text-lightCream transition-all after:absolute after:-bottom-2 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-dark after:transition-transform after:duration-300 peer-placeholder-shown:text-orange peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-orange dark:peer-placeholder-shown:text-orange peer-focus:text-orange peer-focus:leading-tight peer-focus:text-orange peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-orange text-white"
                  >
                    Name
                  </label>
                </div>
                <div className="relative mb-8" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer h-12 w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-2 text-base font-normal text-dark dark:text-lightCream outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    className="after:content[''] pointer-events-none absolute left-0  -top-2 flex h-full w-full select-none !overflow-visible truncate text-orange font-normal leading-tight text-orange dark:text-lightCream transition-all after:absolute after:-bottom-2 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-dark after:transition-transform after:duration-300 peer-placeholder-shown:text-orange peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-orange dark:peer-placeholder-shown:text-orange peer-focus:text-orange peer-focus:leading-tight peer-focus:text-orange peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-orange text-white"
                  >
                    Email
                  </label>
                </div>
                <div className="relative mb-8" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer h-12 w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-2 text-base font-normal text-dark dark:text-lightCream outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                <label
                    className="after:content[''] pointer-events-none absolute left-0  -top-2 flex h-full w-full select-none !overflow-visible truncate text-orange font-normal leading-tight text-orange dark:text-lightCream transition-all after:absolute after:-bottom-2 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-dark after:transition-transform after:duration-300 peer-placeholder-shown:text-orange peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-orange dark:peer-placeholder-shown:text-orange peer-focus:text-orange peer-focus:leading-tight peer-focus:text-orange peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-orange text-white"
                  >
                    Message
                  </label>
                </div>
                <div className="flex justify-center">
                  <button
                    className="text-brown hover:before:bg-redborder-brown relative h-[40px] w-[75%] overflow-hidden border border-brown bg-lightCream dark:bg-darkGrey px-3 text-darkGrey dark:text-lightCream shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-brown before:transition-all before:duration-500 hover:text-white hover:shadow-cream dark:hover-shadow-darkGrey hover:before:left-0 hover:before:w-full uppercase mx-auto"
                    type="submit"
                  >
                    <span className="relative z-10">Send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
    </Layout>
  );
}

export const Head: HeadFC = () => <title>Contact</title>;

export const query = graphql`
  query {
    allContentfulContact {
      nodes {
        image {
          title
          url
        }
        location
        country
        phoneNumber
        email
      }
    }
  }
`;
