import { IHeader } from "./Header.props";
import cn from 'classnames';
import styles from './Header.module.css';
import { ButtonIcon } from "../../components";
import React, { useEffect, useState } from "react";
import Logo from '../logo.svg';
import {motion} from 'framer-motion';
import { Sidebar } from "../Sidebar/Sidebar";
import {useRouter} from 'next/router';

export const Header = ({className,...props} : IHeader): JSX.Element=>{
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const router = useRouter();
    const variants ={
        opened:{
            opacity:1,
            x:0,
            transition:{
                stiffness:50
            }
        },
        closed:{
            opacity:0,
            x:'100%',
        }
    };

    useEffect(()=>{
        setIsOpened(false);
    },[router]);
    return (
        <div className={cn(className, styles.header)} {...props}>
            <Logo />
            <ButtonIcon appearance='white' icon='menu' onClick={()=>setIsOpened(true)}/>
            <motion.div
            variants={variants}
            initial={'closed'}
            animate={isOpened?'opened':'closed'}
            className={styles.mobileMenu}>
                <Sidebar />
                <ButtonIcon className={styles.closeIcon} appearance='white' icon='close' onClick={()=>setIsOpened(false)}/>
            </motion.div>
        </div>
        );
};