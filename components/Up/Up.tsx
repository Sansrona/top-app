import cn from 'classnames';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useScrollY } from '../../hooks/useScrollY';
import styles from './Up.module.css';
import UpIcon from './up.svg';


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

    return <motion.button 
    animate={controls}
    onClick={scrollTop}
    initial={{opacity:0}}
    className={styles.up}>
        <UpIcon />
    </motion.button>;
};