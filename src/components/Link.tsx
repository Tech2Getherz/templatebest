import React from 'react';
import { motion } from 'framer-motion';
import { slide, scale } from './anim';
import { useMediaQuery } from '@react-hook/media-query';

export default function Index({ data, isActive }) {


    const isSmall = useMediaQuery('(max-height: 900px)');


    const { title, href, index } = data;

    

    return (
        <motion.div
            className={isSmall ? "md:text-[56px] xsm:text-[30px] link font-bold bg-red" : "md:text-[56px] xsm:text-[40px] link font-bold bg-red"}
            custom={index}
            variants={slide}
            initial="initial"
            animate="enter"
            exit="exit"
        >
            <a  className="route bg-red" href={href}>{title}</a>
        </motion.div>
    )
}
