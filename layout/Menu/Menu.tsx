import styles from './Menu.module.css';
import React, {KeyboardEvent, useState} from 'react';
import cn from "classnames";
import { AppContext } from '../../context/app.context';
import { IfirstLevelCategory, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelCategory } from '../../helpers/helpers';
import {motion, useReducedMotion} from 'framer-motion'; 




export const Menu = (): JSX.Element => {
    const { menu, firstCategory, setMenu } = React.useContext(AppContext);
    const [announce, setAnnounce] = useState<'closed'|'opened'|undefined>();
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();
    const variants={
        visible:{
            marginBottom:20,
            transition:shouldReduceMotion?{}:{
                when:'beforeChildren',
                staggerChildren:0.1
            }
        },
        hidden:{marginBottom:0,
        }
    };
    const variantsChild = {
        visible:{
            opacity:1,
            height:29
        },
        hidden:{
            opacity:shouldReduceMotion?1:0,
            height:0
        }
    };

    const onChangeSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(m=>{
            if(m._id.secondCategory===secondCategory){
                setAnnounce(m.isOpened?'closed':'opened');
                m.isOpened=!m.isOpened;
            }
            return m;
        }));
    };    

    const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string): void =>{
        if(key.code=='Space' || key.code=='Enter'){
            key.preventDefault();
            onChangeSecondLevel(secondCategory);
        }
    };

    const buildFirstLevel = () => {
        return (
            <ul className={styles.firstLevelList}>
                {firstLevelCategory.map(m => (
                    <li key={`${m.route}`} aria-expanded={m.id === firstCategory}>
                        <Link href={`/${m.route}`}>
                            <a>
                                <div className={cn(styles.firstLevelMenu, {
                                    [styles.firstLevelMenuActive]: m.id === firstCategory
                                })}>
                                    {m.icon}
                                    <span>{m.name}</span>
                                </div>
                            </a></Link>
                        {m.id === firstCategory && buildSecondLevel(m)}
                    </li>)
                )}
            </ul>
        );
    };

    const buildSecondLevel = (menuItem: IfirstLevelCategory) => {
        return (
            <ul className={styles.secondLevel}>
                {
                    menu.map(m => {
                        if(m.pages.map(p=>p.alias).includes(router.asPath.split('/')[2])){
                            m.isOpened = true;
                        }
                        return (
                                <li key={m._id.secondCategory}>
                                    <button 
                                    aria-expanded={m.isOpened}
                                     className={cn(styles.secondLevelMenu)} 
                                     onKeyDown={(key:KeyboardEvent)=>openSecondLevelKey(key, m._id.secondCategory)}
                                     onClick={()=>onChangeSecondLevel(m._id.secondCategory)}>
                                        {m._id.secondCategory}
                                    </button>
                                    <motion.ul 
                                    layout
                                    variants={variants}
                                    initial={m.isOpened ? 'visible' : 'hidden'}
                                    animate={m.isOpened ? 'visible' : 'hidden'}
                                    className={styles.secondLevelBlock}>
                                        {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                                    </motion.ul>
                                </li>
                            );
                    }
                    )
                }
            </ul>
        );
    };


    const buildThirdLevel = (pages: PageItem[], route: string, isOpened:boolean) => {
        return (
                pages.map(p => (
                    <motion.li
                    variants={variantsChild}
                     key={`/${route}/${p.alias}`} >
                        <Link href={`/${route}/${p.alias}`}>
                        <a 
                        key={route+'/'+p.alias}
                        tabIndex={isOpened?0:-1} 
                        className={cn(styles.thirdLevelMenu, {
                            [styles.thirdLevelMenuActive]: `/${route}/${p.alias}` === router.asPath
                        })}
                        aria-current={`/${route}/${p.alias}` === router.asPath?'page':undefined}
                        >{p.category}</a></Link>
                    </motion.li>
                ))
        );
    };

    return (
        <nav className={cn(styles.menu)} role='navigation'>
            {announce && <span role='log' className='visuallyHidden'>{announce==='opened'?'развернуто':'свернуто'}</span>}
            {buildFirstLevel()}
        </nav>
    );
};


