import styles from './Menu.module.css';
import React, {KeyboardEvent} from 'react';
import cn from "classnames";
import { AppContext } from '../../context/app.context';
import { IfirstLevelCategory, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelCategory } from '../../helpers/helpers';
import {motion} from 'framer-motion'; 




export const Menu = (): JSX.Element => {
    const { menu, firstCategory, setMenu } = React.useContext(AppContext);
    const router = useRouter();
    const variants={
        visible:{
            marginBottom:20,
            transition:{
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
            opacity:0,
            height:0
        }
    };

    const onChangeSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(m=>{
            if(m._id.secondCategory===secondCategory){
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
            <div >
                {firstLevelCategory.map(m => (
                    <div key={`${m.route}`}>
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
                    </div>)
                )}
            </div>
        );
    };

    const buildSecondLevel = (menuItem: IfirstLevelCategory) => {
        return (
            <div className={styles.secondLevel}>
                {
                    menu.map(m => {
                        if(m.pages.map(p=>p.alias).includes(router.asPath.split('/')[2])){
                            m.isOpened = true;
                        }
                        return (
                                <div key={m._id.secondCategory}>
                                    <div 
                                     tabIndex={0}
                                     className={cn(styles.secondLevelMenu)} 
                                     onKeyDown={(key:KeyboardEvent)=>openSecondLevelKey(key, m._id.secondCategory)}
                                     onClick={()=>onChangeSecondLevel(m._id.secondCategory)}>
                                        {m._id.secondCategory}
                                    </div>
                                    <motion.div 
                                    layout
                                    variants={variants}
                                    initial={m.isOpened ? 'visible' : 'hidden'}
                                    animate={m.isOpened ? 'visible' : 'hidden'}
                                    className={cn(styles.secondLevelBlock)}>
                                        {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                                    </motion.div>
                                </div>
                            );
                    }
                    )
                }
            </div>
        );
    };


    const buildThirdLevel = (pages: PageItem[], route: string, isOpened:boolean) => {
        return (
            <>
                {pages.map(p => (
                    <motion.div
                    variants={variantsChild}
                     key={`/${route}/${p.alias}`} >
                        <Link href={`/${route}/${p.alias}`}>
                        <a tabIndex={isOpened?0:-1} className={cn(styles.thirdLevelMenu, {
                            [styles.thirdLevelMenuActive]: `/${route}/${p.alias}` === router.asPath
                        })}
                        key={route+'/'+p.alias}
                        >{p.category}</a></Link>
                    </motion.div>
                ))}
            </>
        );
    };

    return (
        <nav className={cn(styles.menu)} role='navigation'>
            {buildFirstLevel()}
        </nav>
    );
};


