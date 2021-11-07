import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { ButtonIcon } from '..';
import { useScrollY } from '../../hooks/useScrollY';
import styles from './Up.module.css';


export const Up = (): JSX.Element => {
    const y = useScrollY();
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            opacity:y/document.body.scrollHeight,
        });
    },[y,controls]);

    const scrollTop = () => {
        window.scrollTo({
            top:0,
            behavior:'smooth'
        });
    };

    return (
    <motion.div 
    animate={controls}
    initial={{opacity:0}}
    className={styles.up}>
        <ButtonIcon appearance='primary' aria-label='Наверх' icon='up' onClick={scrollTop}/>
    </motion.div>);
};