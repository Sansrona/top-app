import React from "react";
import { Menu } from "../Menu/Menu";
import { ISidebar } from "./Sidebar.props";
import Logo from '../logo.svg';
import cn from 'classnames';
import styles from './Sidebar.module.css';


export const Sidebar = ({className}:ISidebar): JSX.Element => {
    return (
        <div className={cn(styles.sidebar, className)}>
            <Logo className={styles.logo}/>
            search
            <Menu />
        </div>
    );
};